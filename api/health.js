import { database } from "../server/database.js";

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "GET") return res.status(405).json({ error: "Método não permitido." });
  try {
    await database().query("SELECT 1 AS ok", []);
    return res.status(200).json({ database: true });
  } catch (error) {
    console.error(error);
    return res.status(503).json({ database: false });
  }
}
