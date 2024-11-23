package if_core_034.train_desk.strategy;

import if_core_034.train_desk.entity.TimeRange;

import org.springframework.stereotype.Component;

import lombok.NoArgsConstructor;
import lombok.Data;

import java.time.LocalTime;

@Data
@NoArgsConstructor
@Component
public class RandomGenerationStrategy implements ClientGenerationStrategy {
    private TimeRange timeRange;

    public LocalTime getNextArrivalTime() {
        int minTimeSecondOfDay = timeRange.getMinTime().toSecondOfDay();
        int maxTimeSecondOfDay = timeRange.getMaxTime().toSecondOfDay();
        return LocalTime.ofSecondOfDay(minTimeSecondOfDay + (int) (Math.random() * (maxTimeSecondOfDay - minTimeSecondOfDay)));
    }

    public void updateTimeRange(TimeRange timeRange) {
        this.timeRange = timeRange;
    }
}
