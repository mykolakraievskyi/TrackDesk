package if_core_034.train_desk.entity;

import if_core_034.train_desk.strategy.ClientGenerationStrategy;

public interface ClientFactory {
    Client generateClient();

    ClientGenerationStrategy getClientGenerationStrategy();
}
