document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       HEADER SCROLL
    ===================================================== */

    const header = document.querySelector(".site-header");

    const handleHeaderScroll = () => {

        if (!header) return;

        if (window.scrollY > 30) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    };

    handleHeaderScroll();

    window.addEventListener(
        "scroll",
        handleHeaderScroll,
        { passive: true }
    );



    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuToggle =
        document.querySelector(".menu-toggle");

    const mainNav =
        document.querySelector(".main-nav");


    const closeMenu = () => {

        if (!menuToggle || !mainNav) return;

        menuToggle.classList.remove("active");

        mainNav.classList.remove("open");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        document.body.classList.remove(
            "menu-open"
        );

    };


    if (menuToggle && mainNav) {

        menuToggle.addEventListener(
            "click",
            () => {

                const isOpen =
                    mainNav.classList.toggle("open");

                menuToggle.classList.toggle(
                    "active",
                    isOpen
                );

                menuToggle.setAttribute(
                    "aria-expanded",
                    String(isOpen)
                );

                document.body.classList.toggle(
                    "menu-open",
                    isOpen
                );

            }
        );

    }



    /* =====================================================
       DROPDOWN MOBILE
    ===================================================== */

    const dropdownParents =
        document.querySelectorAll(
            ".nav-dropdown"
        );


    dropdownParents.forEach((parent) => {

        const trigger =
            parent.querySelector(
                ":scope > .nav-link"
            );

        const dropdown =
            parent.querySelector(
                ":scope > .dropdown-menu"
            );


        if (!trigger || !dropdown) return;


        trigger.addEventListener(
            "click",
            (event) => {

                if (
                    window.innerWidth <= 850
                ) {

                    event.preventDefault();

                    parent.classList.toggle(
                        "open"
                    );

                }

            }
        );

    });



    /* =====================================================
       CLOSE MOBILE MENU
    ===================================================== */

    const navLinks =
        document.querySelectorAll(
            ".main-nav a"
        );


    navLinks.forEach((link) => {

        link.addEventListener(
            "click",
            () => {

                if (
                    window.innerWidth <= 850 &&
                    !link.parentElement.classList.contains(
                        "nav-dropdown"
                    )
                ) {

                    closeMenu();

                }

            }
        );

    });



    /* =====================================================
       ESCAPE
    ===================================================== */

document.addEventListener("DOMContentLoaded", () => {
    const revealElements = document.querySelectorAll(
        ".reveal, .reveal-left, .reveal-right"
    );

    if (!revealElements.length) return;

    // Aktifkan mode reveal setelah JS siap
    document.body.classList.add("reveal-ready");

    let lastScrollY = window.scrollY;
    let isScrollingDown = false;

    // Deteksi arah scroll
    window.addEventListener("scroll", () => {
        const currentScrollY = window.scrollY;

        isScrollingDown = currentScrollY > lastScrollY;

        lastScrollY = currentScrollY;
    }, { passive: true });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {

            // Hanya animasi ketika scroll TURUN
            if (entry.isIntersecting && isScrollingDown) {

                const element = entry.target;

                // Hapus active terlebih dahulu
                element.classList.remove("active");

                // Paksa browser membaca ulang posisi
                void element.offsetWidth;

                // Jalankan animasi lagi
                element.classList.add("active");
            }
        });
    }, {
        threshold: 0.15
    });

    revealElements.forEach((element) => {
        observer.observe(element);
    });
});


    /* =====================================================
       RESIZE
    ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            if (window.innerWidth > 850) {

                closeMenu();

                document
                    .querySelectorAll(".nav-dropdown.open")
                    .forEach((item) => {

                        item.classList.remove("open");

                    });

            }

        }
    );



    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal, .reveal-left, .reveal-right"
        );


    if (revealElements.length) {

        document.body.classList.add(
            "reveal-ready"
        );


        const observer =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "active"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -50px 0px"
                }
            );


        revealElements.forEach((element) => {

            observer.observe(element);

        });

    }



    /* =====================================================
       FAQ
    ===================================================== */

    const faqQuestions =
        document.querySelectorAll(
            ".faq-question"
        );


    faqQuestions.forEach((question) => {

        question.addEventListener(
            "click",
            () => {

                const item =
                    question.closest(
                        ".faq-item"
                    );

                if (!item) return;


                const isActive =
                    item.classList.contains(
                        "active"
                    );


                document
                    .querySelectorAll(
                        ".faq-item.active"
                    )
                    .forEach((activeItem) => {

                        activeItem.classList.remove(
                            "active"
                        );

                    });


                if (!isActive) {

                    item.classList.add(
                        "active"
                    );

                }

            }
        );

    });

    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    const currentYear =
        document.getElementById(
            "current-year"
        );


    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }



    /* =====================================================
       TRACKING
    ===================================================== */

    const trackableElements =
        document.querySelectorAll(
            "[data-track]"
        );


    trackableElements.forEach((element) => {

        element.addEventListener(
            "click",
            () => {

                const eventName =
                    element.dataset.track;

                if (
                    typeof window.gtag ===
                    "function"
                ) {

                    window.gtag(
                        "event",
                        eventName
                    );

                }

            }
        );

    });

});


