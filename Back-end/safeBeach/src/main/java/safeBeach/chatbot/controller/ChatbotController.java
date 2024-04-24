package safeBeach.chatbot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import safeBeach.chatbot.Service.ChatbotService;
import safeBeach.chatbot.dto.chatbot;

import java.io.IOException;

@RestController
public class ChatbotController {
    @Autowired
    private ChatbotService chatbotService;

    @PostMapping("/chatbot")
    public String chatbotwrite(@RequestBody chatbot content) throws IOException, InterruptedException {
        String answer = chatbotService.chatbotwrite(content.getCategory(), content.getContent());
        return answer;
    }
}
