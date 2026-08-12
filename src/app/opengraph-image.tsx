import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "MT Turismo — Agencia de viajes · Adolfo Gonzales Chaves";

/**
 * Imagen Open Graph generada por código (aparece al compartir el link
 * por WhatsApp, Instagram, etc.). Sigue la paleta editorial del sitio.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 28,
          background: "#13243b",
          backgroundImage:
            "radial-gradient(ellipse at 50% 120%, rgba(37, 67, 107, 0.9), transparent 70%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            color: "#ecd3ab",
            fontSize: 24,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
          }}
        >
          <div style={{ width: 60, height: 1, background: "rgba(236, 211, 171, 0.6)" }} />
          Agencia de viajes
          <div style={{ width: 60, height: 1, background: "rgba(236, 211, 171, 0.6)" }} />
        </div>

        <div
          style={{
            display: "flex",
            color: "#faf7f1",
            fontSize: 132,
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}
        >
          MT Turismo
        </div>

        <div
          style={{
            display: "flex",
            color: "rgba(250, 247, 241, 0.75)",
            fontSize: 30,
          }}
        >
          El mundo te espera, nosotros te llevamos.
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 18,
            color: "#ecd3ab",
            fontSize: 22,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          Adolfo Gonzales Chaves · Buenos Aires
        </div>
      </div>
    ),
    size
  );
}
