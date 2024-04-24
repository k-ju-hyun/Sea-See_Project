package safeBeach.beachInfo.service.component;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import safeBeach.beachInfo.entity.Beach;
import safeBeach.beachInfo.repository.BeachRepository;

import java.net.URI;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Component
public class BeachInfoComponent {
    //원하는 해수욕장의 정보를 가져오는 컴포넌트
    public ResponseEntity<String> beachInfoSearch(String obsCode){
        //현재 날짜
        LocalDate currentDate = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        String today = currentDate.format(formatter);

        //service key
        String serviceKey = "rNZqcUKhpexaoOnv1gIVWg==";
        //헤더
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", MediaType.APPLICATION_JSON_VALUE);
        //요청
        String url = "http://www.khoa.go.kr/api/oceangrid/ripCurrent/search.do?ServiceKey="+serviceKey+"&BeachCode="+obsCode+"&Date="+today+"&ResultType=json";
        RequestEntity<?> requestEntity = new RequestEntity<>(headers, HttpMethod.GET, URI.create(url));
        //응답
        ResponseEntity<String> responseEntity = new RestTemplate().exchange(requestEntity, String.class);
        return responseEntity;
    }

    //원하는 해수욕장지수를 가져오는 컴포넌트
    public ResponseEntity<String> beachScoreSearch(String obsCode){
        //service key
        String serviceKey = "rNZqcUKhpexaoOnv1gIVWg==";
        //헤더
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", MediaType.APPLICATION_JSON_VALUE);
        //요청
        String url = "http://www.khoa.go.kr/api/oceangrid/beach/search.do?ServiceKey="+serviceKey+"&BeachCode="+obsCode+"&ResultType=json";
        RequestEntity<?> requestEntity = new RequestEntity<>(headers, HttpMethod.GET, URI.create(url));
        //응답
        ResponseEntity<String> responseEntity = new RestTemplate().exchange(requestEntity, String.class);
        return responseEntity;
    }

    //해파리 정보를 가져오는 컴포넌트

//    public ResponseEntity<String> jellyfishSearch(String obsCode) {
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.APPLICATION_JSON);
//
//        String url = "http://54.180.132.95:8080/api/request/jfish";
//        String json = "{\"obs_code\": \"" + obsCode + "\"}";
//
//        HttpEntity<String> requestEntity = new HttpEntity<>(json, headers);
//        ResponseEntity<String> responseEntity = new RestTemplate().postForEntity(url, requestEntity, String.class);
//
//        HttpStatus statusCode = (HttpStatus) responseEntity.getStatusCode();
//        if (statusCode == HttpStatus.OK) {
//            String jsonResponse = responseEntity.getBody();
//            // TODO: 응답(jsonResponse) 처리
//            System.out.println("응답: " + jsonResponse);
//        } else {
//            System.out.println("API 요청 실패: " + statusCode);
//        }
//
//        return responseEntity;
//    }
    public ResponseEntity<String> jellyfishSearch(String obsCode){
        String json = "{\"obs_code\": \"" + obsCode + "\"}";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        String url = "https://43.202.4.91:8080/api/request/jfish";
        RequestEntity<?> requestEntity = new RequestEntity<>(json, headers, HttpMethod.GET, URI.create(url));

        ResponseEntity<String> responseEntity = new RestTemplate().exchange(requestEntity, String.class);

        return responseEntity;
    }
}
