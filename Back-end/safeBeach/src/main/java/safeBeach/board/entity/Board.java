package safeBeach.board.entity;

import safeBeach.board.dto.Req_BoardUpdateDto;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;
import java.util.*;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Board {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String author;
    private Integer categorybig;
    private Integer categorysmall;
    @Column(nullable = false)
    private String title;
    @Column(nullable = false)
    private String contents;
    @Column(nullable = false)
    private Date created;
    private Date published;
    private int hits;

//    @OneToMany(mappedBy = "board", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
//    private Set<Likes> likes = new HashSet<>();

    @Transient
    private Long like;
    @Transient
    private boolean like_me;
    private String filename;
    private String location;
    private String restaurant;
    @Transient
    private String photoURL;


//    @OneToMany(mappedBy = "board", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
//    @JsonManagedReference
//    private List<Comments> comments = new ArrayList<>();

    public void update(Req_BoardUpdateDto reqBoardUpdateDto) {

        Timestamp currentTimestamp = new Timestamp(System.currentTimeMillis());
        currentTimestamp.setNanos(0);
        System.out.println(reqBoardUpdateDto.getTitle()+ reqBoardUpdateDto.getContents());
        this.title = reqBoardUpdateDto.getTitle();
        this.contents = reqBoardUpdateDto.getContents();
        this.published = currentTimestamp;
    }

    public void updateHits() {
        this.hits++;
    }
}
