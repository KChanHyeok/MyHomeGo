package com.example.myhomego_back.controller;

import com.example.myhomego_back.dto.UserLoginRequest;
import com.example.myhomego_back.dto.UserRegisterRequest;
import com.example.myhomego_back.dto.UserUpdateRequest;
import com.example.myhomego_back.repository.UserRepository;
import com.example.myhomego_back.service.UserService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;

    private final UserService userService;

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

}
