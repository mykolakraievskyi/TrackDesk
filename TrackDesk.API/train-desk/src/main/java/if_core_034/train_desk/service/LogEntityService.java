package if_core_034.train_desk.service;

import if_core_034.train_desk.repository.LogEntityRepository;
import if_core_034.train_desk.entity.LogEntity;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LogEntityService {

    private final LogEntityRepository logEntityRepository;

    public LogEntity findLogEntity(int logEntityId) {
        return logEntityRepository.findLogEntityById(logEntityId);
    }

    public List<LogEntity> findAllLogEntities() {
        return logEntityRepository.findAll();
    }

    public void saveLogEntity(LogEntity logEntity) {
        this.logEntityRepository.save(logEntity);
    }
}
