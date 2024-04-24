package safeBeach.beachInfo.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import safeBeach.beachInfo.entity.Beach;
import safeBeach.beachInfo.entity.BeachInfo;
import safeBeach.beachInfo.repository.BeachInfoRepository;
import safeBeach.beachInfo.repository.BeachRepository;
import safeBeach.beachInfo.service.component.BeachInfoComponent;

import java.awt.*;
import java.net.URI;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.List;

@Service
@Transactional
public class BeachInfoService {
    private BeachRepository beachRepository;
    private BeachInfoRepository beachInfoRepository;
    private BeachInfoComponent beachInfoComponent;


    @Autowired
    public BeachInfoService(BeachRepository beachRepository, BeachInfoRepository beachInfoRepository, BeachInfoComponent beachInfoComponent){
        this.beachRepository = beachRepository;
        this.beachInfoRepository = beachInfoRepository;
        this.beachInfoComponent = beachInfoComponent;
    }

    //인구밀집도 조회
    public Map<String, Object> populationDensity(String placeName){
        Map<String, Object> resMap = new HashMap<>();
        Optional<Beach> beachCode = beachRepository.findByBeach(placeName);

        //해더(key)
        HttpHeaders headers = new HttpHeaders();
        headers.set("appkey", "yTMZUhFSa43Yc2SIWhQMR5iEKbWsjXTm4T4EuTm5");

        //요청 url
        String url = "https://apis.openapi.sk.com/puzzle/place/congestion/rltm/pois/" + beachCode.get().getPoiId();
        RequestEntity<?> requestEntity = new RequestEntity<>(headers, HttpMethod.GET, URI.create(url));

        try{
            //응답
            ResponseEntity<String> responseEntity = new RestTemplate().exchange(requestEntity, String.class);
            ObjectMapper objectMapper = new ObjectMapper();

            JsonNode jsonNode = objectMapper.readTree(responseEntity.getBody());
            JsonNode contents = jsonNode.get("contents").get("rltm");

            JsonNode firstItem = contents.get(0);
            resMap.put("congestion_score", firstItem.path("congestion").asText());
            return resMap;

        } catch (Exception e) {
            resMap.put("congestion_score", "");
            return resMap;
        }
    }

    //해당 해양 관측소의 모든 관측치들을 조회
    public Map<String, Object> beachInfoSearch(String beachName){
        Map<String, Object> resMap = new HashMap<>();
        String obsCode = beachRepository.findByBeach(beachName).get().getObsCodeRipCurrent();

        ResponseEntity<String> responseEntity  = beachInfoComponent.beachInfoSearch(obsCode);
        ObjectMapper objectMapper = new ObjectMapper();

        try {
            JsonNode jsonNode = objectMapper.readTree(responseEntity.getBody());
            JsonNode data = jsonNode.get("result").get("data");
            JsonNode beachData = data.get(data.size()-1);

            resMap.put("wave_height", beachData.path("wave_height").asText());
            resMap.put("wave_period", beachData.path("wave_period").asText());
            resMap.put("air_temp", beachData.path("air_temp").asText());
            resMap.put("water_temp", beachData.path("water_temp").asText());
            resMap.put("wind_speed", beachData.path("wind_speed").asText());
            resMap.put("wind_direct", beachData.path("wind_direct").asText());
            resMap.put("ripCurrent_score", beachData.path("score").asText());

        } catch (Exception e) {
            resMap.put("wave_height", "");
            resMap.put("wave_period", "");
            resMap.put("air_temp", "");
            resMap.put("water_temp", "");
            resMap.put("wind_speed", "");
            resMap.put("wind_direct", "");
            resMap.put("ripCurrent_score", "");
            return resMap;
        }
        return resMap;
    }

