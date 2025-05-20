import { ChatBubble, ChatBubbleAvatar, ChatBubbleMessage } from "@/components/chat/chat-bubble";
import { ChatInput } from "@/components/chat/chat-input";
import ChatMessageList from "@/components/chat/chat-message-list";
import { Button } from "@/components/ui/button";
import { Paperclip, Mic, CornerDownLeft } from "lucide-react";
import React, { useRef, useState } from "react";

export default function ChatGpt() {
  const [messages] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  // const [inputMessage, setInputMessage] = useState("");

  // const messagesRef = useRef(null);
  const formRef = useRef(null);

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  return (
    <main className="flex h-screen w-full max-w-3xl flex-col items-center mx-auto">
      <div className="flex-1 w-full overflow-y-auto py-6">
        <ChatMessageList>
          {messages &&
            messages.map((message, index) => (
              <ChatBubble key={index} variant={message.role == "user" ? "sent" : "received"}>
                <ChatBubbleAvatar src="" fallback={message.role == "user" ? "👨🏽" : "🤖"} />
                <ChatBubbleMessage>
                  {message.content}
                  {isGenerating && (
                    <ChatBubble variant="received">
                      <ChatBubbleAvatar src="" fallback="🤖" />
                      <ChatBubbleMessage isLoading />
                    </ChatBubble>
                  )}
                </ChatBubbleMessage>
              </ChatBubble>
            ))}
        </ChatMessageList>
      </div>
      <div className="w-full px-4 pb-4">
        <form
          ref={formRef}
          // onSubmit={onSubmit}
          className="relative rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
        >
          <ChatInput
            value={inputMessage}
            // onKeyDown={onKeyDown}
            onChange={handleInputChange}
            placeholder="Type your message here..."
            className="rounded-lg bg-background border-0 shadow-none focus-visible:ring-0"
          />
          <div className="flex items-center p-3 pt-0">
            <Button variant="ghost" size="icon">
              <Paperclip className="size-4" />
              <span className="sr-only">Attach file</span>
            </Button>

            <Button variant="ghost" size="icon">
              <Mic className="size-4" />
              <span className="sr-only">Use Microphone</span>
            </Button>

            <Button disabled={!inputMessage || isLoading} type="submit" size="sm" className="ml-auto gap-1.5">
              Send Message
              <CornerDownLeft className="size-3.5" />
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
