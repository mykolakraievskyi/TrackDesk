package if_core_034.train_desk.strategy;

import if_core_034.train_desk.entity.TimeRange;

import org.springframework.stereotype.Component;
import org.springframework.context.annotation.Primary;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;

@Data
@NoArgsConstructor
@Component
@Primary
public class UniformGenerationStrategy implements ClientGenerationStrategy {
    private LocalTime interval;

    public LocalTime getNextArrivalTime() {
        return this.interval;
    }

    public boolean updateTimeRange(TimeRange timeRange) {
        this.interval = timeRange.getMaxTime();
        return true;
    }
}
