package if_core_034.train_desk.entity;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalTime;

@Data
@AllArgsConstructor
public class TimeRange {
    private LocalTime minTime;
    private LocalTime maxTime;
}