    //해당 해수욕장의 해수욕지수 조회
    public Map<String, Object> beachScoreSearch(String beachName){
        Map<String, Object> resMap = new HashMap<>();
        String obsCode = beachRepository.findByBeach(beachName).get().getObsCodeBeachScore();

        ResponseEntity<String> responseEntity  = beachInfoComponent.beachScoreSearch(obsCode);
        ObjectMapper objectMapper = new ObjectMapper();

        try {
            JsonNode jsonNode = objectMapper.readTree(responseEntity.getBody());
            JsonNode data = jsonNode.get("result").get("data");
            JsonNode beachData = data.get(data.size()-1);

            resMap.put("day1_am", beachData.path("day1_am_status").asText());
            resMap.put("day1_pm", beachData.path("day1_pm_status").asText());
            resMap.put("day2_am", beachData.path("day2_am_status").asText());
            resMap.put("day2_pm", beachData.path("day2_pm_status").asText());
            resMap.put("day3_am", beachData.path("day3_am_status").asText());
            resMap.put("day3_pm", beachData.path("day3_pm_status").asText());

        } catch (Exception e) {
            resMap.put("day1_am", "");
            resMap.put("day1_pm", "");
            resMap.put("day2_am", "");
            resMap.put("day2_pm", "");
            resMap.put("day3_am", "");
            resMap.put("day3_pm", "");
            return resMap;
        }
        return resMap;
    }

    //해당 해수욕장별 해파리 지수 조회
    public Map<String, Object> jellyfishSearch(String beachName) {
        System.out.println(beachName);

        Map<String, Object> resMap = new HashMap<>();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Optional<Beach> beach = beachRepository.findByBeach(beachName);
        if (beach.get().getObsCodeWaveHeight() != null){
            String json = "{\"obs_code\": \"" + beach.get().getObsCodeWaveHeight() + "\"}";

            String url = "http://3.34.73.134:8080/api/request/jfish";
            HttpEntity<String> requestEntity = new HttpEntity<>(json, headers);

            ResponseEntity<String> responseEntity = new RestTemplate().postForEntity(url, requestEntity, String.class);
            ObjectMapper objectMapper = new ObjectMapper();

            try {
                JsonNode jsonNode = objectMapper.readTree(responseEntity.getBody());

                resMap.put("jellyfish", jsonNode.path("message").asText());
            } catch (Exception e) {
                resMap.put("jellyfish", "");
                return resMap;
            }
        }

        return resMap;
    }


    public Map<String, Object> beachInfoSearchFromDB(String beachName) {
        Map<String, Object> resMap = new HashMap<>();
        Optional<BeachInfo> beachInfo = beachInfoRepository.findByBeachName(beachName);
        resMap.put("beach_name", beachInfo.get().getBeachName());
        resMap.put("congestion_score", beachInfo.get().getCongestionScore());
        resMap.put("wave_height", beachInfo.get().getWaveHeight());
        resMap.put("wave_period", beachInfo.get().getWavePeriod());
        resMap.put("air_temp", beachInfo.get().getAirTemp());
        resMap.put("water_temp", beachInfo.get().getWaterTemp());
        resMap.put("wind_speed", beachInfo.get().getWindSpeed());
        resMap.put("wind_direct", beachInfo.get().getWindDirect());
        resMap.put("ripCurrent_score", beachInfo.get().getRipCurrentScore());
        resMap.put("renewal_date", beachInfo.get().getRenewalDate());
        return resMap;
    }

    public List<Map<String, Object>> allBeachInfoSearchFromDB(String region) {
        List<Map<String, Object>> allResMap = new ArrayList<>();

        List<BeachInfo> beachInfoList = beachInfoRepository.findAllByRegion(region);
        for (BeachInfo beachInfo : beachInfoList) {
            Map<String, Object> resMap = new HashMap<>();
            resMap.put("beach_name", beachInfo.getBeachName());
            resMap.put("congestion_score", beachInfo.getCongestionScore());
            resMap.put("wave_height", beachInfo.getWaveHeight());
            resMap.put("wave_period", beachInfo.getWavePeriod());
            resMap.put("air_temp", beachInfo.getAirTemp());
            resMap.put("water_temp", beachInfo.getWaterTemp());
            resMap.put("wind_speed", beachInfo.getWindSpeed());
            resMap.put("wind_direct", beachInfo.getWindDirect());
            resMap.put("ripCurrent_score", beachInfo.getRipCurrentScore());
            resMap.put("renewal_date", beachInfo.getRenewalDate());
            resMap.put("day1_am", beachInfo.getDay1am());
            resMap.put("day1_pm", beachInfo.getDay1pm());
            resMap.put("day2_am", beachInfo.getDay2am());
            resMap.put("day2_pm", beachInfo.getDay2pm());
            resMap.put("day3_am", beachInfo.getDay3am());
            resMap.put("day3_pm", beachInfo.getDay3pm());
            resMap.put("jellyfish", beachInfo.getJellyfish());

            allResMap.add(resMap);
        }
        return allResMap;
    }

