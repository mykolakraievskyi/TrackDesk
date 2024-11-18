package if_core_034.train_desk.strategy;

import java.time.LocalTime;

public interface ClientGenerationStrategy {
    LocalTime getNextArrivalTime();
}
