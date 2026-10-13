"use strict";

document.getElementById("currentYear").textContent = new Date().getFullYear();

const track = document.querySelector(".slideshow-track");
const images = Array.from(track.querySelectorAll("img"));
const pagination = document.querySelector(".slideshow-pagination");
let currentIndex = 0;

const buttons = images.map((image, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.setAttribute("aria-label", `Visa bild ${index + 1} av ${images.length}: ${image.alt}`);
    button.addEventListener("click", () => showSlide(index));
    pagination.append(button);
    return button;
});

function showSlide(index) {
    currentIndex = (index + images.length) % images.length;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    images.forEach((image, imageIndex) => {
        image.setAttribute("aria-hidden", String(imageIndex !== currentIndex));
        buttons[imageIndex].setAttribute("aria-current", String(imageIndex === currentIndex));
    });
}

const viewport = track.parentElement;
let swipeStart;
viewport.addEventListener("pointerdown", (event) => {
    swipeStart = event.pointerType === "touch" && event.isPrimary ? event : null;
});
viewport.addEventListener("pointerup", (event) => {
    if (!swipeStart) return;
    const dx = event.clientX - swipeStart.clientX;
    const dy = event.clientY - swipeStart.clientY;
    swipeStart = null;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
        showSlide(currentIndex + (dx < 0 ? 1 : -1));
    }
});
viewport.addEventListener("pointercancel", () => { swipeStart = null; });

showSlide(0);
pagination.hidden = false;
