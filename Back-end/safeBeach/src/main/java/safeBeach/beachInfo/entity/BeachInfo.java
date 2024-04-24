package safeBeach.beachInfo.entity;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
public class BeachInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String beachName;
    private String region;
    private String congestionScore;
    private String ripCurrentScore;
    private String waveHeight;
    private String wavePeriod;
    private String airTemp;
    private String waterTemp;
    private String windSpeed;
    private String windDirect;
    private String day1am;
    private String day1pm;
    private String day2am;
    private String day2pm;
    private String day3am;
    private String day3pm;
    private String jellyfish;
    private LocalDateTime renewalDate;
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getBeachName() {
        return beachName;
    }

    public void setBeachName(String beachName) {
        this.beachName = beachName;
    }

    public String getCongestionScore() {
        return congestionScore;
    }

    public void setCongestionScore(String congestionScore) {
        this.congestionScore = congestionScore;
    }

    public String getRipCurrentScore() {
        return ripCurrentScore;
    }

    public void setRipCurrentScore(String ripCurrentScore) {
        this.ripCurrentScore = ripCurrentScore;
    }

    public String getWaveHeight() {
        return waveHeight;
    }

    public void setWaveHeight(String waveHeight) {
        this.waveHeight = waveHeight;
    }

    public String getWavePeriod() {
        return wavePeriod;
    }

    public void setWavePeriod(String wavePeriod) {
        this.wavePeriod = wavePeriod;
    }

    public String getAirTemp() { return airTemp; }

    public void setAirTemp(String airTemp) { this.airTemp = airTemp; }

    public String getWaterTemp() {
        return waterTemp;
    }

    public void setWaterTemp(String waterTemp) {
        this.waterTemp = waterTemp;
    }

    public String getWindSpeed() {
        return windSpeed;
    }

    public void setWindSpeed(String windSpeed) {
        this.windSpeed = windSpeed;
    }

    public String getWindDirect() {
        return windDirect;
    }

    public void setWindDirect(String windDirect) {
        this.windDirect = windDirect;
    }

    public String getDay1am() { return day1am; }

    public void setDay1am(String day1am) { this.day1am = day1am; }

    public String getDay1pm() { return day1pm; }

    public void setDay1pm(String day1pm) { this.day1pm = day1pm; }

    public String getDay2am() { return day2am; }

    public void setDay2am(String day2am) { this.day2am = day2am; }

    public String getDay2pm() { return day2pm; }

    public void setDay2pm(String day2pm) { this.day2pm = day2pm; }

    public String getDay3am() { return day3am; }

    public void setDay3am(String day3am) { this.day3am = day3am; }

    public String getDay3pm() { return day3pm; }

    public void setDay3pm(String day3pm) { this.day3pm = day3pm; }

    public String getJellyfish() { return jellyfish; }

    public void setJellyfish(String jellyfish) { this.jellyfish = jellyfish; }

    public LocalDateTime getRenewalDate() {
        return renewalDate;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public void setRenewalDate(LocalDateTime renewalDate) {
        this.renewalDate = renewalDate;
    }
}
