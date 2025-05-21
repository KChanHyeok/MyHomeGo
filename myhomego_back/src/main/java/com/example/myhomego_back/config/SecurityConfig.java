package com.example.myhomego_back.config;
import com.example.myhomego_back.jwt.JwtUtil;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
<<<<<<< HEAD
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import com.example.myhomego_back.jwt.JwtAuthFilter;
=======
import org.springframework.web.cors.CorsConfiguration;
>>>>>>> e260754f27411bf58c1c48ebfc92ed4800109b53
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.config.Customizer;

@Configuration
public class SecurityConfig {

    private final JwtUtil jwtUtil;

    SecurityConfig(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    // 비밀번호 암호화용 Bean
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // 보안 정책 설정
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors(Customizer.withDefaults())
                .csrf(csrf -> csrf.disable())
                .cors(cors -> cors.configurationSource(request -> new CorsConfiguration().applyPermitDefaultValues())) // ✅ CORS 허용
                .authorizeHttpRequests(auth -> auth
                .requestMatchers(
                                "/api/user/register",
                                "/api/user/login",
                                "/api/user/check-email",
<<<<<<< HEAD
                                "/api/user/check-id")
                                // "/api/user/get-user")
=======
                                "/api/chat/**")
>>>>>>> e260754f27411bf58c1c48ebfc92ed4800109b53
                        .permitAll()
                        .anyRequest().authenticated()
                ).addFilterBefore(new JwtAuthFilter(jwtUtil), UsernamePasswordAuthenticationFilter.class);;

        return http.build();
    }

}
