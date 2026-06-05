const images = [
    {
        id: 1,
        title: "Mountain View",
        description: "Ảnh phong cảnh núi số 1",
        src: "..//test_picture/phongcanhnui.jpg"
    },
    {
        id: 2,
        title: "City Night",
        description: "Ảnh thành phố về đêm số 2",
        src: "..//test_picture/thanhphodem.jpg"
    },
    {
        id: 3,
        title: "Ocean Wave",
        description: "Ảnh đại dương số 3",
        src: "..//test_picture/daiduong.jpg"
    },
    {
        id: 4,
        title: "Forest Path",
        description: "Ảnh khu rừng số 4",
        src: "..//test_picture/rung.jpg"
    },
    {
        id: 5,
        title: "Desert Sun",
        description: "Ảnh sa mạc số 5",
        src: "..//test_picture/samac.jpg"
    },
    {
        id: 6,
        title: "Snow Land",
        description: "Ảnh vùng tuyết số 6",
        src: "..//test_picture/tuyet.jpg"
    },
    {
        id: 7,
        title: "Purple Sky",
        description: "Ảnh bầu trời tím số 7",
        src: "..//test_picture/bautroitim.jpg"
    },
    {
        id: 8,
        title: "Green Field",
        description: "Ảnh cánh đồng số 8",
        src: "..//test_picture/canhdong.jpg"
    },
    {
        id: 9,
        title: "Red Sunset",
        description: "Ảnh hoàng hôn số 9",
        src: "..//test_picture/hoanghon.jpg"
    }
];

const currentImage = document.querySelector("#currentImage");
const imageTitle = document.querySelector("#imageTitle");
const imageDescription = document.querySelector("#imageDescription");
const imageCounter = document.querySelector("#imageCounter");

const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");
const playPauseBtn = document.querySelector("#playPauseBtn");
const openModalBtn = document.querySelector("#openModalBtn");
const imageButton = document.querySelector("#imageButton");
const thumbnailList = document.querySelector("#thumbnailList");

const imageModal = document.querySelector("#imageModal");
const closeModalBtn = document.querySelector("#closeModalBtn");
const modalImage = document.querySelector("#modalImage");
const modalTitle = document.querySelector("#modalTitle");
const modalDescription = document.querySelector("#modalDescription");

const openCommandPaletteBtn = document.querySelector("#openCommandPaletteBtn");
const commandPalette = document.querySelector("#commandPalette");
const commandInput = document.querySelector("#commandInput");
const commandList = document.querySelector("#commandList");

let currentIndex = 0;
let isPlaying = false;
let slideInterval = null;

let previousFocusedElement = null;
let selectedCommandIndex = 0;
let filteredCommands = [];

const commands = [
    {
        name: "Next image",
        keywords: "next right arrow image",
        action: showNextImage
    },
    {
        name: "Previous image",
        keywords: "previous left arrow image",
        action: showPreviousImage
    },
    {
        name: "Play or pause slideshow",
        keywords: "space play pause slideshow",
        action: toggleSlideshow
    },
    {
        name: "Open current image modal",
        keywords: "open modal image",
        action: openImageModal
    },
    {
        name: "Go to image 1",
        keywords: "image 1 first",
        action: function () {
            goToImage(0);
        }
    },
    {
        name: "Go to image 2",
        keywords: "image 2 second",
        action: function () {
            goToImage(1);
        }
    },
    {
        name: "Go to image 3",
        keywords: "image 3 third",
        action: function () {
            goToImage(2);
        }
    },
    {
        name: "Go to image 4",
        keywords: "image 4",
        action: function () {
            goToImage(3);
        }
    },
    {
        name: "Go to image 5",
        keywords: "image 5",
        action: function () {
            goToImage(4);
        }
    },
    {
        name: "Go to image 6",
        keywords: "image 6",
        action: function () {
            goToImage(5);
        }
    },
    {
        name: "Go to image 7",
        keywords: "image 7",
        action: function () {
            goToImage(6);
        }
    },
    {
        name: "Go to image 8",
        keywords: "image 8",
        action: function () {
            goToImage(7);
        }
    },
    {
        name: "Go to image 9",
        keywords: "image 9",
        action: function () {
            goToImage(8);
        }
    }
];

