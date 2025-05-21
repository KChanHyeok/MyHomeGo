package com.example.myhomego_back.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.myhomego_back.entity.ChatSessionEntity;

public interface ChatSessionRepository extends JpaRepository<ChatSessionEntity, Long> {
}
