package if_core_034.train_desk.dto;

import if_core_034.train_desk.entity.Entrance;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class StationConfigurationDto {
    private List<CashDeskDto> cashDeskDtos;
    private List<Entrance> entrances;
    private long secondsStart;
    private long secondsEnd;
}
