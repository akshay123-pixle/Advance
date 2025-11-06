Here’s a clean, structured **Markdown note** based on your Kafka UI setup instructions. You can save it as `kafka_ui_setup.md`.

---

# Kafka UI Setup with Docker

## 1️⃣ What is Kafka UI?

* **Kafka UI** is a web-based dashboard for monitoring and managing Kafka clusters.
* Provides a **visual interface** for:

  * Viewing topics and partitions
  * Monitoring consumer groups and offsets
  * Inspecting messages and schemas
  * Managing configurations

It simplifies Kafka operations compared to using only CLI commands.

---

## 2️⃣ How to Access Kafka UI via Docker

### Step 1: Update Kafka `server.properties`

To allow Docker (or other devices) to connect, set `advertised.listeners` with your machine’s IP:

```properties
# kraft/server.properties
advertised.listeners=PLAINTEXT://<YOUR-IP>:9092,CONTROLLER://localhost:9093
```

* Replace `<YOUR-IP>` with your machine's actual IP.

  * **Windows:** `ipconfig`
  * **Linux/Mac:** `ifconfig`

> This ensures Docker can reach your Kafka broker at the correct network address.

---

### Step 2: Restart Kafka

```powershell
# Stop the server if running
# Start again
.\bin\windows\kafka-server-start.bat config\kraft\server.properties
```

---

### Step 3: Run Kafka UI Docker Container

```powershell
docker run --rm -d -p 8080:8080 `
  -e KAFKA_CLUSTERS_0_NAME=my-cluster `
  -e KAFKA_CLUSTERS_0_BOOTSTRAPSERVERS=<YOUR-IP>:9092 `
  --name kafkaui provectuslabs/kafka-ui
```

* **Explanation of flags**:

  * `-p 8080:8080` → maps container port 8080 to local port 8080
  * `-e KAFKA_CLUSTERS_0_NAME=my-cluster` → sets cluster name in UI
  * `-e KAFKA_CLUSTERS_0_BOOTSTRAPSERVERS=<YOUR-IP>:9092` → tells UI how to connect to Kafka
  * `--rm -d` → runs container in detached mode and removes it when stopped

---

### Step 4: Access Kafka UI

* Open a browser and go to:

```
http://localhost:8080
```

* You should see **all topics, consumers, and cluster details**.

---

### ✅ Notes

1. **IP must be reachable from Docker**:

   * If Docker runs on WSL2 or another VM, use the host machine IP or Docker network bridge IP.
2. **Kafka must be running** before starting Kafka UI.
3. For multiple clusters, you can set additional environment variables:

```bash
-e KAFKA_CLUSTERS_1_NAME=cluster2 -e KAFKA_CLUSTERS_1_BOOTSTRAPSERVERS=<IP2>:9092
```

---

So basically: any client outside your Kafka host (like Docker UI) must connect using the host’s network-reachable IP, not localhost.
