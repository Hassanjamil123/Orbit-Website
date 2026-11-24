import { handleExport } from "@/lib/admin-export";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function GET(req: Request) {
  return handleExport(req);
}
