import { handleInterest } from "@/lib/submissions";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function POST(req: Request) {
  return handleInterest(req);
}
