package safeBeach.board.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import safeBeach.board.Service.BoardService;
import safeBeach.board.Service.LikesService;
import safeBeach.board.dto.Req_CommentsWriteDto;
import safeBeach.board.dto.Req_LikesOnDto;

@RestController
public class LikesController {

    @Autowired
    private LikesService likesService;

    @PostMapping("/board/{boardId}/likeson")
    public ResponseEntity<?> likeson(@PathVariable Integer boardId,
                                     @RequestBody Req_LikesOnDto reqLikesOnDto) {
        likesService.likeson(boardId,reqLikesOnDto.getUser());
        return ResponseEntity.ok().build();
    }
}
