package com.example.myhomego_back.controller;

import java.util.Collections;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.myhomego_back.service.KakaoLoginService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class KakaoLoginController {

    private final KakaoLoginService kakaoLoginService;

    // @GetMapping("/kakao/callback")
    // public ResponseEntity<?> kakaoCallback(@RequestParam String code) {
    // String jwt = kakaoLoginService.kakaoLogin(code);
    // return ResponseEntity.ok().body(Collections.singletonMap("token", jwt));
    // }

    @PostMapping("/kakao")
    public ResponseEntity<?> kakaoLogin(@RequestBody Map<String, String> body) {
        try {
            String accessToken = body.get("accessToken");

            if (accessToken == null || accessToken.isBlank()) {
                return ResponseEntity.badRequest().body("accessToken 누락됨");
            }

            String jwtToken = kakaoLoginService.loginWithKakao(accessToken);

            if (jwtToken == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("JWT 발급 실패");
            }

            return ResponseEntity.ok(Collections.singletonMap("token", jwtToken));

        } catch (Exception e) {
            e.printStackTrace(); // 서버 콘솔에서 원인 확인 가능
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("서버 오류 발생: " + e.getMessage());
        }
    }

}