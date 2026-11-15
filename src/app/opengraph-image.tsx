import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Ultra Urgent Care & Pain Management. Walk in. Two clinics in Chicago and Hoffman Estates. Closed Sunday.";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f4efe6",
          color: "#1c2430",
          padding: "64px",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, letterSpacing: 4, textTransform: "uppercase", color: "#1f4f4b" }}>
          Chicago and Hoffman Estates
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 92, lineHeight: 0.95, letterSpacing: -2 }}>Walk in.</div>
          <div style={{ marginTop: 24, fontSize: 32, maxWidth: 860 }}>
            Urgent care until 10 PM in Hoffman Estates. Noon to 6 on 95th Street. Closed Sunday.
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 28 }}>Ultra Urgent Care & Pain Management</div>
      </div>
    ),
    { ...size },
  );
}
