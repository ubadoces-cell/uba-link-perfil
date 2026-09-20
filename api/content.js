import { timingSafeEqual } from "node:crypto";
import { database } from "../server/database.js";

const DEFAULT_CONTENT = {
  salesCount: 29637,
  links: {
    ifood: "https://www.ifood.com.br/delivery/limoeiro-do-norte-ce/uba-doces-limoeiro/f8ef93f4-acc3-4a1b-b436-b71314feadbd",
    whatsapp: "https://wa.me/message/E5CLDBR2RHOFM1",
    youtube: "https://www.youtube.com/@ubadoces",
  },
};

function safeEqual(left, right) {
  const a = Buffer.from(String(left || ""));
  const b = Buffer.from(String(right || ""));
  return a.length === b.length && timingSafeEqual(a, b);
}

function cleanUrl(value, fallback) {
  try {
    const url = new URL(String(value || ""));
    return ["https:", "http:"].includes(url.protocol) ? url.toString() : fallback;
  } catch {
    return fallback;
  }
}

function normalize(value) {
  const content = value && typeof value === "object" ? value : {};
  const links = content.links && typeof content.links === "object" ? content.links : {};
  const rawSalesCount = Number(content.salesCount);
  return {
    salesCount: Number.isFinite(rawSalesCount) ? Math.max(0, Math.trunc(rawSalesCount)) : DEFAULT_CONTENT.salesCount,
    links: {
      ifood: cleanUrl(links.ifood, DEFAULT_CONTENT.links.ifood),
      whatsapp: cleanUrl(links.whatsapp, DEFAULT_CONTENT.links.whatsapp),
      youtube: cleanUrl(links.youtube, DEFAULT_CONTENT.links.youtube),
    },
  };
}

async function ensureSchema(sql) {
  await sql.query(`CREATE TABLE IF NOT EXISTS link_profile_settings (
    id INTEGER PRIMARY KEY,
    data JSONB NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`, []);
}

async function load(sql) {
  await ensureSchema(sql);
  const rows = await sql.query(`SELECT data, updated_at FROM link_profile_settings WHERE id=1`, []);
  if (rows[0]) return { content: normalize(rows[0].data), updatedAt: rows[0].updated_at };
  const created = await sql.query(`INSERT INTO link_profile_settings(id,data) VALUES(1,$1::jsonb)
    ON CONFLICT(id) DO UPDATE SET data=link_profile_settings.data RETURNING data,updated_at`,
    [JSON.stringify(DEFAULT_CONTENT)]);
  return { content: normalize(created[0].data), updatedAt: created[0].updated_at };
}

function canUpdate(req) {
  const authorization = String(req.headers.authorization || "");
  const bearer = authorization.match(/^Bearer\s+(.+)$/i)?.[1] || "";
  const integration = String(req.headers["x-uba-integration-secret"] || "");
  const adminSecret = String(process.env.LINK_PROFILE_ADMIN_SECRET || "");
  const integrationSecret = String(process.env.UBA_INTEGRATION_SECRET || "");
  return Boolean(
    (adminSecret && safeEqual(bearer, adminSecret)) ||
    (integrationSecret && safeEqual(integration, integrationSecret))
  );
}

export default async function handler(req, res) {
  try {
    const sql = database();
    if (req.method === "GET") {
      res.setHeader("Cache-Control", "public, max-age=60, stale-while-revalidate=300");
      return res.status(200).json(await load(sql));
    }
    res.setHeader("Cache-Control", "no-store");
    if (req.method !== "PUT") return res.status(405).json({ error: "Método não permitido." });
    if (!canUpdate(req)) return res.status(401).json({ error: "Atualização não autorizada." });
    const current = await load(sql);
    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
    const content = normalize({
      ...current.content,
      ...body,
      links: { ...current.content.links, ...(body.links || {}) },
    });
    const rows = await sql.query(`INSERT INTO link_profile_settings(id,data,updated_at) VALUES(1,$1::jsonb,NOW())
      ON CONFLICT(id) DO UPDATE SET data=excluded.data,updated_at=excluded.updated_at RETURNING updated_at`,
      [JSON.stringify(content)]);
    return res.status(200).json({ content, updatedAt: rows[0].updated_at });
  } catch (error) {
    console.error(error);
    return res.status(error.statusCode || 500).json({
      error: error.statusCode ? error.message : "Não foi possível acessar o conteúdo do Link Perfil.",
    });
  }
}
