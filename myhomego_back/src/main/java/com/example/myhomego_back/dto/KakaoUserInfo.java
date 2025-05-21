package com.example.myhomego_back.dto;

import lombok.Data;

@Data
public class KakaoUserInfo {
    private String email;
    private String nickname;
    private String profileImageUrl;

    public KakaoUserInfo(String kakaoId, String kakaoName, String profileImageUrl) {
        this.email = kakaoId;
        this.nickname = kakaoName;
        this.profileImageUrl = profileImageUrl;
    }

    public String getEmail() {
        return email;
    }

    public String getNickname() {
        return nickname;
    }

    public String getProfileImageUrl() {
        return profileImageUrl;
    }

    @Override
    public String toString() {
        return "KakaoUserInfo{" +
                "email='" + email + '\'' +
                ", nickname='" + nickname + '\'' +
                ", profileImageUrl='" + profileImageUrl + '\'' +
                '}';
    }
}