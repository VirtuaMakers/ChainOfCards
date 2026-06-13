import express from "express";

const app = express();
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", project: "Chain of Cards" });
});

const PORT = process.env.PORT ?? 3001;
app.listen(PORT, () => {
  console.log(`Chain of Cards server running on port ${PORT}`);
});
