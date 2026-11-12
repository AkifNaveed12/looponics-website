export const dynamic = "force-dynamic";

export async function GET() {
  return new Response(
    JSON.stringify({
      status: "ok",
      service: "Looponics AI Assistant API",
      version: "1.0.0",
      timestamp: new Date().toISOString(),
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store, max-age=0",
      },
    }
  );
}
