package com.example.myhomego_back.controller;

import com.example.myhomego_back.dto.GptResponse;
import com.example.myhomego_back.entity.ChatMessageEntity;
import com.example.myhomego_back.entity.ChatSessionEntity;
import com.example.myhomego_back.repository.ChatMessageRepository;
import com.example.myhomego_back.repository.ChatSessionRepository;
import com.example.myhomego_back.service.GptService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/chat")  
@RequiredArgsConstructor
public class ChatController {

    private final ChatSessionRepository sessionRepo;
    private final ChatMessageRepository messageRepo;
    private final GptService gptService;

    @PostMapping("/session")
    public ResponseEntity<ChatSessionEntity> createSession() {
        ChatSessionEntity session = sessionRepo.save(ChatSessionEntity.createNow());
        return ResponseEntity.ok(session);
}

    @PostMapping("/{sessionId}/message")
    public GptResponse send(
            @PathVariable Long sessionId,
            @RequestBody Map<String, String> body) {

        String prompt = body.get("prompt");
        ChatSessionEntity session = sessionRepo.findById(sessionId).orElseThrow();

        messageRepo.save(new ChatMessageEntity(session, "user", prompt, LocalDateTime.now()));

        String gptReply = gptService.getResponse(prompt);
        LocalDateTime now = LocalDateTime.now();
        messageRepo.save(new ChatMessageEntity(session, "gpt", gptReply, now));

        return new GptResponse("gpt", gptReply, now);
    }

    @GetMapping("/{sessionId}/history")
    public List<ChatMessageEntity> getHistory(@PathVariable Long sessionId) {
        return messageRepo.findBySessionIdOrderByTimestamp(sessionId);
    }
}



