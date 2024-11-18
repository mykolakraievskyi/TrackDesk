package if_core_034.train_desk;

import if_core_034.train_desk.strategy.UniformGenerationStrategy;
import org.junit.jupiter.api.Test;

import java.time.LocalTime;

import static org.junit.jupiter.api.Assertions.*;

class UniformGenerationStrategyTest {

    private UniformGenerationStrategy strategy;

    @Test
    void testGetNextArrivalTime_WithValidInterval() {
        LocalTime expectedTime = LocalTime.of(10, 30);
        strategy = new UniformGenerationStrategy(expectedTime);

        LocalTime result = strategy.getNextArrivalTime();
        assertEquals(expectedTime, result, "The returned time should match the set interval");
    }

    @Test
    void testGetNextArrivalTime_WithNullInterval() {
        strategy = new UniformGenerationStrategy(null);

        Exception exception = assertThrows(NullPointerException.class,
                strategy::getNextArrivalTime,
                "Should throw NullPointerException when interval is not set");
        assertEquals("Interval is not set", exception.getMessage());
    }
}
