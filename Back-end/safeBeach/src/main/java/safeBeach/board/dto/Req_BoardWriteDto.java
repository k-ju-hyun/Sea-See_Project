package safeBeach.board.dto;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter

public class Req_BoardWriteDto {

    String category;
    String author;
    String title;
    String contents;
    String location;
    String restaurant;
//    MultipartFile photo;
}
