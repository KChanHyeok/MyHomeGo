package com.example.myhomego_back.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.MediaType;

import com.example.myhomego_back.dto.KakaoUserInfo;
import com.example.myhomego_back.entity.KakaoUserEntity;
import com.example.myhomego_back.jwt.JwtUtil;
import com.example.myhomego_back.repository.KakaoUserRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class KakaoLoginService {

    @Value("${kakao.client.id}")
    private String clientId;

    @Value("${kakao.redirect.uri}")
    private String redirectUri;

    private final RestTemplate restTemplate = new RestTemplate();
    private final KakaoUserRepository userRepository;
    private final JwtUtil jwtUtil;

    public String kakaoLogin(String code) {
        
        // 1. 인가 코드를 이용해 토큰 받기
        String accessToken = getAccessToken(code);

        // 2. 사용자 정보 조회
        KakaoUserInfo userInfo = getUserInfo(accessToken);

        // 3. 사용자 등록 or 로그인 처리
        KakaoUserEntity user = userRepository.findByKakaoId(userInfo.getEmail());
        if (user == null) {
            user = userRepository.save(
                KakaoUserEntity.builder()
                        .kakaoId(userInfo.getEmail())
                        .kakaoName(userInfo.getNickname())
                        .build()
            );
        }

        // 4. JWT 발급
        return jwtUtil.createToken(user.getKakaoId());
    }

    // 액세스 토큰 요청
    private String getAccessToken(String code) {
        String url = "https://kauth.kakao.com/oauth/token";

        // HTTP 요청 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        // HTTP 요청 바디 설정 (폼 데이터)
        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("grant_type", "authorization_code");
        body.add("client_id", clientId);
        body.add("redirect_uri", redirectUri);
        body.add("code", code);

        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(body, headers);

        // POST 요청 보내기
        ResponseEntity<Map> response = restTemplate.exchange(
                url,
                HttpMethod.POST,
                requestEntity,
                Map.class
        );

        if (response.getStatusCode() == HttpStatus.OK) {
            Map<String, Object> responseBody = response.getBody();
            if (responseBody != null && responseBody.get("access_token") != null) {
                return (String) responseBody.get("access_token");
            }
        }

        throw new RuntimeException("카카오 액세스 토큰 요청 실패");
    }
    

    // 사용자 정보 요청
    private KakaoUserInfo getUserInfo(String accessToken) {
        String requestUrl = "https://kapi.kakao.com/v2/user/me";

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken); // Authorization: Bearer {accessToken}
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        HttpEntity<Void> entity = new HttpEntity<>(headers);

        RestTemplate restTemplate = new RestTemplate();

        try {
            ResponseEntity<Map> response = restTemplate.exchange(
                    requestUrl,
                    HttpMethod.GET,
                    entity,
                    Map.class
            );

            if (response.getStatusCode() == HttpStatus.OK) {
                Map<String, Object> body = response.getBody();

                Map<String, Object> kakaoAccount = (Map<String, Object>) body.get("kakao_account");
                Map<String, Object> profile = (Map<String, Object>) kakaoAccount.get("profile");

                String email = (String) kakaoAccount.get("email");
                String nickname = (String) profile.get("nickname");
                String profileImageUrl = (String) profile.get("profile_image_url");

                return new KakaoUserInfo(email, nickname, profileImageUrl);
            } else {
                throw new RuntimeException("카카오 사용자 정보 요청 실패: " + response.getStatusCode());
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("카카오 사용자 정보 요청 중 예외 발생", e);
        }
    }
}