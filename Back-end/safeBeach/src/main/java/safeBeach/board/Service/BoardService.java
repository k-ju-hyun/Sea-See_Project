package safeBeach.board.Service;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import safeBeach.board.entity.Board;
import safeBeach.board.dto.Req_BoardUpdateDto;
import safeBeach.board.dto.Req_BoardViewDto;
import safeBeach.board.entity.Comments;
import safeBeach.board.entity.Likes;
import safeBeach.board.repository.BoardRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import safeBeach.board.repository.CommentsRepository;
import safeBeach.board.repository.LikesRepository;

import javax.xml.stream.events.Comment;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;


@Service
public class BoardService {
    private static BoardRepository boardRepository;
    private static LikesRepository likesRepository;
    private final CommentsRepository commentsRepository;

    @Autowired
    public BoardService(BoardRepository boardRepository, LikesRepository likesRepository, CommentsRepository commentsRepository) {
        this.boardRepository = boardRepository;
        this.likesRepository = likesRepository;
        this.commentsRepository= commentsRepository;
    }


    @Transactional
    //글 작성
    public void write(Integer categorybig,Integer categorysmall, String author, String title, String contents, String fileName,String location, String restaurant){

        Timestamp currentTimestamp = new Timestamp(System.currentTimeMillis());
        currentTimestamp.setNanos(0);


        Board board = Board.builder()
                .categorybig(categorybig)
                .categorysmall(categorysmall)
                .title(title)
                .contents(contents)
                .hits(0)
                .created(currentTimestamp)
                .published(currentTimestamp)
                .author(author)
                .location(location)
                .restaurant(restaurant)
                .filename(fileName) // 파일명을 저장
                .build();

        boardRepository.save(board);
    }



    //게시글 리스트 불러오기
    public List<Board> boardList(Integer categorybig,Integer categorysmall,String author){
        List<Board> boards = boardRepository.findAllByCategorybigAndCategorysmall(categorybig,categorysmall);
        for (Board board : boards) {
            Long totalLikes = (long) likesRepository.countByBoardId(board.getId());
            boolean isLikedByCurrentUser = likesRepository.existsByBoardIdAndUser(board.getId(),author);

            board.setLike(totalLikes);
            board.setLike_me(isLikedByCurrentUser);
        }
        return boards;
    }

    public List<Board> boardListAll(Integer categorybig, String author){
        List<Board> boards = boardRepository.findAllByCategorybig(categorybig);
        for (Board board : boards) {
            Long totalLikes = (long) likesRepository.countByBoardId(board.getId());
            boolean isLikedByCurrentUser = likesRepository.existsByBoardIdAndUser(board.getId(),author);

            board.setLike(totalLikes);
            board.setLike_me(isLikedByCurrentUser);
        }
        return boards;
    }

    @Transactional
    // 특정 게시글 불러오기
    public Board boardview(Integer id){
        Board board = boardRepository.findById(id).get();

        return board;
    }

    public void boardDelete(Integer id){
        List<Comments> comments = commentsRepository.findAllByBoard_Id(id);
        commentsRepository.deleteAll(comments);

        List<Likes> like = likesRepository.findByBoardId(id);
        likesRepository.deleteAll(like);

        boardRepository.deleteById(id);
//        Board board = boardRepository.findById(id).get();
    }

    @Transactional
    public void boardupdate(Integer id, Req_BoardUpdateDto reqBoardUpdateDto){
        Board board = boardRepository.findById(id).get();
        board.update(reqBoardUpdateDto);
    }

    @Transactional
    public Board boardupdateview(Integer id){
        Board board = boardRepository.findById(id).get();
        board.updateHits();
        return board;
    }
}