/* =========================================
   STATISTIK PENGUNJUNG (SUPABASE)
========================================= */

const SUPABASE_URL = "https://rszlrxjralbuonjzclbn.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_DSWp3g7jrMkcrGJSq7PnKg_GeoaoiI_";

async function supabaseRpc(name) {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/${name}`, {
        method: "POST",
        headers: {
            apikey: SUPABASE_ANON_KEY,
            Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
            "Content-Type": "application/json"
        },
        body: "{}"
    });

    if (!response.ok) {
        throw new Error(`${name}: HTTP ${response.status}`);
    }

    // catat_kunjungan membalas kosong, jadi jangan langsung response.json()
    const text = await response.text();
    return text ? JSON.parse(text) : null;
}

async function loadVisitorStats() {
    const todayEl = document.getElementById("today-count");
    const totalEl = document.getElementById("visitor-count");

    // Hanya berjalan di halaman yang punya elemen statistik
    if (!todayEl || !totalEl) return;

    const date = new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Jakarta",
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    }).format(new Date());

    const storageKey = `tanmiya-home-visit-${date}`;

    try {
        // Catat satu kali per browser per hari
        if (!localStorage.getItem(storageKey)) {
            await supabaseRpc("catat_kunjungan");
            localStorage.setItem(storageKey, "1");
        }

        const data = await supabaseRpc("ambil_statistik");

        todayEl.textContent = Number(data.today).toLocaleString("id-ID");
        totalEl.textContent = Number(data.total).toLocaleString("id-ID");
    } catch (error) {
        todayEl.textContent = "—";
        totalEl.textContent = "—";
        console.error("Gagal memuat statistik:", error);
    }
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadVisitorStats, { once: true });
} else {
    loadVisitorStats();
}


/* =========================================
   KRITIK & SARAN KE WHATSAPP
========================================= */

document.addEventListener("DOMContentLoaded", () => {
    const feedbackForm = document.getElementById("feedback-form");

    if (!feedbackForm) return;

    feedbackForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const name =
            document.getElementById("feedback-name").value.trim() ||
            "Tidak dicantumkan";

        const category =
            document.getElementById("feedback-category").value;

        const message =
            document.getElementById("feedback-message").value.trim();

        // Ganti dengan nomor WhatsApp resmi Tanmiya Artha
        const phone = "6281229525567";

        if (!category || !message) {
            alert("Silakan lengkapi kategori dan kritik atau saran Anda.");
            return;
        }

        const whatsappMessage =
            `KRITIK DAN SARAN WEBSITE TANMIYA ARTHA\n\n` +
            `Nama: ${name}\n` +
            `Kategori: ${category}\n` +
            `Pesan: ${message}`;

        const whatsappURL =
            `https://wa.me/${phone}?text=${encodeURIComponent(whatsappMessage)}`;

        window.open(whatsappURL, "_blank");
    });
});
