import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background:
          "radial-gradient(circle at 50% 80%, #00be6a 0%, #0b0f14 40%, #06080d 100%)",
        color: "white",
        fontFamily: "Inter",
        padding: "80px",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 800,
          height: 800,
          background: "radial-gradient(circle, #00ff99 0%, transparent 70%)",
          filter: "blur(180px)",
          opacity: 0.15,
        }}
      />

      <h1
        style={{
          fontSize: 92,
          fontWeight: 800,
          background: "linear-gradient(90deg, #00ff99, #00cc88, #00ffcc)",
          backgroundClip: "text",
          color: "transparent",
          marginBottom: 20,
        }}
      >
        JoAT.
      </h1>

      <p
        style={{
          fontSize: 36,
          opacity: 0.60,
          textAlign: "center",
          maxWidth: 900,
        }}
      >
        Track and manage your job applications in one powerful place.
      </p>

      <div
        style={{
          marginTop: 60,
          padding: "14px 28px",
          borderRadius: 999,
          background: "rgba(0,255,153,0.15)",
          border: "1px solid rgba(0,255,153,0.4)",
          fontSize: 24,
          letterSpacing: 1,
        }}
      >
        yourjoat.vercel.app
      </div>
    </div>,
    size,
  );
}
