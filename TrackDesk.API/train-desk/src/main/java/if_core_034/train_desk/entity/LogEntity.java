package if_core_034.train_desk.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "log_entity")
public class LogEntity {
    @Id
    private int id;
    private int clientId;
    private ClientStatus clientStatus;
    private int cashDeskID;
    @OneToMany
    private List<Ticket> tickets;
    private LocalTime startTime;
    private LocalTime endTime;
}
