import { Kafka } from "kafkajs";
import { logger } from "../logger";
const kafka = new Kafka({
    clientId: "api-gateway",
    brokers: ["localhost:9092"]
});

export const producer = kafka.producer();

export async function connectKafka() {
    await producer.connect();
    logger.info("Kafka Connected");
}