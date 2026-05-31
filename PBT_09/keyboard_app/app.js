const images = [
    "https://picsum.photos/id/1015/800/500",
    "https://picsum.photos/id/1025/800/500",
    "https://picsum.photos/id/1035/800/500",
    "https://picsum.photos/id/1045/800/500",
    "https://picsum.photos/id/1055/800/500",
    "https://picsum.photos/id/1065/800/500",
    "https://picsum.photos/id/1075/800/500",
    "https://picsum.photos/id/1084/800/500",
    "https://picsum.photos/id/109/800/500"
];

const commands = [
    "Home",
    "Gallery",
    "Settings",
    "Profile",
    "Help",
    "About",
    "Contact"
];

const galleryImage = document.getElementById("galleryImage");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const overlay = document.getElementById("paletteOverlay");
const searchInput = document.getElementById("searchInput");
const commandList = document.getElementById("commandList");
const openPaletteBtn = document.getElementById("openPaletteBtn");

let currentIndex = 0;
let slideshow = null;
let isPlaying = false;

function renderImage() {
    galleryImage.src = images[currentIndex];
}

function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    renderImage();
}

function prevImage() {
    currentIndex =
        (currentIndex - 1 + images.length) % images.length;
    renderImage();
}

prevBtn.addEventListener("click", prevImage);
nextBtn.addEventListener("click", nextImage);

function startSlideshow() {
    slideshow = setInterval(nextImage, 2000);
    isPlaying = true;
}

function stopSlideshow() {
    clearInterval(slideshow);
    isPlaying = false;
}

function toggleSlideshow() {
    isPlaying
        ? stopSlideshow()
        : startSlideshow();
}

function openPalette() {
    overlay.classList.remove("hidden");
    searchInput.value = "";
    renderCommands(commands);
    searchInput.focus();
}

function closePalette() {
    overlay.classList.add("hidden");
}

openPaletteBtn.addEventListener("click", openPalette);

function renderCommands(data) {

    commandList.innerHTML = "";

    data.forEach(command => {

        const li = document.createElement("li");

        li.textContent = command;
        li.tabIndex = 0;
        li.setAttribute(
            "aria-label",
            `Command ${command}`
        );

        li.addEventListener("click", () => {
            alert(`Selected: ${command}`);
            closePalette();
        });

        li.addEventListener("keydown", e => {
            if (e.key === "Enter") {
                li.click();
            }
        });

        commandList.appendChild(li);
    });
}

renderCommands(commands);

searchInput.addEventListener("input", () => {

    const keyword =
        searchInput.value.toLowerCase();

    const filtered =
        commands.filter(command =>
            command
                .toLowerCase()
                .includes(keyword)
        );

    renderCommands(filtered);
});

searchInput.addEventListener("keydown", e => {

    if (
        e.key === "Enter" &&
        commandList.firstElementChild
    ) {
        commandList.firstElementChild.click();
    }
});

document.addEventListener("keydown", e => {

    if (e.ctrlKey && e.key.toLowerCase() === "k") {
        e.preventDefault();
        openPalette();
        return;
    }

    if (e.key === "Escape") {
        closePalette();
        return;
    }

    if (
        document.activeElement === searchInput
    ) {
        return;
    }

    switch (e.key) {

        case "ArrowLeft":
            prevImage();
            break;

        case "ArrowRight":
            nextImage();
            break;

        case " ":
            e.preventDefault();
            toggleSlideshow();
            break;
    }

    const number = Number(e.key);

    if (
        number >= 1 &&
        number <= images.length
    ) {
        currentIndex = number - 1;
        renderImage();
    }
});

overlay.addEventListener("click", e => {

    if (e.target === overlay) {
        closePalette();
    }
});

renderImage();