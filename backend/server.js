const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const app = express();
app.use(cors());
app.use(express.json());





const users = [];
let tasks = [];
const JWT_SECRET = "secret123";





function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}



app.get("/api/health", (req, res) => {
  res.json({ message: "Backend is running" });
});





app.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  const userExists = users.find((u) => u.email === email);
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ name, email, password: hashedPassword });

  res.json({ message: "User registered successfully" });
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email);
  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1h" });
  res.json({ token,name: user.name});
});

// ==================
// Task Routes (Protected)
// ==================
app.get("/api/tasks", authMiddleware, (req, res) => {
  res.json(tasks);
});

app.post("/api/tasks", authMiddleware, (req, res) => {
  const { title, status } = req.body;

  const newTask = {
    id: Date.now(),
    title,
    status,
  };

  tasks.push(newTask);
  res.json(newTask);
});

app.put("/api/tasks/:id", authMiddleware, (req, res) => {
  const { id } = req.params;
  const { title, status } = req.body;

  tasks = tasks.map((task) =>
    task.id == id ? { ...task, title, status } : task
  );

  res.json({ message: "Task updated" });
});

app.delete("/api/tasks/:id", authMiddleware, (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter((task) => task.id != id);
  res.json({ message: "Task deleted" });
});

// ==================
// Start Server
// ==================
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
