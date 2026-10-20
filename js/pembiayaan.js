document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       DATA PRODUK PEMBIAYAAN
    ====================================================== */

    const products = {

        /* =================================================
           MURABAHAH
        ================================================== */

        murabahah: {

            badge: "Akad Murabahah",

            title: "Pembiayaan Murabahah",

            description:
                "Pembiayaan berdasarkan akad jual beli, dimana lembaga membeli barang yang dibutuhkan nasabah kemudian menjualnya kembali dengan harga yang disepakati.",

            highlights: [
                "Cocok untuk kebutuhan pembelian barang",
                "Harga jual disepakati sejak awal",
                "Menggunakan prinsip jual beli syariah"
            ],

            fields: [

                {
                    type: "text",
                    name: "nama",
                    label: "Nama Lengkap",
                    placeholder: "Masukkan nama lengkap",
                    required: true
                },

                {
                    type: "tel",
                    name: "whatsapp",
                    label: "No. WhatsApp",
                    placeholder: "08xxxxxxxxxx",
                    required: true
                },

                {
                    type: "text",
                    name: "alamat",
                    label: "Alamat",
                    placeholder: "Masukkan alamat lengkap",
                    required: true,
                    full: true
                },

                {
                    type: "text",
                    name: "pekerjaan",
                    label: "Pekerjaan",
                    placeholder: "Contoh: Karyawan / Pengusaha",
                    required: true
                },

                {
                    type: "text",
                    name: "jenis_barang",
                    label: "Jenis Barang yang Dibutuhkan",
                    placeholder: "Contoh: Kendaraan / Elektronik",
                    required: true
                },

                {
                    type: "text",
                    name: "harga_barang",
                    label: "Harga Barang",
                    placeholder: "Contoh: Rp50.000.000",
                    required: true
                },

                {
                    type: "text",
                    name: "uang_muka",
                    label: "Uang Muka",
                    placeholder: "Contoh: Rp10.000.000"
                },

                {
                    type: "select",
                    name: "tenor",
                    label: "Jangka Waktu",
                    required: true,
                    options: [
                        "6 Bulan",
                        "12 Bulan",
                        "18 Bulan",
                        "24 Bulan",
                        "36 Bulan"
                    ]
                },

                {
                    type: "textarea",
                    name: "keterangan",
                    label: "Keterangan",
                    placeholder: "Jelaskan kebutuhan pembiayaan Anda",
                    full: true
                }

            ]
        },


        /* =================================================
           MUDHARABAH
        ================================================== */

        mudharabah: {

            badge: "Akad Mudharabah",

            title: "Pembiayaan Mudharabah",

            description:
                "Pembiayaan kerja sama usaha dimana lembaga menyediakan modal dan nasabah menjalankan usaha sesuai dengan kesepakatan.",

            highlights: [
                "Cocok untuk kebutuhan pengembangan usaha",
                "Berbasis kerja sama usaha",
                "Pembagian hasil berdasarkan kesepakatan"
            ],

            fields: [

                {
                    type: "text",
                    name: "nama",
                    label: "Nama Lengkap",
                    placeholder: "Masukkan nama lengkap",
                    required: true
                },

                {
                    type: "tel",
                    name: "whatsapp",
                    label: "No. WhatsApp",
                    placeholder: "08xxxxxxxxxx",
                    required: true
                },

                {
                    type: "text",
                    name: "alamat",
                    label: "Alamat",
                    placeholder: "Masukkan alamat lengkap",
                    required: true,
                    full: true
                },

                {
                    type: "text",
                    name: "jenis_usaha",
                    label: "Jenis Usaha",
                    placeholder: "Contoh: Perdagangan / Kuliner",
                    required: true
                },

                {
                    type: "text",
                    name: "lama_usaha",
                    label: "Lama Usaha",
                    placeholder: "Contoh: 3 Tahun",
                    required: true
                },

                {
                    type: "text",
                    name: "modal",
                    label: "Modal yang Dibutuhkan",
                    placeholder: "Contoh: Rp50.000.000",
                    required: true
                },

                {
                    type: "textarea",
                    name: "penggunaan_dana",
                    label: "Rencana Penggunaan Dana",
                    placeholder: "Jelaskan rencana penggunaan dana",
                    required: true,
                    full: true
                },

                {
                    type: "textarea",
                    name: "keterangan",
                    label: "Keterangan Tambahan",
                    placeholder: "Keterangan lainnya",
                    full: true
                }

            ]
        },


        /* =================================================
           IJARAH
        ================================================== */

        ijarah: {

            badge: "Akad Musyarakah",

            title: "Pembiayaan Musyarakah",

            description:
            "Pembiayaan berdasarkan kerja sama antara dua pihak atau lebih yang menggabungkan modal untuk menjalankan usaha dengan prinsip bagi hasil sesuai kesepakatan.",
            highlights: [
                "Kerja sama usaha dengan modal bersama",
                "Keuntungan dibagi sesuai kesepakatan",
                "Kerugian ditanggung sesuai porsi modal"
            ],

            fields: [

                {
                    type: "text",
                    name: "nama",
                    label: "Nama Lengkap",
                    placeholder: "Masukkan nama lengkap",
                    required: true
                },

                {
                    type: "tel",
                    name: "whatsapp",
                    label: "No. WhatsApp",
                    placeholder: "08xxxxxxxxxx",
                    required: true
                },

                {
                    type: "text",
                    name: "alamat",
                    label: "Alamat",
                    placeholder: "Masukkan alamat lengkap",
                    required: true,
                    full: true
                },

                {
                    type: "text",
                    name: "pekerjaan",
                    label: "Pekerjaan",
                    placeholder: "Contoh: Karyawan / Pengusaha",
                    required: true
                },

                {
                    type: "text",
                    name: "jenis_kebutuhan",
                    label: "Jenis Kebutuhan / Jasa",
                    placeholder: "Masukkan kebutuhan Anda",
                    required: true
                },

                {
                    type: "text",
                    name: "nilai_kebutuhan",
                    label: "Nilai Kebutuhan",
                    placeholder: "Contoh: Rp20.000.000",
                    required: true
                },

                {
                    type: "select",
                    name: "jangka_waktu",
                    label: "Jangka Waktu",
                    required: true,
                    options: [
                        "6 Bulan",
                        "12 Bulan",
                        "18 Bulan",
                        "24 Bulan",
                        "36 Bulan"
                    ]
                },

                {
                    type: "textarea",
                    name: "keterangan",
                    label: "Keterangan",
                    placeholder: "Jelaskan kebutuhan Anda",
                    full: true
                }

            ]
        },


        /* =================================================
           JASA
        ================================================== */

        jasa: {

            badge: "Layanan Jasa",

            title: "Jasa",

            description:
                "Layanan jasa untuk membantu memenuhi berbagai kebutuhan transaksi dan pembayaran nasabah secara mudah dan praktis.",

            highlights: [
                "Membantu kebutuhan transaksi nasabah",
                "Layanan mudah dan praktis",
                "Informasi layanan dapat dikonsultasikan dengan petugas"
            ],

            fields: [

                {
                    type: "text",
                    name: "nama",
                    label: "Nama Lengkap",
                    placeholder: "Masukkan nama lengkap",
                    required: true
                },

                {
                    type: "tel",
                    name: "whatsapp",
                    label: "No. WhatsApp",
                    placeholder: "08xxxxxxxxxx",
                    required: true
                },

                {
                    type: "text",
                    name: "alamat",
                    label: "Alamat",
                    placeholder: "Masukkan alamat lengkap",
                    required: true,
                    full: true
                },

                {
                    type: "select",
                    name: "jenis_jasa",
                    label: "Jenis Jasa",
                    required: true,
                    options: [
                        "Pembayaran Listrik",
                        "Pembayaran Telepon",
                        "Transfer",
                        "Layanan Lainnya"
                    ]
                },

                {
                    type: "text",
                    name: "nominal",
                    label: "Nominal",
                    placeholder: "Contoh: Rp1.000.000",
                    required: true
                },

                {
                    type: "textarea",
                    name: "keterangan",
                    label: "Keterangan",
                    placeholder: "Jelaskan kebutuhan layanan Anda",
                    full: true
                }

            ]
        }

    };


    /* =====================================================
       ELEMENT
    ====================================================== */

    const productCards = document.querySelectorAll(
        ".pembiayaan-product-card"
    );

    const productBadge = document.getElementById(
        "productBadge"
    );

    const productTitle = document.getElementById(
        "productTitle"
    );

    const productDescription = document.getElementById(
        "productDescription"
    );

    const productHighlights = document.getElementById(
        "productHighlights"
    );

    const formTitle = document.getElementById(
        "formTitle"
    );

    const dynamicFormFields = document.getElementById(
        "dynamicFormFields"
    );

    const pembiayaanForm = document.getElementById(
        "pembiayaanForm"
    );

    const infoWrapper = document.querySelector(
        ".pembiayaan-info"
    );

    const formWrapper = document.querySelector(
        ".pembiayaan-form-wrapper"
    );


    let currentProduct = "murabahah";


    /* =====================================================
       RENDER HIGHLIGHTS
    ====================================================== */

    function renderHighlights(product) {

        productHighlights.innerHTML = "";

        product.highlights.forEach((item) => {

            const element = document.createElement("div");

            element.className = "highlight-item";

            element.innerHTML = `
                <span class="highlight-icon">
                    <i class="fa-solid fa-check"></i>
                </span>

                <span>
                    ${item}
                </span>
            `;

            productHighlights.appendChild(element);

        });

    }


    /* =====================================================
       CREATE FORM FIELD
    ====================================================== */

    function createField(field) {

        const wrapper = document.createElement("div");

        wrapper.className = "form-group";

        if (field.full) {
            wrapper.classList.add("full");
        }


        const label = document.createElement("label");

        label.setAttribute(
            "for",
            `field-${field.name}`
        );

        label.innerHTML = `
            ${field.label}
            ${
                field.required
                    ? '<span class="required">*</span>'
                    : ''
            }
        `;

        wrapper.appendChild(label);


        let input;


        /* SELECT */

        if (field.type === "select") {

            input = document.createElement("select");

            input.className = "form-control";

            input.id = `field-${field.name}`;

            input.name = field.name;

            if (field.required) {
                input.required = true;
            }


            const defaultOption =
                document.createElement("option");

            defaultOption.value = "";

            defaultOption.textContent =
                "Pilih " + field.label;

            defaultOption.disabled = true;

            defaultOption.selected = true;

            input.appendChild(defaultOption);


            field.options.forEach((option) => {

                const optionElement =
                    document.createElement("option");

                optionElement.value = option;

                optionElement.textContent = option;

                input.appendChild(optionElement);

            });

        }


        /* TEXTAREA */

        else if (field.type === "textarea") {

            input = document.createElement("textarea");

            input.className = "form-control";

            input.id = `field-${field.name}`;

            input.name = field.name;

            input.placeholder =
                field.placeholder || "";

            if (field.required) {
                input.required = true;
            }

        }


        /* INPUT */

        else {

            input = document.createElement("input");

            input.className = "form-control";

            input.type = field.type || "text";

            input.id = `field-${field.name}`;

            input.name = field.name;

            input.placeholder =
                field.placeholder || "";

            if (field.required) {
                input.required = true;
            }

        }


        wrapper.appendChild(input);

        return wrapper;

    }


    /* =====================================================
       RENDER FORM
    ====================================================== */

    function renderForm(product) {

        dynamicFormFields.innerHTML = "";

        const grid = document.createElement("div");

        grid.className = "dynamic-form-grid";


        product.fields.forEach((field) => {

            grid.appendChild(
                createField(field)
            );

        });


        dynamicFormFields.appendChild(grid);

    }


    /* =====================================================
       SCROLL KE INFORMASI
    ====================================================== */

    function scrollToInformation() {

        /*
         * Gunakan bagian informasi yang memang
         * sudah ada di halaman.
         */
        if (!infoWrapper) {
            return;
        }

        setTimeout(() => {

            const headerOffset = 90;

            const elementPosition =
                infoWrapper.getBoundingClientRect().top;

            const offsetPosition =
                elementPosition +
                window.pageYOffset -
                headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });

        }, 100);

    }


    /* =====================================================
       CHANGE PRODUCT
    ====================================================== */

    function changeProduct(
        productKey,
        shouldScroll = false
    ) {

        const product = products[productKey];

        if (!product) {
            return;
        }


        currentProduct = productKey;


        /* ACTIVE CARD */

        productCards.forEach((card) => {

            card.classList.toggle(
                "active",
                card.dataset.product === productKey
            );

        });


        /* ANIMATION */

        if (infoWrapper) {

            infoWrapper.classList.remove(
                "switching"
            );

        }

        if (formWrapper) {

            formWrapper.classList.remove(
                "switching"
            );

        }


        if (infoWrapper) {
            void infoWrapper.offsetWidth;
        }


        if (infoWrapper) {

            infoWrapper.classList.add(
                "switching"
            );

        }

        if (formWrapper) {

            formWrapper.classList.add(
                "switching"
            );

        }


        /* UPDATE CONTENT */

        productBadge.textContent =
            product.badge;

        productTitle.textContent =
            product.title;

        productDescription.textContent =
            product.description;

        formTitle.textContent =
            `Ajukan ${product.title}`;


        renderHighlights(product);

        renderForm(product);


        /* =================================================
           SCROLL HANYA JIKA USER KLIK KARTU
        ================================================= */

        if (shouldScroll) {
            scrollToInformation();
        }

    }


    /* =====================================================
       PRODUCT BUTTON
    ====================================================== */

    productCards.forEach((card) => {

        card.addEventListener("click", () => {

            /*
             * Klik kartu = ubah produk
             * + scroll ke informasi
             */
            changeProduct(
                card.dataset.product,
                true
            );

        });

    });


    /* =====================================================
       WHATSAPP
    ====================================================== */

    if (pembiayaanForm) {

        pembiayaanForm.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();


                const product =
                    products[currentProduct];


                let message = `
Assalamu'alaikum.

Saya ingin mengajukan:

*${product.title}*

Berikut data saya:
`;


                product.fields.forEach((field) => {

                    const element =
                        pembiayaanForm.querySelector(
                            `[name="${field.name}"]`
                        );


                    if (!element) {
                        return;
                    }


                    const value =
                        element.value.trim();


                    message += `

*${field.label}:*
${value || "-"}`;

                });


                message += `

Mohon informasi lebih lanjut mengenai proses pengajuan dan persyaratan ${product.title}.

Terima kasih.
                `.trim();


                /* =============================================
                   NOMOR WHATSAPP KANTOR
                ============================================== */

                const nomorKantor =
                    "6285871193166";


                const url =
                    `https://wa.me/${nomorKantor}?text=${encodeURIComponent(
                        message
                    )}`;


                window.open(
                    url,
                    "_blank"
                );

            }
        );

    }


    /* =====================================================
       PRODUK AWAL
    ====================================================== */

    /*
     * Bisa membuka produk tertentu dari dropdown,
     * contoh:
     *
     * pembiayaan.html?produk=mudharabah
     *
     * Tetapi TIDAK melakukan scroll.
     */

    const urlParams =
        new URLSearchParams(
            window.location.search
        );

    const productFromURL =
        urlParams.get("produk");

    const initialProduct =
        products[productFromURL]
            ? productFromURL
            : "murabahah";


    /*
     * Initial load:
     * hanya memilih produk,
     * TIDAK scroll ke bawah.
     */
    changeProduct(
        initialProduct,
        false
    );

});