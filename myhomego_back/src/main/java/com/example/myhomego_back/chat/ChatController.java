package com.example.myhomego_back.chat;

import com.example.myhomego_back.chat.dto.GptResponse;

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
    public ResponseEntity<ChatSession> createSession() {
        ChatSession session = sessionRepo.save(ChatSession.createNow());
        return ResponseEntity.ok(session);
}

    @PostMapping("/{sessionId}/message")
    public GptResponse send(
            @PathVariable Long sessionId,
            @RequestBody Map<String, String> body) {

        String prompt = body.get("prompt");
        ChatSession session = sessionRepo.findById(sessionId).orElseThrow();

        messageRepo.save(new ChatMessage(session, "user", prompt, LocalDateTime.now()));

        String gptReply = gptService.getResponse(prompt);
        LocalDateTime now = LocalDateTime.now();
        messageRepo.save(new ChatMessage(session, "gpt", gptReply, now));

        return new GptResponse("gpt", gptReply, now);
    }

    @GetMapping("/{sessionId}/history")
    public List<ChatMessage> getHistory(@PathVariable Long sessionId) {
        return messageRepo.findBySessionIdOrderByTimestamp(sessionId);
    }
}



