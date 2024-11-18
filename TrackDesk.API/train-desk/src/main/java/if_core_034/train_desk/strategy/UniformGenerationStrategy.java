package if_core_034.train_desk.strategy;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalTime;

@Data
@AllArgsConstructor
public class UniformGenerationStrategy implements ClientGenerationStrategy {
    private LocalTime interval;
    public LocalTime getNextArrivalTime() {
        return this.interval;
    }
}
