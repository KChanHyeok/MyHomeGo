package com.example.myhomego_back.jwt;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
@RequiredArgsConstructor
public class JwtAuthInterceptor implements HandlerInterceptor {

    private final JwtUtil jwtUtil;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {
        System.out.println("요청 URI: " + request.getRequestURI());
        System.out.println("요청 Method: " + request.getMethod());

        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            System.out.println("OPTIONS 요청 - 허용");
            return true;
        }

        String authHeader = request.getHeader("Authorization");
        System.out.println("Authorization 헤더: " + authHeader);

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            System.out.println("인증 실패 - Authorization 헤더 없음 또는 잘못된 형식");
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return false;
        }

        String token = authHeader.replace("Bearer ", "");
        if (!jwtUtil.isValidToken(token)) {
            System.out.println("인증 실패 - 유효하지 않은 토큰");
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
            return false;
        }

        System.out.println("토큰 인증 성공");
        return true;
    }

}
