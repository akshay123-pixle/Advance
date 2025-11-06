1->> configure the redis via docker

Run in PowerShell:

docker run --name redis-server -p 6379:6379 -d redis


Explanation:

--name redis-server → give your container a name

-p 6379:6379 → map Redis port to your local machine

-d → run in background

redis → image name (Docker will auto-download it if missing)

✅ Now Redis is running inside Docker!

Check:

docker ps


You should see something like:

CONTAINER ID   IMAGE    COMMAND   STATUS    PORTS
xxxxxxx         redis    ...       Up        0.0.0.0:6379->6379/tcp

🧩 STEP 5 — Test Redis

You can connect using the Redis CLI or from Node.js.

Option 1 — Redis CLI inside container
docker exec -it redis-server redis-cli


Then test:

SET name "John"
GET name


You’ll get:

"John"


🎉 Redis is working!


