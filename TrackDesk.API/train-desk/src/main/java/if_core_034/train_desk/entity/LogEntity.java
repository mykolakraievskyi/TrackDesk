package if_core_034.train_desk.entity;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalTime;
import java.util.List;

@Data
@AllArgsConstructor
public class LogEntity {
    private int id;
    private int clientId;
    private int cashDeskID;
    private List<Ticket> tickets;
    private LocalTime startTime;
    private LocalTime endTime;
}
