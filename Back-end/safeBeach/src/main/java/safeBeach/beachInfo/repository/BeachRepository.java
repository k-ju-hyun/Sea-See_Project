package safeBeach.beachInfo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import safeBeach.beachInfo.entity.Beach;

import java.util.List;
import java.util.Optional;

public interface BeachRepository extends JpaRepository<Beach, Long> {
    Optional<Beach> findByBeach(String beachName);

    List<Beach> findAllByRegion(String region);
}
