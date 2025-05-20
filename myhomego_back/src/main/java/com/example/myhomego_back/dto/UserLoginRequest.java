package com.example.myhomego_back.dto;

import lombok.Data;

@Data
public class UserLoginRequest {
    private String userId;
    private String userPwd;
}
