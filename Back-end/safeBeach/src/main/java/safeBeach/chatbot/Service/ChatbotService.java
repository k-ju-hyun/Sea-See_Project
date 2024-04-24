package safeBeach.chatbot.Service;

import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@Service
public class ChatbotService {

    public String chatbotwrite(String category,String user_request) throws IOException, InterruptedException {
        String url = "http://3.34.73.134:8080/api/request";

        String jsonBody = "{\"category\": \"" + category + "\", \"user_request\": \"" + user_request + "\"}";

        HttpClient httpClient = HttpClient.newHttpClient();

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(jsonBody))
                .build();

        HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

        if (response.statusCode() == 200) {
            String responseBody = response.body();
            // 응답 처리
            System.out.println("응답: " + responseBody);
            return responseBody;
        } else {
            System.out.println("API 요청 실패: " + response.statusCode());
            return ("API 요청 실패:" + response.statusCode());
        }
    }
}
