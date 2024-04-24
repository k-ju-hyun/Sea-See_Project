package safeBeach.beachInfo.repository;

import com.mysql.cj.x.protobuf.MysqlxDatatypes;
import org.springframework.data.jpa.repository.JpaRepository;
import safeBeach.beachInfo.entity.Beach;
import safeBeach.beachInfo.entity.BeachInfo;

import java.util.List;
import java.util.Optional;

public interface BeachInfoRepository extends JpaRepository<BeachInfo, Long> {
    Optional<BeachInfo> findByBeachName(String beachName);
    List<BeachInfo> findAllByRegion(String region);
}
