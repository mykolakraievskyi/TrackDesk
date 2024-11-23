package if_core_034.train_desk;

import if_core_034.train_desk.entity.TimeRange;
import if_core_034.train_desk.strategy.RandomGenerationStrategy;
import org.junit.jupiter.api.Test;

import java.time.LocalTime;

import static org.junit.jupiter.api.Assertions.*;

class RandomGenerationStrategyTest {

	private RandomGenerationStrategy strategy;
	private TimeRange timeRange;

	@Test
	void testGetNextArrivalTime_ValidRange() {
		timeRange = new TimeRange(LocalTime.of(10, 0), LocalTime.of(12, 0));
		strategy = new RandomGenerationStrategy();
		strategy.updateTimeRange(timeRange);

		for (int i = 0; i < 100; i++) {
			LocalTime result = strategy.getNextArrivalTime();
			assertTrue(result.equals(timeRange.getMinTime()) || result.isAfter(timeRange.getMinTime()),
					"Generated time should be >= minTime");
			assertTrue(result.equals(timeRange.getMaxTime()) || result.isBefore(timeRange.getMaxTime()),
					"Generated time should be <= maxTime");
		}
	}

	@Test
	void testGetNextArrivalTime_SameMinAndMaxTime() {
		LocalTime fixedTime = LocalTime.of(15, 30);
		timeRange = new TimeRange(fixedTime, fixedTime);
		strategy = new RandomGenerationStrategy();
		strategy.updateTimeRange(timeRange);

		for (int i = 0; i < 10; i++) { // Test multiple times to ensure consistency
			LocalTime result = strategy.getNextArrivalTime();
			assertEquals(fixedTime, result, "Generated time should always be equal to the fixed time");
		}
	}

	@Test
	void testGetNextArrivalTime_InvalidTimeRange() {
		timeRange = new TimeRange(LocalTime.of(18, 0), LocalTime.of(16, 0));
		strategy = new RandomGenerationStrategy();
		strategy.updateTimeRange(timeRange);

		Exception exception = assertThrows(IllegalArgumentException.class, strategy::getNextArrivalTime,
				"Should throw IllegalArgumentException for invalid time range");
		assertEquals("minTime cannot be after maxTime", exception.getMessage());
	}

	@Test
	void testGetNextArrivalTime_NullTimeRange() {
		strategy = new RandomGenerationStrategy();
		strategy.updateTimeRange(null);

		Exception exception = assertThrows(NullPointerException.class, strategy::getNextArrivalTime,
				"Should throw NullPointerException when range is not set");
		assertEquals("Range is not set", exception.getMessage());
	}

}