    //서버 시작 10초 후 600초 10분마다 한번씩 갱신
    @Scheduled(initialDelay = 10000, fixedDelay = 6000000)
    public void beachInfoSearch(){
        List<BeachInfo> beachInfos = beachInfoRepository.findAll();
        if (beachInfos.isEmpty()){
            for (Beach beach: beachRepository.findAll()){
                BeachInfo beachInfo = new BeachInfo();
                beachInfo.setBeachName(beach.getBeach());
                beachInfo.setRegion(beach.getRegion());
                beachInfoRepository.save(beachInfo);
            }
        }
        for (BeachInfo beachInfo : beachInfos){
            LocalDateTime now = LocalDateTime.now();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
            String formattedDateTime = now.format(formatter);
            String beachName = beachInfo.getBeachName();

            Map<String, Object> populationDensityMap = populationDensity(beachName);
            Map<String, Object> beachInfoMap = beachInfoSearch(beachName);
            Map<String, Object> beachScoreMap = beachScoreSearch(beachName);
            Map<String, Object> jellyfishMap = jellyfishSearch(beachName);


            beachInfo.setCongestionScore((String) populationDensityMap.get("congestion_score"));

            beachInfo.setWaveHeight((String)beachInfoMap.get("wave_height"));
            beachInfo.setWavePeriod((String)beachInfoMap.get("wave_period"));
            beachInfo.setAirTemp((String)beachInfoMap.get("air_temp"));
            beachInfo.setWaterTemp((String)beachInfoMap.get("water_temp"));
            beachInfo.setWindSpeed((String)beachInfoMap.get("wind_speed"));
            beachInfo.setWindDirect((String)beachInfoMap.get("wind_direct"));
            beachInfo.setRipCurrentScore((String)beachInfoMap.get("ripCurrent_score"));

            beachInfo.setDay1am((String)beachScoreMap.get("day1_am"));
            beachInfo.setDay1pm((String)beachScoreMap.get("day1_pm"));
            beachInfo.setDay2am((String)beachScoreMap.get("day2_am"));
            beachInfo.setDay2pm((String)beachScoreMap.get("day2_pm"));
            beachInfo.setDay3am((String)beachScoreMap.get("day3_am"));
            beachInfo.setDay3pm((String)beachScoreMap.get("day3_pm"));

            beachInfo.setJellyfish((String)jellyfishMap.get("jellyfish"));

            beachInfo.setRenewalDate(LocalDateTime.parse(formattedDateTime, formatter));
            beachInfoRepository.save(beachInfo);
        }
    }


    //서버 시작 10초 후 600초 10분마다 한번씩 갱신
    @Scheduled(initialDelay = 20000, fixedDelay = 6000000)
    public void beachInfoSearchJellyfish(){
        List<BeachInfo> beachInfos = beachInfoRepository.findAll();
        if (beachInfos.isEmpty()){
            for (Beach beach: beachRepository.findAll()){
                BeachInfo beachInfo = new BeachInfo();
                beachInfo.setBeachName(beach.getBeach());
                beachInfo.setRegion(beach.getRegion());
                beachInfoRepository.save(beachInfo);
            }
        }
        for (BeachInfo beachInfo : beachInfos){
            String beachName = beachInfo.getBeachName();

            Map<String, Object> jellyfishMap = jellyfishSearch(beachName);

            beachInfo.setJellyfish((String)jellyfishMap.get("jellyfish"));

            beachInfoRepository.save(beachInfo);
        }
    }
}
