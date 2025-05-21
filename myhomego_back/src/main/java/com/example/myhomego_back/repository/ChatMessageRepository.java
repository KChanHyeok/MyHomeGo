package com.example.myhomego_back.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.myhomego_back.entity.ChatMessageEntity;

import java.util.List;

public interface ChatMessageRepository extends JpaRepository<ChatMessageEntity, Long> {
    List<ChatMessageEntity> findBySessionIdOrderByTimestamp(Long sessionId);
}
