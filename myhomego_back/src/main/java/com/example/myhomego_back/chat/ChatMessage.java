package com.example.myhomego_back.chat;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
public class ChatMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "session_id")
    private ChatSession session;

    private String role;

    @Column(columnDefinition = "TEXT")  
    private String content;

    private LocalDateTime timestamp;

    public ChatMessage(ChatSession session, String role, String content, LocalDateTime timestamp) {
        this.session = session;
        this.role = role;
        this.content = content;
        this.timestamp = timestamp;
    }
}
