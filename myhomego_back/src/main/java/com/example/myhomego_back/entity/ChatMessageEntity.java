package com.example.myhomego_back.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity(name = "ChatMessage")
@Getter
@NoArgsConstructor
public class ChatMessageEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "session_id")
    private ChatSessionEntity session;

    private String role;

    @Column(columnDefinition = "TEXT")  
    private String content;

    private LocalDateTime timestamp;

    public ChatMessageEntity(ChatSessionEntity session, String role, String content, LocalDateTime timestamp) {
        this.session = session;
        this.role = role;
        this.content = content;
        this.timestamp = timestamp;
    }
}
