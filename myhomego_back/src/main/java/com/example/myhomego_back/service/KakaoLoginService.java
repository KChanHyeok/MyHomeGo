package com.example.myhomego_back.service;

import java.util.Map;

import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import com.example.myhomego_back.dto.KakaoUserInfo;
import com.example.myhomego_back.entity.KakaoUserEntity;
import com.example.myhomego_back.jwt.JwtUtil;
import com.example.myhomego_back.repository.KakaoUserRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class KakaoLoginService {

    private final RestTemplate restTemplate = new RestTemplate();
    private final KakaoUserRepository userRepository;
    private final JwtUtil jwtUtil;

    public String loginWithKakao(String accessToken) {
        // 1. 사용자 정보 조회
        KakaoUserInfo userInfo = getUserInfo(accessToken);

        // 2. 사용자 등록 or 로그인 처리
        KakaoUserEntity user = userRepository.findByKakaoId(userInfo.getEmail());
        if (user == null) {
            user = userRepository.save(
                    KakaoUserEntity.builder()
                            .kakaoId(userInfo.getEmail())
                            .kakaoName(userInfo.getNickname())
                            .build());
        }

        // 3. JWT 발급
        return jwtUtil.createToken(user.getKakaoId());
    }

    // 사용자 정보 요청
    private KakaoUserInfo getUserInfo(String accessToken) {
        String requestUrl = "https://kapi.kakao.com/v2/user/me";

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        HttpEntity<Void> entity = new HttpEntity<>(headers);

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
