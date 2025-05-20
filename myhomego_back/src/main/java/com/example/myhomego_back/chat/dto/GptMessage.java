package com.example.myhomego_back.chat.dto;

public class GptMessage {
    private String role;
    private String content;

    public GptMessage(String role, String content) {
        this.role = role;
        this.content = content;
    }

    public String getRole() { return role; }
    public String getContent() { return content; }
}