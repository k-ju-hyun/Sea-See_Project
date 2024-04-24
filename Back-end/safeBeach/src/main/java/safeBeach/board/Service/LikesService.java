package safeBeach.board.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import safeBeach.board.entity.Board;
import safeBeach.board.entity.Likes;
import safeBeach.board.repository.BoardRepository;
import safeBeach.board.repository.LikesRepository;

import java.util.List;


@Service
public class LikesService {

    private final BoardRepository boardRepository;
    private final LikesRepository likesRepository;

    @Autowired
    public LikesService(BoardRepository boardRepository, LikesRepository likesRepository) {
        this.boardRepository = boardRepository;
        this.likesRepository = likesRepository;
    }
//    @Autowired
//    public LikesService(LikesRepository likesRepository, BoardRepository boardRepository) {
//        this.likesRepository = likesRepository;
//        this.boardRepository = boardRepository;
//    }

//    public void likeson(Integer board_id, String user){
//        Board board = boardRepository.findById(board_id)
//                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 존재하지 않습니다. id=" + board_id));
//
//        Likes likes = Likes.builder().
//                user(user).
//                board(board).
//                build();
//        likesRepository.save(likes);
//    }
    public void likeson(Integer board_id, String user) {
        Board board = boardRepository.findById(board_id)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 존재하지 않습니다. id=" + board_id));

        boolean isLiked = false;
        List<Likes> like = likesRepository.findByBoardIdAndUser(board_id, user);

        if (!like.isEmpty()) {
            int id = like.get(0).getId();
            likesRepository.deleteById(id);
        }
      else {
            Likes likes = Likes.builder().
                    user(user).
                    board(board).
                    build();
            likesRepository.save(likes);
        }
    }
}
