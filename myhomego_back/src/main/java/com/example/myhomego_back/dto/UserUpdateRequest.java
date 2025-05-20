package com.example.myhomego_back.dto;

import lombok.Data;

@Data
public class UserUpdateRequest {
    private String userEmail;
    private String userName;
    private String phone;
}

