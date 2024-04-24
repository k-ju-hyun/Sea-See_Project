package safeBeach.beachInfo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import safeBeach.beachInfo.service.BeachInfoService;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class BeachInfoRestController {
    private BeachInfoService beachInfoService;

    @Autowired
    public BeachInfoRestController (BeachInfoService beachInfoService){ this.beachInfoService = beachInfoService;}

    @GetMapping("/allBeachInfoSearchFromDB/{region}")
    public ResponseEntity<?> allBeachInfoSearchFromDB(@PathVariable("region") String region){
        try{
            List<Map<String, Object>> resMap = beachInfoService.allBeachInfoSearchFromDB(region);
            return ResponseEntity.ok(resMap);
        } catch (RuntimeException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Collections.singletonMap("error", e.getMessage()));
        }
    }

    @PostMapping("beachInfoSearchFromDB")
    public ResponseEntity<?> beachInfoSearchFromDB(String beachName){
        try{
            Map<String, Object> resMap = beachInfoService.beachInfoSearchFromDB(beachName);
            return ResponseEntity.ok(resMap);
        } catch (RuntimeException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Collections.singletonMap("error", e.getMessage()));
        }
    }

    //해수욕장 정보 조회
    @PostMapping("beachInfoSearch")
    public ResponseEntity<?> beachInfoSearch(String beachName){
        try{
            Map<String, Object> res = new HashMap<>();
            res.put("beach_name", beachName);
            res.putAll(beachInfoService.populationDensity(beachName));
            res.putAll(beachInfoService.beachInfoSearch(beachName));

            return ResponseEntity.ok(res);
        } catch (RuntimeException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Collections.singletonMap("error", e.getMessage()));
        }
    }

    //인구혼잡도
    @PostMapping("populationDensity")
    public ResponseEntity<Map<String, Object>> populationDensity(String placeName){
        try {
            Map<String, Object> resMap = beachInfoService.populationDensity(placeName);
            return ResponseEntity.ok(resMap);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Collections.singletonMap("error", e.getMessage()));
        }
    }
}
