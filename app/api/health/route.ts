export async function GET() {
  // Optionally check DB, external services, etc.
  return new Response(JSON.stringify({ status: "ok" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
