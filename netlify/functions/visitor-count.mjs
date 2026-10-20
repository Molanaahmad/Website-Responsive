
const headers = (key) => ({
    apikey: key,
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json"
  });
  
  function todayWIB() {
    return new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Jakarta",
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).format(new Date());
  }
  
  export default async (request) => {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
    if (!url || !key) {
      return Response.json(
        { error: "Environment variables Supabase belum diatur" },
        { status: 500 }
      );
    }
  
    if (request.method !== "GET" && request.method !== "POST") {
      return new Response("Method not allowed", {
        status: 405,
        headers: { Allow: "GET, POST" }
      });
    }
  
    const date = todayWIB();
    const apiHeaders = headers(key);
  
    try {
      // Catat kunjungan baru ketika browser belum
      // menandai kunjungan hari ini.
      if (request.method === "POST") {
        const recordResponse = await fetch(
          `${url}/rest/v1/rpc/record_home_visit`,
          {
            method: "POST",
            headers: apiHeaders,
            body: JSON.stringify({ visit_date: date })
          }
        );
  
        if (!recordResponse.ok) {
          throw new Error(
            `Gagal mencatat kunjungan: ${await recordResponse.text()}`
          );
        }
      }
  
      // Ambil angka hari ini dan angka total.
      const [dailyResponse, totalResponse] = await Promise.all([
        fetch(
          `${url}/rest/v1/visitor_stats?stat_date=eq.${date}&select=daily_count`,
          { headers: apiHeaders }
        ),
        fetch(
          `${url}/rest/v1/visitor_totals?id=eq.1&select=total_count`,
          { headers: apiHeaders }
        )
      ]);
  
      if (!dailyResponse.ok || !totalResponse.ok) {
        throw new Error("Gagal membaca data Supabase");
      }
  
      const dailyRows = await dailyResponse.json();
      const totalRows = await totalResponse.json();
  
      return Response.json({
        today: Number(dailyRows[0]?.daily_count ?? 0),
        total: Number(totalRows[0]?.total_count ?? 0)
      });
    } catch (error) {
      console.error("Visitor counter error:", error);
  
      return Response.json(
        { error: "Gagal memproses statistik pengunjung" },
        { status: 500 }
      );
    }
  };
  
  export const config = {
    path: "/api/visitor-count"
  };
  