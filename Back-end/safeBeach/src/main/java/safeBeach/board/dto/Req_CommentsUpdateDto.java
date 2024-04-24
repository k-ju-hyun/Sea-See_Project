package safeBeach.board.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class Req_CommentsUpdateDto {
    private String comments;
}
