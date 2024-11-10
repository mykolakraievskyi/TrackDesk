package if_core_034.train_desk.entity;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ClientGenerator {
    private boolean isPaused;
    private ClientFactory factory;

    public Client generateClient(){
        throw new UnsupportedOperationException("Метод ще не реалізовано");
    }
    public void pauseGeneration(){
        throw new UnsupportedOperationException("Метод ще не реалізовано");
    }
    public void resumeGeneration(){
        throw new UnsupportedOperationException("Метод ще не реалізовано");
    }
}
