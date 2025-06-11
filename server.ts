import express from "express";
import cors from "cors";
import { sendMail } from "./utils/mailer";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post("/api/book-demo", async (req, res) => {
  try {
    await sendMail(req.body);
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (err) {
    console.error("Email error:", err);
    res.status(500).json({ message: "Failed to send email." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
