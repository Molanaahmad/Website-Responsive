document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements = document.querySelectorAll(
        ".reveal, .reveal-left, .reveal-right"
    );

    if (revealElements.length) {

        /*
         * Aktifkan reveal setelah JS berhasil dimuat.
         * Kalau JS gagal, konten tetap terlihat.
         */
        document.body.classList.add("reveal-ready");

        let lastScrollY = window.scrollY;
        let isScrollingDown = true;

        /*
         * Deteksi arah scroll
         */
        window.addEventListener("scroll", () => {

            const currentScrollY = window.scrollY;

            if (currentScrollY !== lastScrollY) {
                isScrollingDown = currentScrollY > lastScrollY;
                lastScrollY = currentScrollY;
            }

        }, {
            passive: true
        });


        if ("IntersectionObserver" in window) {

            const observer = new IntersectionObserver(
                (entries) => {

                    entries.forEach((entry) => {

                        /*
                         * Animasi saat scroll turun
                         */
                        if (
                            entry.isIntersecting &&
                            isScrollingDown
                        ) {

                            const element = entry.target;

                            /*
                             * Hapus show terlebih dahulu
                             * supaya animasi bisa dimainkan ulang
                             */
                            element.classList.remove("show");

                            /*
                             * Paksa browser membaca ulang layout
                             */
                            void element.offsetWidth;

                            /*
                             * Jalankan animasi
                             */
                            element.classList.add("show");
                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );


            revealElements.forEach((element) => {
                observer.observe(element);
            });


            /*
             * Tampilkan elemen yang sudah terlihat
             * ketika halaman pertama kali dibuka.
             *
             * Ini penting supaya halaman Wadiah
             * tidak terlihat kosong.
             */
            revealElements.forEach((element) => {

                const rect = element.getBoundingClientRect();

                if (
                    rect.top < window.innerHeight &&
                    rect.bottom > 0
                ) {
                    element.classList.add("show");
                }

            });

        } else {

            /*
             * Browser lama
             */
            revealElements.forEach((element) => {
                element.classList.add("show");
            });

        }

    }


    /* =====================================================
       WHATSAPP FORM
    ===================================================== */

    /*
     * Mendukung:
     *
     * 1. #whatsappForm
     *    -> Form Wadiah / Mudharobah lama
     *
     * 2. .product-form
     *    -> Form produk seperti Deposito
     */

    const forms = document.querySelectorAll(
        "#whatsappForm, .product-form"
    );

    if (!forms.length) return;


    forms.forEach((form) => {

        form.addEventListener("submit", (event) => {

            event.preventDefault();


            /* =================================================
               NOMOR WHATSAPP KANTOR
            ================================================= */

            const nomorKantor = "6281229525567";


            /* =================================================
               NAMA PRODUK
            ================================================= */

            const produk =
                form.dataset.product ||
                document.body.dataset.produk ||
                "Produk";


            /* =================================================
               AMBIL DATA FORM
            ================================================= */

            const getValue = (name) => {

                const field = form.querySelector(
                    `[name="${name}"]`
                );

                return field
                    ? field.value.trim()
                    : "";

            };


            const nama =
                getValue("nama");

            const whatsapp =
                getValue("whatsapp") ||
                getValue("telepon");

            const alamat =
                getValue("alamat");

            const pekerjaan =
                getValue("pekerjaan");

            const nominal =
                getValue("nominal");

            const tenor =
                getValue("tenor");

            const email =
                getValue("email");

            const keterangan =
                getValue("keterangan");



    /* =========================================
    TEMPLATE PESAN WHATSAPP PROFESIONAL
    ========================================= */

    const formatField = (label, value) =>
        `${label}: ${value || "Tidak dicantumkan"}`;

    let pesan = [
        "Assalamu'alaikum warahmatullahi wabarakatuh.",
        "",
        "Yth. Petugas BPR Syariah Tanmiya Artha,",
        "",
        `Saya ingin mengajukan permohonan informasi dan konsultasi terkait produk *${produk}*.`,
        "",
        "📋 *DATA CALON NASABAH*",
        "━━━━━━━━━━━━━━━━━━",
        formatField("👤 Nama", nama),
        formatField("📱 No. WhatsApp", whatsapp),
        formatField("✉️ Email", email),
        formatField("📍 Alamat", alamat),
        formatField("💼 Pekerjaan", pekerjaan),
        "",
        "📝 *DETAIL PENGAJUAN*",
        "━━━━━━━━━━━━━━━━━━",
        formatField("🏦 Produk", produk),
        formatField("💰 Nominal rencana", nominal),
        ...(tenor ? [formatField("📅 Jangka waktu", tenor)] : []),
        "",
        "💬 *PERTANYAAN / KETERANGAN*",
        "━━━━━━━━━━━━━━━━━━",
        keterangan || "Belum ada keterangan tambahan.",
        "",
        "Mohon informasi lebih lanjut mengenai persyaratan, prosedur, dan ketentuan produk yang berlaku.",
        "",
        "Terima kasih atas perhatian dan pelayanannya.",
        "",
        "Wassalamu'alaikum warahmatullahi wabarakatuh."
    ].join("\n");

    /* =========================================
    URL WHATSAPP
    ========================================= */

    const url =
        `https://wa.me/${nomorKantor}?text=${encodeURIComponent(pesan)}`;

    window.open(url, "_blank", "noopener,noreferrer");



            /* =================================================
               BUKA WHATSAPP
            ================================================= */

            window.open(
                url,
                "_blank"
            );

        });

    });

});