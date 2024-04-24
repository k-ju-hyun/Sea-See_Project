package safeBeach.board.repository;

import safeBeach.board.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

//@Repository
public interface BoardRepository extends JpaRepository<Board, Integer> {
//    Optional<?> findAllByCategory(int category);
    List<Board> findAllByCategorybig(Integer categorybig);
    List<Board> findAllByCategorybigAndCategorysmall(Integer categorybig,Integer categorysmall);

}
