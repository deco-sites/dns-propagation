// deno-lint-ignore-file no-explicit-any
import { create } from "djwt";
import { importSecret } from "./jwt.ts";

interface MetabaseOptions {
  params?: Record<string, unknown>;
  resource: { dashboard: number };
  exp?: number;
}

const sign = async (options: any) => {
  const METABASE_SECRET_KEY = Deno.env.get("METABASE_SECRET_KEY");

  if (!METABASE_SECRET_KEY) {
    throw new Error("Missing METABASE_SECRET_KEY environment variable");
  }

  return create(
    { alg: "HS256", typ: "JWT" },
    options,
    await importSecret(METABASE_SECRET_KEY),
  );
};

export const getMetabaseUrl = async (options: MetabaseOptions) => {
  const token = await sign(options);
  const url = new URL(
    `/embed/dashboard/${token}`,
    "https://metabasedeco.fly.dev",
  );

  return url.href;
};
