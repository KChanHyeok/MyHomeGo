package com.example.myhomego_back.jwt;

import com.example.myhomego_back.entity.KakaoUserEntity;
import com.example.myhomego_back.entity.UserEntity;
import com.example.myhomego_back.repository.KakaoUserRepository;
import com.example.myhomego_back.repository.UserRepository;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;
    private final KakaoUserRepository kakaoUserRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");
        String token = null;

        // 1. Authorization 헤더에서 JWT 추출
        if (StringUtils.hasText(authHeader) && authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7);
        }

        // 2. 토큰 유효성 검사 후 사용자 인증 처리
        if (token != null && jwtUtil.isValidToken(token)) {
            String userId = jwtUtil.getUserIdFromToken(token); // 메서드 이름 수정 반영

            if (userId != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                Object principal = null;

                UserEntity user = userRepository.findByUserEmail(userId);
                if (user != null) {
                    principal = user;
                } else {
                    KakaoUserEntity kakaoUser = kakaoUserRepository.findByKakaoId(userId);
                    if (kakaoUser != null) {
                        principal = kakaoUser;
                    }
                }

                if (principal != null) {
                    UsernamePasswordAuthenticationToken authentication =
                            new UsernamePasswordAuthenticationToken(principal, null, Collections.emptyList());
                    authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            }
        }

        filterChain.doFilter(request, response);
    }
}
