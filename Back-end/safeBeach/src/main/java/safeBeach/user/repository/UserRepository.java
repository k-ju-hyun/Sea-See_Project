package safeBeach.user.repository;

import safeBeach.user.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.Optional;

public interface UserRepository extends JpaRepository<Users, Long> {
    Optional<Users> findByUserId(String userId);
    Optional<Users> findByUserIdAndPassword(String userId, String password);

    Boolean existsByUserId(String userId);

    void deleteByUserId(String userId);
}
