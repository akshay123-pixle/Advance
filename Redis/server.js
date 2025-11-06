// index.js
import express from "express";
import { createClient } from "redis";

const app = express();
const PORT = 3000;

// ------------------------------
// Connect to Redis
// ------------------------------
//docker exec -it redis-server redis-cli to see the data on the docker server 
const redis = createClient(); // it automatically connect to docker running image that we did "docker exec -it redis-server redis-cli" 

redis.on("error", (err) => console.log("Redis Client Error", err));

await redis.connect();
console.log("✅ Redis connected");

// ------------------------------
// Middleware
// ------------------------------
app.use(express.json());

// ------------------------------
// 1️⃣ Simple Key-Value (Cache)
// ------------------------------
app.get("/cache", async (req, res) => {
  const key = "greeting";

  // 1️⃣ Check if key exists in Redis
  const cached = await redis.get(key);
  if (cached) return res.send(`⚡ Cache hit: ${cached}`);

  // 2️⃣ Not in cache → store it for 60s
  await redis.setEx(key, 60, "Hello from Redis!");
  res.send("🌐 Cached: Hello from Redis!");

  /*
  Redis CLI commands to check:
  > get greeting
  Output: "Hello from Redis!"
  */
});

// ------------------------------
// 2️⃣ Hash Example (User)
// ------------------------------
app.get("/user", async (req, res) => {
  const key = "user:1";

  // Store a hash
  await redis.hSet(key, { name: "Alice", age: "25", email: "alice@example.com" });

  // Fetch hash
  const user = await redis.hGetAll(key);
  res.json(user);

  /*
  Redis CLI:
  > hGetAll user:1
  Output: { name: 'Alice', age: '25', email: 'alice@example.com' }
  */
});

// ------------------------------
// 3️⃣ List Example (Tasks)
// ------------------------------
app.get("/tasks", async (req, res) => {
  const key = "tasks";

  // Clear previous tasks
  await redis.del(key);

  // Add tasks (new items go to the start)
  await redis.lPush(key, "Task1", "Task2", "Task3");

  // Get all tasks
  const tasks = await redis.lRange(key, 0, -1);
  res.json(tasks);

  /*
  Redis CLI:
  > lRange tasks 0 -1
  Output: ["Task3","Task2","Task1"]
  */
});

// ------------------------------
// 4️⃣ Set Example (Unique Visitors)
// ------------------------------
app.get("/visitors", async (req, res) => {
  const key = "visitors";

  // Add visitors (duplicates ignored)
  await redis.sAdd(key, "Alice", "Bob", "Alice", "Charlie");

  // Get all unique visitors
  const visitors = await redis.sMembers(key);
  res.json(visitors);

  /*
  Redis CLI:
  > sMembers visitors
  Output: ["Alice","Bob","Charlie"] // order may vary
  */
});

// ------------------------------
// Start Server
// ------------------------------
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
