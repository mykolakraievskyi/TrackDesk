package if_core_034.train_desk.dto;

import if_core_034.train_desk.entity.Position;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CashDeskDto {
    private int id;
    private Position position;
}
