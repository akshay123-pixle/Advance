Absolutely! Here’s a clear, well-structured **Markdown note** you can save as `kafka_producer_consumer_notes.md`. I’ve formatted it for clarity and easy reference.

---

# Kafka Producer and Consumer Notes (Windows, KRaft Mode)

## 1. Creating a Topic

```powershell
.\bin\windows\kafka-topics.bat --create --topic orders --bootstrap-server localhost:9092 --partitions 2 --replication-factor 1
```

Output:

```
Created topic orders.
```

* **Partitions**: 2 → allows messages to be distributed among consumers in the same group
* **Replication factor**: 1 → only one copy of the data

---

## 2. Creating a Producer with Key

```powershell
.\bin\windows\kafka-console-producer.bat --bootstrap-server localhost:9092 --topic orders --property parse.key=true --property key.separator=:
```

### Example Messages

```
keyA:Message1
keyB:Message2
keyC:Message3
```

* `parse.key=true` → tells Kafka that the input has keys
* `key.separator=:` → separates key from value

---

## 3. Creating Two Consumers in the Same Group

```powershell
# Consumer 1
.\bin\windows\kafka-console-consumer.bat --bootstrap-server localhost:9092 --topic orders --group og

# Consumer 2
.\bin\windows\kafka-console-consumer.bat --bootstrap-server localhost:9092 --topic orders --group og
```

### Behavior:

* Topic `orders` has **2 partitions** → messages are **distributed across consumers** in the same group.
* Example flow:

  * `KeyD:Message4` → goes to **Consumer 1**
  * `KeyE:Message5` → goes to **Consumer 2**
  * `KeyD:Message80` → again goes to **Consumer 1**

**Note:** Kafka assigns partitions **deterministically based on key** → same key always goes to the same partition.

---

## 4. Creating Two Consumer Groups (Each with One Consumer)

```powershell
# Consumer in group og1
.\bin\windows\kafka-console-consumer.bat --bootstrap-server localhost:9092 --topic orders --group og1

# Consumer in group og2
.\bin\windows\kafka-console-consumer.bat --bootstrap-server localhost:9092 --topic orders --group og2
```

### Behavior:

* Every consumer group **receives all messages independently**
* Sending messages:

```
Producer: KeyA:Message1
Consumer og1: Message1
Consumer og2: Message1
```

* Each group maintains its **own offset** → allows multiple independent processing of the same topic.

---

## 5. Key Notes

* **Consumers in the same group**:

  * Share partitions
  * Each message is delivered to **only one consumer** in the group

* **Consumers in different groups**:

  * Each group gets **all messages**
  * Useful for broadcasting messages to multiple independent applications

* **Partitions and Keys**:

  * Kafka ensures that messages with the **same key** always go to the **same partition**
  * Ensures ordering per key

---

## 6. Useful Commands

* **List all topics**:

```powershell
.\bin\windows\kafka-topics.bat --list --bootstrap-server localhost:9092
```

* **Describe a topic**:

```powershell
.\bin\windows\kafka-topics.bat --describe --topic orders --bootstrap-server localhost:9092
```

* **Describe consumer group**:

```powershell
.\bin\windows\kafka-consumer-groups.bat --bootstrap-server localhost:9092 --describe --group og
```

* **Delete topic**:

```powershell
.\bin\windows\kafka-topics.bat --delete --topic orders --bootstrap-server localhost:9092
```

---

✅ **Summary Table**

| Setup                          | Behavior                                               |
| ------------------------------ | ------------------------------------------------------ |
| Same group, multiple consumers | Messages **load-balanced** across consumers            |
| Different groups               | Each group receives **all messages independently**     |
| Key used                       | Messages with same key always go to **same partition** |

---

