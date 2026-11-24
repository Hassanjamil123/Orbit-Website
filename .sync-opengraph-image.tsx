import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

// Social card generated at build time from the supplied Orbit app icon.
// Swap for a designed 1200×630 asset when the brand kit includes one.
export const alt = "Orbit — Just Tell Orbit.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const icon = await readFile(path.join(process.cwd(), "public/brand/orbit-app-icon-256.png"));
  const iconSrc = `data:image/png;base64,${icon.toString("base64")}`;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#ffffff",
          color: "#0d0d12",
        }}
      >
        <img src={iconSrc} width={132} height={132} alt="" style={{ borderRadius: 30 }} />
        <div style={{ marginTop: 44, fontSize: 92, fontWeight: 700, letterSpacing: -4 }}>Just Tell Orbit.</div>
        <div style={{ marginTop: 18, fontSize: 32, color: "#4f5160" }}>
          The personal AI being built to get things done.
        </div>
        <div style={{ marginTop: 40, display: "flex", height: 6, width: 96, borderRadius: 3, background: "linear-gradient(90deg, #b04cf4, #6351f8)" }} />
      </div>
    ),
    size,
  );
}
