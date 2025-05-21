package com.example.myhomego_back.dto;

import java.util.List;

public class GptRequest {
    private String model;
    private List<GptMessage> messages;

    public GptRequest(String model, List<GptMessage> messages) {
        this.model = model;
        this.messages = messages;
    }

    public String getModel() { return model; }
    public List<GptMessage> getMessages() { return messages; }
}