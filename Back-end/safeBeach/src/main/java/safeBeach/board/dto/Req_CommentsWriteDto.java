package safeBeach.board.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class Req_CommentsWriteDto {
    private String comments;
    private String author;
}
