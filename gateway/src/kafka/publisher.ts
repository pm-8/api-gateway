import { producer } from "./kafka.service";

export async function publishGatewayEvent(event: unknown) {
    try {
        await producer.send({
            topic: "gateway.logs",
            messages: [
                {
                    value: JSON.stringify(event)
                }
            ]
        });

        console.log("Kafka event published");
    } catch (err) {
        console.error("Kafka publish failed:", err);
    }
}