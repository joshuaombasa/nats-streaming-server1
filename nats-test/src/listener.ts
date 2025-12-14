import nats, { Stan } from 'node-nats-streaming';
import { randomBytes } from 'crypto';
import { TicketCreatedListener } from '../events/ticket-created-listener';

console.clear();

const NATS_CLUSTER_ID = 'ticketing';
const NATS_URL = 'http://localhost:4222';
const CLIENT_ID = `orders-listener-${randomBytes(4).toString('hex')}`;

let stan: Stan;

const connectToNats = () => {
  stan = nats.connect(NATS_CLUSTER_ID, CLIENT_ID, {
    url: NATS_URL,
  });

  stan.on('connect', () => {
    console.log('Orders service connected to NATS');

    new TicketCreatedListener(stan).listen();
  });

  stan.on('close', () => {
    console.log('NATS connection closed');
    process.exit();
  });

  stan.on('error', (err) => {
    console.error('NATS connection error:', err);
  });
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

function shutdown() {
  if (stan) {
    stan.close();
  }
}

connectToNats();
