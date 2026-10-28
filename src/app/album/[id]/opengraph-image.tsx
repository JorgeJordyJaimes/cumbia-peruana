import { ImageResponse } from "next/og";
import { createClient } from "@/lib/supabase/server";

export const alt = "Ficha de Evidencia Fonográfica | Kumbia Sound";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const albumId = parseInt(id, 10);
  const supabase = await createClient();
  const { data } = await supabase
    .from("albumes")
    .select(`
      id_album,
      nombre_album,
      numero_catalogo,
      "año_publicacion",
      url_portada,
      grupos (nombre_grupo),
      sellos_discograficos (nombre_sello)
    `)
    .eq("id_album", albumId)
    .single();

  const album = data as unknown as {
    nombre_album: string | null;
    numero_catalogo: string | null;
    año_publicacion: number | null;
    url_portada: string | null;
    grupos: { nombre_grupo: string } | null;
    sellos_discograficos: { nombre_sello: string } | null;
  } | null;

  const title = album?.nombre_album || `EVIDENCIA NO. ${String(albumId).padStart(4, "0")}`;
  const artist = album?.grupos?.nombre_grupo || "Archivo General";
  const label = album?.sellos_discograficos?.nombre_sello || "Sello Particular";
  const year = album?.año_publicacion || "1968-2005";
  const coverUrl = album?.url_portada;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: "#EDE0D0",
          border: "12px solid #1F1305",
          padding: 40,
          fontFamily: "monospace",
          boxSizing: "border-box",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            backgroundColor: "#FFFFFF",
            border: "4px solid #1F1305",
            padding: 32,
            gap: 32,
            alignItems: "center",
            boxShadow: "10px 10px 0px #1F1305",
          }}
        >
          {coverUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={coverUrl}
              alt={title}
              style={{
                width: 440,
                height: 440,
                objectFit: "cover",
                border: "4px solid #1F1305",
              }}
            />
          ) : (
            <div
              style={{
                width: 440,
                height: 440,
                backgroundColor: "#140D04",
                border: "4px solid #1F1305",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#EDE0D0",
                fontSize: 24,
                fontWeight: 900,
              }}
            >
              SIN PORTADA
            </div>
          )}

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              justifyContent: "space-between",
              height: 440,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span
                  style={{
                    backgroundColor: "#E80000",
                    color: "#FFFFFF",
                    padding: "4px 12px",
                    fontSize: 16,
                    fontWeight: 900,
                    border: "2px solid #1F1305",
                  }}
                >
                  EVIDENCIA NO. {String(albumId).padStart(4, "0")}
                </span>
                <span
                  style={{
                    backgroundColor: "#EDE0D0",
                    color: "#1F1305",
                    padding: "4px 12px",
                    fontSize: 16,
                    fontWeight: 900,
                    border: "2px solid #1F1305",
                  }}
                >
                  {year}
                </span>
              </div>

              <h1
                style={{
                  fontSize: 38,
                  fontWeight: 900,
                  color: "#1F1305",
                  lineHeight: 1.15,
                  margin: "8px 0 0 0",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {title}
              </h1>

              <p
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  color: "#E80000",
                  margin: 0,
                }}
              >
                {artist}
              </p>
            </div>

            <div
              style={{
                borderTop: "3px solid #1F1305",
                paddingTop: 16,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: 16,
                fontWeight: 700,
                color: "#5A5245",
              }}
            >
              <span>SELLO: {label}</span>
              <span style={{ color: "#E80000" }}>KUMBIA SOUND // ARCHIVO FONOGRÁFICO</span>
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
