package com.example.myhomego_back.chat;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

/*─ 임시 스텁 모델 ─*/
record ChatSession(String id, LocalDateTime startedAt) {}
record ChatMessage(String role, String content) {}

@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
public class ChatController {

    /*=== 임시 메모리 저장 (Mongo repo 만들기 전까지) ===*/
    private static ChatSession SESSION
            = new ChatSession("demo", LocalDateTime.now());

    @PostMapping("/session")
    public ChatSession newSession() {
        // 실제로는 MongoRepo.save(...)
        SESSION = new ChatSession(
                java.util.UUID.randomUUID().toString(),
                LocalDateTime.now());
        return SESSION;
    }

    @PostMapping("/{id}/message")
    public String send(@PathVariable String id,
                       @RequestBody Map<String,String> body) {

        String prompt = body.get("prompt");
        // TODO: gptService.chat(...) 호출 후 DB 저장
        return "GPT 답변 (echo): " + prompt;
    }
}

