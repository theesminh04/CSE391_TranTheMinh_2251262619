const gallery = document.getElementById("gallery");
const loading = document.getElementById("loading");
const errorBox = document.getElementById("error");
const loadTrigger = document.getElementById("load-trigger");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");
const closeLightbox = document.getElementById("closeLightbox");

let currentPage = 1;
let isLoading = false;
let hasMore = true;

const LIMIT = 20;

// Hiển thị loading
function showLoading() {
    loading.classList.remove("hidden");
}

// Ẩn loading
function hideLoading() {
    loading.classList.add("hidden");
}

// Hiển thị lỗi
function showError(message) {
    errorBox.textContent = message;
    errorBox.classList.remove("hidden");
}

// Ẩn lỗi
function hideError() {
    errorBox.classList.add("hidden");
}

// Gọi API lấy danh sách ảnh
async function fetchPhotos(page, limit) {
    const url = `https://picsum.photos/v2/list?page=${page}&limit=${limit}`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`API lỗi: HTTP ${response.status}`);
    }

    const data = await response.json();
    return data;
}

// Render ảnh ra giao diện
function renderPhotos(photos) {
    photos.forEach(photo => {
        const card = document.createElement("div");
        card.className = "photo-card";

        const thumbnailUrl = `https://picsum.photos/id/${photo.id}/500/350`;
        const largeUrl = `https://picsum.photos/id/${photo.id}/1200/800`;

        card.innerHTML = `
            <img 
                class="lazy-image"
                src=""
                data-src="${thumbnailUrl}"
                data-large="${largeUrl}"
                alt="Ảnh của ${photo.author}"
            >

            <div class="photo-info">
                <h3>${photo.author}</h3>
                <p>ID ảnh: ${photo.id}</p>
            </div>
        `;

        gallery.appendChild(card);

        const img = card.querySelector("img");

        lazyImageObserver.observe(img);

        card.addEventListener("click", () => {
            openLightbox(largeUrl, photo.author);
        });
    });
}

// Load thêm ảnh
async function loadMorePhotos() {
    if (isLoading || !hasMore) {
        return;
    }

    try {
        isLoading = true;
        showLoading();
        hideError();

        const photos = await fetchPhotos(currentPage, LIMIT);

        if (photos.length === 0) {
            hasMore = false;
            loadTrigger.classList.add("hidden");
            return;
        }

        renderPhotos(photos);
        currentPage++;

    } catch (error) {
        console.error(error);
        showError("Không thể tải ảnh. Vui lòng kiểm tra mạng hoặc thử lại sau.");
    } finally {
        isLoading = false;
        hideLoading();
    }
}

// Lazy loading ảnh bằng IntersectionObserver
const lazyImageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;

            img.src = img.dataset.src;

            img.addEventListener("load", () => {
                img.classList.add("loaded");
            });

            observer.unobserve(img);
        }
    });
}, {
    root: null,
    threshold: 0.1
});

// Infinite scroll bằng IntersectionObserver
const scrollObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        loadMorePhotos();
    }
}, {
    root: null,
    rootMargin: "200px",
    threshold: 0
});

scrollObserver.observe(loadTrigger);

// Mở lightbox
function openLightbox(imageUrl, author) {
    lightboxImage.src = imageUrl;
    lightboxCaption.textContent = `Ảnh của ${author}`;
    lightbox.classList.remove("hidden");
}

// Đóng lightbox
function closeLightboxModal() {
    lightbox.classList.add("hidden");
    lightboxImage.src = "";
}

closeLightbox.addEventListener("click", closeLightboxModal);

lightbox.addEventListener("click", function (event) {
    if (event.target === lightbox) {
        closeLightboxModal();
    }
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeLightboxModal();
    }
});

// Load 20 ảnh đầu tiên khi mở trang
loadMorePhotos();