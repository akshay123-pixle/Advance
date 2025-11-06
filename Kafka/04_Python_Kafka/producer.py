# producer.py
# Watches emails.txt and sends new emails to Kafka topic

import time
from kafka import KafkaProducer

FILE_NAME = "emails.txt"
TOPIC = "demo-topic"
BROKER = "localhost:9092"

def get_lines():
    with open(FILE_NAME, "r") as f:
        return f.read().splitlines()

def main():
    producer = KafkaProducer(bootstrap_servers=BROKER, value_serializer=lambda v: v.encode("utf-8"))
    seen_emails = set(get_lines())
    
    print("Producer started. Watching for new emails...")
    
    while True:
        time.sleep(2)
        current_lines = set(get_lines())
        new_emails = current_lines - seen_emails
        for email in new_emails:
            producer.send(TOPIC, email)
            print(f"Sent to Kafka: {email}")
        seen_emails.update(new_emails)

if __name__ == "__main__":
    main()
