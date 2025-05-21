package com.example.myhomego_back.repository;

import com.example.myhomego_back.entity.KakaoUserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface KakaoUserRepository extends JpaRepository<KakaoUserEntity, Long> {
    boolean existsByKakaoId(String KakaoId);
    boolean existsByKakaoName(String kakaoName);
    KakaoUserEntity findByKakaoId(String KakaoId);
    KakaoUserEntity findByKakaoName(String kakaoName);
}