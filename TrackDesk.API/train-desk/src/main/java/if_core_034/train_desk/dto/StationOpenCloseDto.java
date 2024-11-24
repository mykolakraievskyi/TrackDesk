package if_core_034.train_desk.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class StationOpenCloseDto {
    private boolean isClosed;
    private int stationId;
}
