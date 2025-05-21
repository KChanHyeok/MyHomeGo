package com.example.myhomego_back.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import com.fasterxml.jackson.annotation.JsonFormat;

@Entity(name = "ChatSession")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class ChatSessionEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime startedAt;

    public static ChatSessionEntity createNow() {
        ChatSessionEntity session = new ChatSessionEntity();
        session.startedAt = LocalDateTime.now();
        return session;
    }
}

