package if_core_034.train_desk;

import if_core_034.train_desk.entity.TimeRange;
import if_core_034.train_desk.strategy.UniformGenerationStrategy;
import org.junit.jupiter.api.Test;

import java.time.LocalTime;
import java.util.concurrent.Callable;

import static org.junit.jupiter.api.Assertions.*;

class UniformGenerationStrategyTest {

    private UniformGenerationStrategy strategy;

    @Test
    void testGetNextArrivalTime_WithValidInterval() {
        LocalTime expectedMinTime = LocalTime.of(10, 0);
        LocalTime expectedMaxTime = LocalTime.of(10, 30);
        strategy = new UniformGenerationStrategy();
        strategy.updateTimeRange(new TimeRange(expectedMinTime, expectedMaxTime));

        LocalTime result = strategy.getNextArrivalTime();
        assertEquals(expectedMaxTime, result, "The returned time should match the set interval");
    }

    @Test
    void testGetNextArrivalTime_WithNullInterval() {
        strategy = new UniformGenerationStrategy();

        assertThrows(NullPointerException.class,
                () -> strategy.updateTimeRange(null),
                "Should throw NullPointerException when interval is not set");
    }
}
