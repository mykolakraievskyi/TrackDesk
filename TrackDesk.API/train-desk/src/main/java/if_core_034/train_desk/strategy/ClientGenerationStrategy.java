package if_core_034.train_desk.strategy;

import if_core_034.train_desk.entity.TimeRange;

import java.time.LocalTime;
import org.springframework.stereotype.Component;

@Component
public interface ClientGenerationStrategy {
    LocalTime getNextArrivalTime();

    boolean updateTimeRange(TimeRange timeRange);
}
