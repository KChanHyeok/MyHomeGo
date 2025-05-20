package com.example.myhomego_back.dto;

import lombok.Data;

@Data
public class UserRegisterRequest {
    private String userId;
    private String userEmail;
    private String userPwd;
    private String userName;
    private String phone;
}
