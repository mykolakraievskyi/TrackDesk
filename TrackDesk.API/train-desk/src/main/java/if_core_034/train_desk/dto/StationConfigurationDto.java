package if_core_034.train_desk.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class StationConfigurationDto {
    private Integer[] cashRegisters;
    private Integer[] entry;
    private Integer[] exit;
}
