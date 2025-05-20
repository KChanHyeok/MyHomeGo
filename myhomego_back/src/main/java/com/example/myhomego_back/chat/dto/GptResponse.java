package com.example.myhomego_back.chat;

import java.time.LocalDateTime;

public record GptResponse(
    String role,
    String content,
    LocalDateTime timestamp
) {}
