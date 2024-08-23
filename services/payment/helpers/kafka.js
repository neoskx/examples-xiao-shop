const kafkaBrokers = process.env.KAFKA_BROKER
  ? process.env.KAFKA_BROKER.split(',')
  : ['kafka:9092'];

module.exports = {
  borkers: kafkaBrokers,
  orderCreatedTopic: process.env.KAFKA_TOPIC_ORDER_CREATED || 'order-created',
};
