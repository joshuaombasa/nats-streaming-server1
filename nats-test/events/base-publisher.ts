import { Stan } from 'node-nats-streaming';
import { Subjects } from './subjects';

interface Event {
  subject: Subjects;
  data: any;
}

abstract class Publisher<T extends Event> {
  abstract readonly subject: T['subject'];

  protected client: Stan;

  constructor(client: Stan) {
    this.client = client;
  }

  publish(data: T['data']): Promise<void> {
    return new Promise((resolve, reject) => {
      const serializedData = JSON.stringify(data);

      this.client.publish(this.subject, serializedData, (error) => {
        if (error) {
          console.error(
            `[Publisher Error] Failed to publish event on subject "${this.subject}":`,
            error
          );
          return reject(error);
        }

        console.log(
          `[Publisher] Event successfully published on subject "${this.subject}"`
        );
        resolve();
      });
    });
  }
}

export { Publisher, Event };
