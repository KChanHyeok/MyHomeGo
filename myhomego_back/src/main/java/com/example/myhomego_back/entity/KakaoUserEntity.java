package com.example.myhomego_back.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "kakao_user")
public class KakaoUserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String kakaoId;        // 카카오의 유저 id(이메일)
    private String kakaoName;       
    private String profileImageUrl;

    private LocalDateTime regDate;

    @OneToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

    // builder, getters, setters 등 생략
}