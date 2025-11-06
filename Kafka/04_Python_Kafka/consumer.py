# consumer.py
# Consumes messages from Kafka topic

from kafka import KafkaConsumer

TOPIC = "demo-topic"
BROKER = "localhost:9092"
GROUP_ID = "email-consumers"

def main():
    consumer = KafkaConsumer(
        TOPIC,
        bootstrap_servers=BROKER,
        auto_offset_reset="earliest",
        value_deserializer=lambda v: v.decode("utf-8")
    )
    
    print("Consumer started. Waiting for new emails...")
    
    for message in consumer:
        print(f"Consumed: {message.value}")

if __name__ == "__main__":
    main()
