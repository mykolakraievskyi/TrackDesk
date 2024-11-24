package if_core_034.train_desk.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "ticket")
public class Ticket {
    @Id
    private int ticketId;
    private String train;
    private String carriage;
    private String departureStation;
    private String arrivalStation;
    private LocalTime departureTime;
    private LocalTime arrivalTime;
    private double price;
}
