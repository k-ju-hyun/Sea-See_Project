package safeBeach.board.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class Req_BoardListallDto {
    String author;
    Integer categorybig;
    Integer categorysmall;
}
