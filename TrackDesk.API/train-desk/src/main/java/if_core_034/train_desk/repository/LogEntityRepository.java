package if_core_034.train_desk.repository;

import if_core_034.train_desk.entity.LogEntity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LogEntityRepository extends JpaRepository<LogEntity, Integer> {
    LogEntity findLogEntityById(int id);
}
