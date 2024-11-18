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

    boolean serveClient(){
        throw new UnsupportedOperationException("Метод ще не реалізовано");
    }
    void open(){
        throw new UnsupportedOperationException("Метод ще не реалізовано");
    }
    void close(){
        throw new UnsupportedOperationException("Метод ще не реалізовано");
    }
}
