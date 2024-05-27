import { Publisher } from './base-publisher';
import { TicketCreatedEvent } from './ticket-created-event';
import { Subjects } from './subjects';

class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}

export { TicketCreatedPublisher };
