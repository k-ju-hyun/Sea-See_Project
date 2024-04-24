package safeBeach.beachInfo.entity;

import jakarta.persistence.*;

@Entity
public class Beach {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true, nullable = false)
    private String beach;
    @Column(nullable = false)
    private String region;
    private String poiId;
    private String obsCodeBeachScore;
    private String obsCodeRipCurrent;
    private String obsCodeWaveHeight;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getBeach() { return beach; }
    public void setBeach(String beach) { this.beach = beach; }

    public String getRegion() { return region; }
    public void setRegion(String region) { this.region = region; }

    public String getPoiId() { return poiId; }
    public void setPoiId(String poiId) { this.poiId = poiId; }

    public String getObsCodeBeachScore() { return obsCodeBeachScore; }
    public void setObsCodeBeachScore(String obsCodeBeachScore) { this.obsCodeBeachScore = obsCodeBeachScore; }

    public String getObsCodeRipCurrent() { return obsCodeRipCurrent; }
    public void setObsCodeRipCurrent(String obsCodeRipCurrent) { this.obsCodeRipCurrent = obsCodeRipCurrent; }

    public String getObsCodeWaveHeight() {
        return obsCodeWaveHeight;
    }

    public void setObsCodeWaveHeight(String obsCodeWaveHeight) {
        this.obsCodeWaveHeight = obsCodeWaveHeight;
    }
}
