document.addEventListener("DOMContentLoaded", () => {

    const texts = document.querySelectorAll(".hero-changing-text");

    if (texts.length <= 1) return;

    let current = 0;

    function changeText() {

        const currentText = texts[current];

        currentText.classList.remove("active");
        currentText.classList.add("exit");


        setTimeout(() => {

            currentText.classList.remove("exit");

            current++;

            if (current >= texts.length) {
                current = 0;
            }

            texts[current].classList.add("active");

        }, 1400);

    }


    /*
        Tulisan ditampilkan cukup lama
        supaya terasa elegan.
    */

    setInterval(changeText, 6000);

});