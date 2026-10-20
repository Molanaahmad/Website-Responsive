document.addEventListener("DOMContentLoaded", () => {

    const values = document.querySelectorAll(".hero-value");
    const dots = document.querySelectorAll(".hero-value-dots span");

    if (values.length <= 1) return;

    let current = 0;

    setInterval(() => {

        values[current].classList.remove("active");
        dots[current].classList.remove("active");

        current++;

        if (current >= values.length) {
            current = 0;
        }

        values[current].classList.add("active");
        dots[current].classList.add("active");

    }, 4500);

});