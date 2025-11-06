import express from "express";
import axios from "axios";
import { createClient } from "redis";
const PORT = 3000;
const app = express();
app.use(express.json());
const redis = createClient();
await redis.connect();
console.log("✅ Redis connected");
// string
app.get("/string", async (req, res) => {
  const key = "akshay"; // Redis key
  const value = "TCS"; // Value to store

  // 1️⃣ Check if the key exists in Redis
  const cached = await redis.get(key);

  if (cached) {
    return res.json({
      source: "redis",
      key,
      value: cached,
    });
  }

  // 2️⃣ Key not found → set it in Redis
  await redis.set(key, value);

  res.json({
    source: "nodejs",
    key,
    value,
  });

  /*
  Redis CLI check:
  > get akshay
  Output: "TCS"
  */
});
//lists

app.get("/tasks", async (req, res) => {
  const key = "tasks";

  // Clear old tasks (for demo)
  await redis.del(key);

  // Add some tasks (LPUSH adds to left)
  await redis.lPush(key, "Task1", "Task2", "Task3");

  // Get all tasks
  const tasks = await redis.lRange(key, 0, -1);

  res.json({
    redis_key: key,
    tasks
  });

  /*
  Redis CLI check:
  > lRange tasks 0 -1
  ["Task3", "Task2", "Task1"]
  */
});

// set - unique element

app.get("/visitors", async (req, res) => {
  const key = "visitors";

  // 1️⃣ Add visitors (duplicates are ignored)
  await redis.sAdd(key, "Alice", "Bob", "Alice", "Charlie",);

  // 2️⃣ Get all unique visitors
  const visitors = await redis.sMembers(key);

  res.json({
    redis_key: key,
    visitors
  });

  /*
  Redis CLI check:
  > sMembers visitors
  Output: ["Alice", "Bob", "Charlie"]
  */
});

// sorted lists ->>>Set + automatic sorting.





app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
