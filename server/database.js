import { neon } from "@neondatabase/serverless";

export function database() {
  const url = String(process.env.LINK_PROFILE_DATABASE_URL || "").trim();
  if (!url) {
    throw Object.assign(
      new Error("LINK_PROFILE_DATABASE_URL não configurada para o banco exclusivo do UBA Link Perfil."),
      { statusCode: 503 },
    );
  }
  return neon(url);
}
