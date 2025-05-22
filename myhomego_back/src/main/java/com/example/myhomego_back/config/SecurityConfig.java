package com.example.myhomego_back.config;

import com.example.myhomego_back.jwt.JwtUtil;
import com.example.myhomego_back.repository.KakaoUserRepository;
import com.example.myhomego_back.repository.UserRepository;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.example.myhomego_back.common.OAuth2SuccessHandler;
import com.example.myhomego_back.jwt.JwtAuthFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.config.Customizer;

@Configuration
public class SecurityConfig {

    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;
    private final KakaoUserRepository kakaoUserRepository;

    public SecurityConfig(JwtUtil jwtUtil, UserRepository userRepository, KakaoUserRepository kakaoUserRepository) {
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
        this.kakaoUserRepository = kakaoUserRepository;
    }

    // 비밀번호 암호화용 Bean
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // 보안 정책 설정
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http, OAuth2SuccessHandler oauth2successHandler)
            throws Exception {
        http
                .cors(Customizer.withDefaults())
                .csrf(csrf -> csrf.disable())
                .cors(cors -> cors.configurationSource(request -> new CorsConfiguration().applyPermitDefaultValues())) // CORS
                                                                                                                       // 허용
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/api/user/register",
                                "/api/user/login",
                                "/api/user/check-email",
                                "/api/user/check-id",
                                "/api/user/get-user",
                                "/api/chat/**",
                                "/auth/kakao")
                        .permitAll()
                        .anyRequest().authenticated())
                .addFilterBefore(
                        new JwtAuthFilter(jwtUtil, userRepository, kakaoUserRepository),
                        UsernamePasswordAuthenticationFilter.class)

                .oauth2Login(oauth2Login -> oauth2Login
                        .loginPage("/api/user/register") // 사용자를 로그인 페이지로 리다이렉트
                        .successHandler(oauth2successHandler) // 로그인 성공 시의 핸들러로 oAuth2SuccessHandler를 사용
                );

        return http.build();
    }

}
