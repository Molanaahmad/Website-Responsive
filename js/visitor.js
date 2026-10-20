(async function () {
    const todayEl = document.getElementById("today-count");
    const totalEl = document.getElementById("visitor-count");
    if (!todayEl || !totalEl) return;

    try {
        const res = await fetch("/.netlify/functions/visitor-count");
        if (!res.ok) throw new Error("Status " + res.status);
        const data = await res.json();
        console.log("visitor-count:", data); // untuk memeriksa nama field

        const today = data.today ?? data.todayCount ?? data.hariIni ?? 0;
        const total = data.total ?? data.totalCount ?? data.count ?? 0;

        todayEl.textContent = Number(today).toLocaleString("id-ID");
        totalEl.textContent = Number(total).toLocaleString("id-ID");
    } catch (err) {
        console.error("Gagal memuat pengunjung:", err);
        todayEl.textContent = "-";
        totalEl.textContent = "-";
    }
})();