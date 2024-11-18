package if_core_034.train_desk.entity;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalTime;

@Data
@AllArgsConstructor
public class Ticket {
    private int ticketId;
    private String train;
    private String carriage;
    private String departureStation;
    private String arrivalStation;
    private LocalTime departureTime;
    private LocalTime arrivalTime;
    private BigDecimal price;
}