renderGallery();
renderThumbnails();
renderCommandList(commands);


function renderGallery() {
    const image = images[currentIndex];

    currentImage.src = image.src;
    currentImage.alt = image.title;

    imageTitle.textContent = image.title;
    imageDescription.textContent = image.description;
    imageCounter.textContent = `${currentIndex + 1} / ${images.length}`;

    imageButton.setAttribute(
        "aria-label",
        `Mở ảnh ${currentIndex + 1}: ${image.title} trong modal`
    );

    updateActiveThumbnail();
}

function renderThumbnails() {
    thumbnailList.textContent = "";

    const fragment = document.createDocumentFragment();

    images.forEach(function (image, index) {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "thumbnail-btn";
        button.setAttribute("aria-label", `Chuyển đến ảnh ${index + 1}: ${image.title}`);

        const img = document.createElement("img");
        img.src = image.src;
        img.alt = image.title;

        button.appendChild(img);

        button.addEventListener("click", function () {
            goToImage(index);
        });

        fragment.appendChild(button);
    });

    thumbnailList.appendChild(fragment);
    updateActiveThumbnail();
}

function updateActiveThumbnail() {
    const thumbnailButtons = thumbnailList.querySelectorAll(".thumbnail-btn");

    thumbnailButtons.forEach(function (button, index) {
        if (index === currentIndex) {
            button.classList.add("active");
            button.setAttribute("aria-current", "true");
        } else {
            button.classList.remove("active");
            button.removeAttribute("aria-current");
        }
    });
}


function showNextImage() {
    currentIndex++;

    if (currentIndex >= images.length) {
        currentIndex = 0;
    }

    renderGallery();
}

function showPreviousImage() {
    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = images.length - 1;
    }

    renderGallery();
}

function goToImage(index) {
    if (index < 0 || index >= images.length) {
        return;
    }

    currentIndex = index;
    renderGallery();
}

function toggleSlideshow() {
    if (isPlaying) {
        pauseSlideshow();
    } else {
        playSlideshow();
    }
}

function playSlideshow() {
    isPlaying = true;
    playPauseBtn.textContent = "Pause slideshow";
    playPauseBtn.setAttribute("aria-label", "Tạm dừng slideshow");

    slideInterval = setInterval(function () {
        showNextImage();
    }, 1800);
}

function pauseSlideshow() {
    isPlaying = false;
    playPauseBtn.textContent = "Play slideshow";
    playPauseBtn.setAttribute("aria-label", "Phát slideshow tự động");

    clearInterval(slideInterval);
    slideInterval = null;
}

// =========================
// phuong thuc
// =========================
function openImageModal() {
    const image = images[currentIndex];

    previousFocusedElement = document.activeElement;

    modalImage.src = image.src;
    modalImage.alt = image.title;
    modalTitle.textContent = image.title;
    modalDescription.textContent = image.description;

    imageModal.classList.remove("hidden");
    closeModalBtn.focus();
}

function closeImageModal() {
    imageModal.classList.add("hidden");

    if (previousFocusedElement) {
        previousFocusedElement.focus();
    }
}

// =========================
// Command Palette
// =========================
function openCommandPalette() {
    previousFocusedElement = document.activeElement;

    commandPalette.classList.remove("hidden");
    commandInput.value = "";
    selectedCommandIndex = 0;

    filteredCommands = commands.slice();
    renderCommandList(filteredCommands);

    commandInput.focus();
}

function closeCommandPalette() {
    commandPalette.classList.add("hidden");

    if (previousFocusedElement) {
        previousFocusedElement.focus();
    }
}

