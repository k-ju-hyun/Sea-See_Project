package safeBeach.board.controller;

import safeBeach.board.Service.CommentsService;
import safeBeach.board.dto.Req_BoardUpdateDto;
import safeBeach.board.dto.Req_CommentsUpdateDto;
import safeBeach.board.dto.Req_CommentsWriteDto;
import safeBeach.board.entity.Board;
import safeBeach.board.entity.Comments;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CommentsController {
    @Autowired
    private CommentsService commentsService;

    @PostMapping("/board/{boardId}/comments/write")
    public ResponseEntity<?> commentswrite(@PathVariable Integer boardId,
                                          @RequestBody Req_CommentsWriteDto reqCommentsWriteDto) {
        commentsService.commentswrite(boardId, reqCommentsWriteDto);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/board/{boardId}/comments/list")
    public ResponseEntity<?> commentslist(@PathVariable Integer boardId){
        try{
            List<Comments> commentslist =commentsService.commentslist(boardId);
            return ResponseEntity.ok(commentslist);
        } catch (Exception e)
        {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/board/{comment_id}/comments/update")
    public ResponseEntity<?> commentsupdate(@PathVariable("comment_id") Integer id){
        Comments comments = commentsService.commentsview(id);
        return ResponseEntity.ok(comments);
    }

    @PutMapping("/board/{comment_id}/comments/update")
    public ResponseEntity<?> commentsupdate(@PathVariable("comment_id") Integer id,
                                         @RequestBody Req_CommentsUpdateDto reqCommentsUpdateDto){
        commentsService.commentsupdate(id, reqCommentsUpdateDto);
        Comments comments = commentsService.commentsview(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/board/{comment_id}/comments/delete")
    public ResponseEntity<?> commentsddelete(@PathVariable("comment_id") Integer id){
        commentsService.commentsdelete(id);
//        List<Board> board_list =boardService.boardList(category);
        return ResponseEntity.ok().build();
    }

}
