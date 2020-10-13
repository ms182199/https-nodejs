// Data

let font_size = 16

// When document is loaded...

document.addEventListener("DOMContentLoaded", () => {
    // Elements

    const e = document.getElementById("e")

    // Event listeners

    e.addEventListener("click", () => {
        font_size ++
        e.style.fontSize = `${font_size}px`
    })
})