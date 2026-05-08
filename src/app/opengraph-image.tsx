import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Solobank — A bank account for AI agents on Solana";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage(): ImageResponse {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "linear-gradient(135deg, #0d0d0f 0%, #14101f 55%, #1a0e2e 100%)",
          color: "white",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #9945FF 0%, #14F195 100%)",
            }}
          />
          <span style={{ fontSize: "32px", fontWeight: 700 }}>Solobank</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div
            style={{
              fontSize: "84px",
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              backgroundImage:
                "linear-gradient(90deg, #ffffff 0%, #c4b5fd 60%, #14F195 100%)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            A bank account
            <br />
            for AI agents
          </div>
          <div style={{ fontSize: "32px", color: "#a1a1aa", maxWidth: "900px" }}>
            Earn · Borrow · Invest · Swap · Pay — autonomously on Solana
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "24px",
            color: "#71717a",
          }}
        >
          <span>solobank.ink</span>
          <span>npx -y @solobank/cli init</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
