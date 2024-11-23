package if_core_034.train_desk.dto;

import if_core_034.train_desk.entity.ClientStatus;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ClientDto {
    private int id;
    private ClientStatus clientStatus;
    private int cashDeskId;
    private int entranceId;
}
