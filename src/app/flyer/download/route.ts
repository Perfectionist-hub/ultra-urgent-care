import { readFile } from "node:fs/promises";
import path from "node:path";

const FILENAME = "ultra-urgent-care-flyer.pdf";

export async function GET() {
  const filePath = path.join(process.cwd(), "public", FILENAME);
  const bytes = await readFile(filePath);

  return new Response(bytes, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${FILENAME}"`,
      "Content-Length": String(bytes.byteLength),
      "Cache-Control": "private, no-store",
    },
  });
}
