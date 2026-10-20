
const SOURCES = [
    {
      name: "Bank Indonesia",
      url: "https://www.bi.go.id/id/publikasi/ruang-media/news-release/default.aspx",
      base: "https://www.bi.go.id",
      linkPattern: /\/id\/publikasi\/ruang-media\/news-release\/Pages\/[^"'#?]+\.aspx/i
    },
    {
      name: "OJK",
      url: "https://ojk.go.id/id/berita-dan-kegiatan/siaran-pers/default.aspx",
      base: "https://ojk.go.id",
      linkPattern: /\/id\/berita-dan-kegiatan\/siaran-pers\/[^"'#?]+\.aspx/i
    }
  ];
  
  const CACHE_SECONDS = 900;
  
  function decodeHTML(text = "") {
    return text
      .replace(/&nbsp;|&#160;/gi, " ")
      .replace(/&amp;/gi, "&")
      .replace(/&quot;/gi, '"')
      .replace(/&#39;|&apos;/gi, "'")
      .replace(/&lt;/gi, "<")
      .replace(/&gt;/gi, ">")
      .replace(/&#(\d+);/g, (_, n) =>
        String.fromCodePoint(Number(n))
      )
      .replace(/&#x([0-9a-f]+);/gi, (_, n) =>
        String.fromCodePoint(parseInt(n, 16))
      );
  }
  
  function cleanText(html = "") {
    return decodeHTML(
      html
        .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
        .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
        .replace(/<[^>]*>/g, " ")
        .replace(/\s+/g, " ")
    ).trim();
  }
  
  function extractNews(html, source) {
    const results = [];
    const anchorRegex = /<a\b([^>]*)>([\s\S]*?)<\/a>/gi;
  
    for (const match of html.matchAll(anchorRegex)) {
      const attributes = match[1];
      const innerHTML = match[2];
  
      const hrefMatch = attributes.match(
        /\bhref\s*=\s*["']([^"']+)["']/i
      );
  
      if (!hrefMatch) continue;
  
      const rawHref = decodeHTML(hrefMatch[1]).trim();
  
      let url;
  
      try {
        url = new URL(rawHref, source.base);
      } catch {
        continue;
      }
  
      if (!["https:", "http:"].includes(url.protocol)) continue;
  
      if (url.hostname !== new URL(source.base).hostname) continue;
  
      if (!source.linkPattern.test(url.pathname)) continue;
  
      const title = cleanText(innerHTML);
  
      if (!title || title.length < 15) continue;
  
      // Ambil teks di sekitar tautan untuk mencari tanggal
      // atau ringkasan jika tersedia pada struktur halaman.
      const position = match.index ?? 0;
      const context = html.slice(
        Math.max(0, position - 1800),
        Math.min(html.length, position + match[0].length + 1800)
      );
  
      const textContext = cleanText(context);
  
      const dateMatch = textContext.match(
        /\b(\d{1,2}\s+(?:Januari|Februari|Maret|April|Mei|Juni|Juli|Agustus|September|Oktober|November|Desember)\s+\d{4})\b/i
      );
  
      const description = textContext
        .replace(title, " ")
        .replace(/\b\d{1,2}\s+(?:Januari|Februari|Maret|April|Mei|Juni|Juli|Agustus|September|Oktober|November|Desember)\s+\d{4}\b/gi, " ")
        .replace(/\s+/g, " ")
        .trim();
  
      results.push({
        title,
        description: description.length > 60
          ? description.slice(0, 220).trim() + "…"
          : "",
        date: dateMatch
          ? parseIndonesianDate(dateMatch[1])
          : null,
        source: source.name,
        url: url.href
      });
    }
  
    // Hilangkan tautan berita yang duplikat.
    return results.filter(
      (item, index, all) =>
        all.findIndex((other) => other.url === item.url) === index
    );
  }
  
  function parseIndonesianDate(value) {
    const months = {
      januari: "01",
      februari: "02",
      maret: "03",
      april: "04",
      mei: "05",
      juni: "06",
      juli: "07",
      agustus: "08",
      september: "09",
      oktober: "10",
      november: "11",
      desember: "12"
    };
  
    const match = value.match(
      /(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})/
    );
  
    if (!match) return null;
  
    const month = months[match[2].toLowerCase()];
    if (!month) return null;
  
    return `${match[3]}-${month}-${match[1].padStart(2, "0")}`;
  }
  
  async function fetchSource(source) {
    const response = await fetch(source.url, {
      headers: {
        "User-Agent": "TanmiyaArthaNews/1.0",
        "Accept": "text/html,application/xhtml+xml"
      },
      signal: AbortSignal.timeout(10000)
    });
  
    if (!response.ok) {
      throw new Error(
        `${source.name} mengembalikan HTTP ${response.status}`
      );
    }
  
    const html = await response.text();
    return extractNews(html, source);
  }
  
  export default async () => {
    const results = await Promise.allSettled(SOURCES.map(fetchSource));
  
    const berita = results
      .filter((result) => result.status === "fulfilled")
      .flatMap((result) => result.value);
  
    if (berita.length === 0) {
      return Response.json(
        { error: "Berita belum berhasil diambil dari sumber resmi." },
        { status: 502, headers: { "Cache-Control": "no-store" } }
      );
    }
  
    berita.sort((a, b) => {
      if (a.date && b.date) return b.date.localeCompare(a.date);
      if (a.date) return -1;
      if (b.date) return 1;
      return 0;
    });
  
    return Response.json(berita.slice(0, 3), {
      headers: {
        "Cache-Control": `public, max-age=0, s-maxage=${CACHE_SECONDS}`
      }
    });
  };
  
  export const config = {
    path: "/api/berita"
  };