package if_core_034.train_desk.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BuyTicketDto {
    private int clientId;
    private int cashDeskId;
}
