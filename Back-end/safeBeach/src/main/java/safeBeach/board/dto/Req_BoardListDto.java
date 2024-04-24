package safeBeach.board.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class Req_BoardListDto {
    String author;
    Integer categorybig;
    Integer categorysmall;
}
