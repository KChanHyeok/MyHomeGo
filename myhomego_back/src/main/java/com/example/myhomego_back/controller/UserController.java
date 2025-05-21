package com.example.myhomego_back.controller;

import com.example.myhomego_back.dto.UserLoginRequest;
import com.example.myhomego_back.dto.UserRegisterRequest;
import com.example.myhomego_back.dto.UserUpdateRequest;
import com.example.myhomego_back.entity.UserEntity;
import com.example.myhomego_back.jwt.JwtUtil;
import com.example.myhomego_back.repository.UserRepository;
import com.example.myhomego_back.service.UserService;
import com.example.myhomego_back.entity.KakaoUserEntity;
import com.example.myhomego_back.repository.KakaoUserRepository;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;
    private final UserService userService;
    private final JwtUtil jwtUtil;
    private final KakaoUserRepository kakaoUserRepository;

    // 회원가입
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody UserRegisterRequest request) {
        userService.register(request);
        return ResponseEntity.ok("회원가입 성공");
    }

    // 로그인
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody UserLoginRequest request) {
        String token = userService.loginAndGetToken(request);
        return ResponseEntity.ok(token);
    }

    @PostMapping("/check-email")
    public ResponseEntity<Boolean> checkEmail(@RequestParam String email) {
        return ResponseEntity.ok(userRepository.existsByUserEmail(email));
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateUser(@RequestBody UserUpdateRequest request, HttpServletRequest httpReq) {
        String userId = (String) httpReq.getAttribute("userId"); // 인터셉터에서 추출된 ID
        userService.updateUser(userId, request);
        return ResponseEntity.ok("회원 정보 수정 완료");
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteUser(HttpServletRequest httpReq) {
        String userId = (String) httpReq.getAttribute("userId");
        userService.deleteUser(userId);
        return ResponseEntity.ok("회원 탈퇴 완료");
    }

    @GetMapping("/get-user")
    public ResponseEntity<?> getMyInfo(@RequestHeader("Authorization") String authHeader) {
        try {
            String token = authHeader.replace("Bearer ", "");
            String userId = jwtUtil.getUserIdFromToken(token);

            // 1. 일반 사용자 조회
            UserEntity user = userService.getUserById(userId);
            if (user != null) {
                Map<String, Object> result = new HashMap<>();
                result.put("userId", user.getUserId());
                result.put("userName", user.getUserName());
                return ResponseEntity.ok(result);
            }

            // 2. 카카오 사용자 조회
            KakaoUserEntity kakaoUser = kakaoUserRepository.findByKakaoId(userId);
            if (kakaoUser != null) {
                Map<String, Object> result = new HashMap<>();
                result.put("userId", kakaoUser.getKakaoId());
                result.put("userName", kakaoUser.getKakaoName());
                return ResponseEntity.ok(result);
            }

            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("사용자를 찾을 수 없습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("토큰이 유효하지 않습니다.");
        }
    }

    @GetMapping("/check-id")
    public ResponseEntity<Map<String, Boolean>> checkUserId(@RequestParam String userId) {
        boolean exists = userService.existsByUserId(userId);

        Map<String, Boolean> response = new HashMap<>();
        response.put("exists", exists);

        return ResponseEntity.ok(response);
    }

}
