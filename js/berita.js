document.addEventListener("DOMContentLoaded", async () => {
    const newsList = document.getElementById("news-list");
    const newsStatus = document.getElementById("news-status");
    
    if (!newsList || !newsStatus) return;
    
    function escapeHTML(value = "") {
        return String(value).replace(/[&<>"']/g, (char) => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        })[char]);
    }
    
    function formatDate(value) {
        if (!value) return "Berita terbaru";
    
        const date = new Date(value);
    
        if (Number.isNaN(date.getTime())) {
            return "Berita terbaru";
        }
    
        return date.toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });
    }
    
    try {
        const response = await fetch("/api/berita");
    
        if (!response.ok) {
            throw new Error("Gagal mengambil data berita.");
        }
    
        const result = await response.json();
        const berita = Array.isArray(result) ? result : result.berita;
    
        if (!Array.isArray(berita) || berita.length === 0) {
            throw new Error("Belum ada berita yang dapat ditampilkan.");
        }
    
        newsList.innerHTML = berita.slice(0, 3).map((item) => {
            const judul = escapeHTML(item.title || "Berita terbaru");
            const ringkasan = escapeHTML(
                item.description || "Baca informasi selengkapnya melalui situs resmi sumber berita."
            );
            const tanggal = escapeHTML(formatDate(item.date));
            const sumber = escapeHTML(item.source || "Sumber resmi");
            const link = item.url || "#";
    
            // Hanya izinkan tautan HTTP/HTTPS.
            let safeLink = "#";
    
            try {
                const parsedURL = new URL(link, window.location.origin);
    
                if (["http:", "https:"].includes(parsedURL.protocol)) {
                    safeLink = parsedURL.href;
                }
            } catch {
                safeLink = "#";
            }
    
            return `
                <article class="news-card reveal">
                    <div class="news-content">
                        <span class="news-date">
                            ${tanggal} · ${sumber}
                        </span>
    
                        <h3>${judul}</h3>
    
                        <p>${ringkasan}</p>
    
                        <a
                            href="${escapeHTML(safeLink)}"
                            class="text-link"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Baca Selengkapnya
                            <i class="fa-solid fa-arrow-right"></i>
                        </a>
                    </div>
                </article>
            `;
        }).join("");
    
        newsStatus.textContent = "";
    
        // Aktifkan ulang animasi reveal untuk kartu berita baru.
        if ("IntersectionObserver" in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("active");
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.12
            });
    
            newsList.querySelectorAll(".reveal").forEach((card) => {
                observer.observe(card);
            });
        } else {
            newsList.querySelectorAll(".reveal").forEach((card) => {
                card.classList.add("active");
            });
        }
    
    } catch (error) {
        console.error("Berita gagal dimuat:", error);
    
        newsStatus.textContent =
            "Berita otomatis belum dapat dimuat. Silakan kunjungi situs resmi BI atau OJK.";
    
        newsList.innerHTML = `
            <article class="news-card">
                <div class="news-content">
                    <span class="news-date">Sumber resmi</span>
                    <h3>Berita Bank Indonesia</h3>
                    <p>Lihat siaran pers dan informasi terbaru dari Bank Indonesia.</p>
                    <a
                        class="text-link"
                        href="https://www.bi.go.id/id/publikasi/ruang-media/news-release/default.aspx"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Buka situs BI
                    </a>
                </div>
            </article>
    
            <article class="news-card">
                <div class="news-content">
                    <span class="news-date">Sumber resmi</span>
                    <h3>Berita OJK</h3>
                    <p>Lihat siaran pers dan informasi terbaru dari Otoritas Jasa Keuangan.</p>
                    <a
                        class="text-link"
                        href="https://ojk.go.id/id/berita-dan-kegiatan/siaran-pers/default.aspx"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Buka situs OJK
                    </a>
                </div>
            </article>
        `;
    }

});