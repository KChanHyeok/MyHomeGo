package com.example.myhomego_back.dto;

import java.time.LocalDateTime;

public record GptResponse(
    String role,
    String content,
    LocalDateTime timestamp
) {}
