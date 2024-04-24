package safeBeach.board.Service;

import safeBeach.board.dto.Req_BoardUpdateDto;
import safeBeach.board.dto.Req_CommentsUpdateDto;
import safeBeach.board.dto.Req_CommentsWriteDto;
import safeBeach.board.entity.Board;
import safeBeach.board.entity.Comments;
import safeBeach.board.repository.BoardRepository;
import safeBeach.board.repository.CommentsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.List;

@Service
public class CommentsService {
    @Autowired
    private CommentsRepository commentsRepository;
    @Autowired
    private BoardRepository boardRepository;

    @Transactional
    public void commentswrite(Integer boardId, Req_CommentsWriteDto reqWriteComentsDto){
        Board board = boardRepository.findById(boardId)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 존재하지 않습니다. id=" + boardId));

        Timestamp currentTimestamp = new Timestamp(System.currentTimeMillis());
        currentTimestamp.setNanos(0);

        Comments comments = Comments.builder()
                .board(board)
                .author(reqWriteComentsDto.getAuthor())
                .comments(reqWriteComentsDto.getComments())
                .created(currentTimestamp)
                .published(currentTimestamp)
                .build();

        commentsRepository.save(comments);
    }

    public List<Comments> commentslist(Integer board_id){
//        System.out.println(board_id);
        return commentsRepository.findAllByBoard_Id(board_id);
    }

    @Transactional
    public void commentsupdate(Integer id, Req_CommentsUpdateDto reqCommentsUpdateDto){
        Comments comments = commentsRepository.findById(id).get();
        comments.update(reqCommentsUpdateDto);
    }

    @Transactional
    // 특정 게시글 불러오기
    public Comments commentsview(Integer id){
        Comments comments = commentsRepository.findById(id).get();
        return comments;
    }

    public void commentsdelete(Integer id){
        commentsRepository.deleteById(id);
//        Board board = boardRepository.findById(id).get();
    }
}
