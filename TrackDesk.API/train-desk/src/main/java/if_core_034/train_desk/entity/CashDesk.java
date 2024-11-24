package if_core_034.train_desk.entity;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.PriorityQueue;

@Data
@AllArgsConstructor
public class CashDesk {
    private int id;
    private Position position;
    private PriorityQueue<Client> queue;
    private boolean isReserve;
    private boolean isOperational;

    public long getPotentialQueuePosition(Client client) {
        return queue.stream().
                filter(c -> c.getStatus().compareTo(client.getStatus()) >= 0)
                .count();
    }
}
