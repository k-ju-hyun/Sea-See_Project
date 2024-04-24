package safeBeach.board.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import safeBeach.board.entity.Board;
import safeBeach.board.entity.Comments;
import safeBeach.board.entity.Likes;
import safeBeach.user.entity.Users;

import java.util.List;

public interface LikesRepository extends JpaRepository<Likes, Integer> {
    boolean existsByBoardIdAndUser(int boardId, String User);
    int countByBoardId(int boardId);
    List<Likes> findByBoardIdAndUser(int boardid, String User);
    List<Likes> findByBoardId(int boardId);
}
