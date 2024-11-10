package if_core_034.train_desk.entity;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class Client implements Comparable<Client> {
    private int id;
    private ClientStatus status;
    private List<Ticket> tickets;
    private Entrance entrance;
    private Position position;

    @Override
    public int compareTo(Client otherClient) {
        return this.status.compareTo(otherClient.status);
    }
}
