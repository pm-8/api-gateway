import { Kafka } from "kafkajs";

const kafka = new Kafka({
    clientId: "api-gateway-consumer",
    brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({
    groupId: "gateway-log-consumer",
});

export async function startKafkaConsumer() {
    await consumer.connect();

    await consumer.subscribe({
        topic: "gateway.logs",
        fromBeginning: true,
    });

    console.log("Kafka Consumer Connected");

    await consumer.run({
        eachMessage: async ({ message }) => {
            if (!message.value) return;

            const event = JSON.parse(message.value.toString());

            console.log("Kafka Event Received:", event);
        },
    });
}