package if_core_034.train_desk.strategy;

import if_core_034.train_desk.entity.TimeRange;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalTime;

@Data
@AllArgsConstructor
public class RandomGenerationStrategy implements ClientGenerationStrategy {
    private TimeRange timeRange;

    public LocalTime getNextArrivalTime() {
        int minTimeSecondOfDay = timeRange.getMinTime().toSecondOfDay();
        int maxTimeSecondOfDay = timeRange.getMaxTime().toSecondOfDay();
        return LocalTime.ofSecondOfDay(minTimeSecondOfDay + (int) (Math.random() * (maxTimeSecondOfDay - minTimeSecondOfDay)));
    }
}
