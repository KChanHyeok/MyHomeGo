package com.example.myhomego_back.service;

import com.example.myhomego_back.dto.UserLoginRequest;
import com.example.myhomego_back.dto.UserRegisterRequest;
import com.example.myhomego_back.dto.UserUpdateRequest;
import com.example.myhomego_back.entity.UserEntity;
import com.example.myhomego_back.jwt.JwtUtil;
import com.example.myhomego_back.repository.UserRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class UserService {

    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    // 회원가입 처리
    public void register(UserRegisterRequest request) {
        if (userRepository.existsByUserId(request.getUserId())) {
            throw new IllegalArgumentException("이미 존재하는 아이디입니다.");
        }
        if (userRepository.existsByUserEmail(request.getUserEmail())) {
            throw new IllegalArgumentException("이미 등록된 이메일입니다.");
        }

        String encryptedPwd = passwordEncoder.encode(request.getUserPwd()); // 암호화

        UserEntity newUser = UserEntity.builder()
                .userId(request.getUserId())
                .userEmail(request.getUserEmail())
                .userPwd(encryptedPwd)
                .userName(request.getUserName())
                .phone(request.getPhone())
                .regDate(LocalDateTime.now())
                .build();
                
                userRepository.save(newUser);
    }

    // 로그인 처리
    public String loginAndGetToken(UserLoginRequest request) {
        UserEntity user = userRepository.findByUserId(request.getUserId());
        if (user == null || !passwordEncoder.matches(request.getUserPwd(), user.getUserPwd())) {
            throw new IllegalArgumentException("아이디 또는 비밀번호가 일치하지 않습니다.");
        }

        return jwtUtil.createToken(user.getUserId()); // 토큰 반환
    }

    public void updateUser(String userId, UserUpdateRequest request) {
        UserEntity user = userRepository.findByUserId(userId);
        if (user == null)
            throw new IllegalArgumentException("사용자를 찾을 수 없습니다.");

        user.setUserEmail(request.getUserEmail());
        user.setUserName(request.getUserName());
        user.setPhone(request.getPhone());
        userRepository.save(user);
    }

    public void deleteUser(String userId) {
        userRepository.deleteById(userId);
    }

    public UserEntity getUserById(String userId) {
        return userRepository.findByUserId(userId);
    }

    public boolean existsByUserId(String userId) {
        return userRepository.existsByUserId(userId);
    }

}
