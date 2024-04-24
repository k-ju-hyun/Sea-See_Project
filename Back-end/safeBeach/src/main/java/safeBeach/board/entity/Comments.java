package safeBeach.board.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import safeBeach.board.dto.Req_BoardUpdateDto;
import safeBeach.board.dto.Req_CommentsUpdateDto;

import java.sql.Timestamp;
import java.util.Date;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Comments {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String comments;

    private Date created;
    private Date published;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "board_id", nullable = false)
    @JsonIgnore
    private Board board;

    private String author;

    public void update(Req_CommentsUpdateDto reqCommentsUpdateDto) {

        Timestamp currentTimestamp = new Timestamp(System.currentTimeMillis());
        currentTimestamp.setNanos(0);

        this.comments = reqCommentsUpdateDto.getComments();
        this.published = currentTimestamp;
    }
}