function renderCommandList(commandArray) {
    commandList.textContent = "";

    if (commandArray.length === 0) {
        const emptyItem = document.createElement("li");
        emptyItem.className = "command-empty";
        emptyItem.textContent = "Không tìm thấy command.";
        commandList.appendChild(emptyItem);
        return;
    }

    commandArray.forEach(function (command, index) {
        const item = document.createElement("li");
        item.className = "command-item";
        item.textContent = command.name;
        item.setAttribute("role", "option");

        if (index === selectedCommandIndex) {
            item.classList.add("active");
            item.setAttribute("aria-selected", "true");
        } else {
            item.setAttribute("aria-selected", "false");
        }

        item.addEventListener("click", function () {
            runCommand(index);
        });

        commandList.appendChild(item);
    });
}

function searchCommands() {
    const keyword = commandInput.value.trim().toLowerCase();

    filteredCommands = commands.filter(function (command) {
        return (
            command.name.toLowerCase().includes(keyword) ||
            command.keywords.toLowerCase().includes(keyword)
        );
    });

    selectedCommandIndex = 0;
    renderCommandList(filteredCommands);
}

function runCommand(index) {
    const command = filteredCommands[index];

    if (!command) {
        return;
    }

    closeCommandPalette();
    command.action();
}

// =========================
// Focus trap
// =========================
function trapFocus(event, container) {
    if (event.key !== "Tab") {
        return;
    }

    const focusableElements = container.querySelectorAll(
        "button, input, [href], select, textarea, [tabindex]:not([tabindex='-1'])"
    );

    if (focusableElements.length === 0) {
        return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
    }
}

// =========================
// Eventlisteners
// =========================
prevBtn.addEventListener("click", showPreviousImage);
nextBtn.addEventListener("click", showNextImage);
playPauseBtn.addEventListener("click", toggleSlideshow);
openModalBtn.addEventListener("click", openImageModal);
imageButton.addEventListener("click", openImageModal);
closeModalBtn.addEventListener("click", closeImageModal);

openCommandPaletteBtn.addEventListener("click", openCommandPalette);

imageModal.addEventListener("click", function (event) {
    if (event.target === imageModal) {
        closeImageModal();
    }
});

commandPalette.addEventListener("click", function (event) {
    if (event.target === commandPalette) {
        closeCommandPalette();
    }
});

commandInput.addEventListener("input", searchCommands);

commandInput.addEventListener("keydown", function (event) {
    if (event.key === "ArrowDown") {
        event.preventDefault();

        if (filteredCommands.length > 0) {
            selectedCommandIndex++;

            if (selectedCommandIndex >= filteredCommands.length) {
                selectedCommandIndex = 0;
            }

            renderCommandList(filteredCommands);
        }
    }

    if (event.key === "ArrowUp") {
        event.preventDefault();

        if (filteredCommands.length > 0) {
            selectedCommandIndex--;

            if (selectedCommandIndex < 0) {
                selectedCommandIndex = filteredCommands.length - 1;
            }

            renderCommandList(filteredCommands);
        }
    }

    if (event.key === "Enter") {
        event.preventDefault();
        runCommand(selectedCommandIndex);
    }

    if (event.key === "Escape") {
        event.preventDefault();
        closeCommandPalette();
    }
});

document.addEventListener("keydown", function (event) {
    const isTyping =
        event.target.tagName === "INPUT" ||
        event.target.tagName === "TEXTAREA";

    if (event.ctrlKey && event.key.toLowerCase() === "k") {
        event.preventDefault();
        openCommandPalette();
        return;
    }

    if (!imageModal.classList.contains("hidden")) {
        if (event.key === "Escape") {
            closeImageModal();
            return;
        }

        trapFocus(event, imageModal);
        return;
    }

    if (!commandPalette.classList.contains("hidden")) {
        if (event.key === "Escape") {
            closeCommandPalette();
            return;
        }

        trapFocus(event, commandPalette);
        return;
    }

    if (isTyping) {
        return;
    }

    if (event.key === "ArrowRight") {
        showNextImage();
    }

    if (event.key === "ArrowLeft") {
        showPreviousImage();
    }

    if (event.key >= "1" && event.key <= "9") {
        const imageIndex = Number(event.key) - 1;
        goToImage(imageIndex);
    }

    if (event.code === "Space") {
        event.preventDefault();
        toggleSlideshow();
    }
});