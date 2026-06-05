const products = [
    {
        id: 1,
        name: "iPhone 16",
        price: 25990000,
        category: "phone",
        image: "..//test_picture/ip16.jpg",
        rating: 4.5,
        inStock: true
    },
    {
        id: 2,
        name: "Samsung Galaxy S25",
        price: 22990000,
        category: "phone",
        image: "..//test_picture/s25.jpg",
        rating: 4.7,
        inStock: true
    },
    {
        id: 3,
        name: "Xiaomi 15",
        price: 16990000,
        category: "phone",
        image: "..//test_picture/xiaomi15.jpg",
        rating: 4.3,
        inStock: false
    },
    {
        id: 4,
        name: "MacBook Air M3",
        price: 28990000,
        category: "laptop",
        image: "..//test_picture/airm3.jpg",
        rating: 4.8,
        inStock: true
    },
    {
        id: 5,
        name: "Dell XPS 13",
        price: 32990000,
        category: "laptop",
        image: "..//test_picture/xps13.jpg",
        rating: 4.6,
        inStock: true
    },
    {
        id: 6,
        name: "Asus ROG Zephyrus",
        price: 41990000,
        category: "laptop",
        image: "..//test_picture/Asus ROG.jpg",
        rating: 4.9,
        inStock: true
    },
    {
        id: 7,
        name: "iPad Pro M4",
        price: 27990000,
        category: "tablet",
        image: "..//test_picture/ipad pro m4.jpg",
        rating: 4.8,
        inStock: true
    },
    {
        id: 8,
        name: "Samsung Galaxy Tab S10",
        price: 19990000,
        category: "tablet",
        image: "..//test_picture/s10.jpg",
        rating: 4.4,
        inStock: true
    },
    {
        id: 9,
        name: "Lenovo Tab Plus",
        price: 8990000,
        category: "tablet",
        image: "..//test_picture/lenovo tab.jpg",
        rating: 4.1,
        inStock: false
    },
    {
        id: 10,
        name: "AirPods Pro 2",
        price: 5990000,
        category: "accessory",
        image: "..//test_picture/airpodpro2.jpg",
        rating: 4.7,
        inStock: true
    },
    {
        id: 11,
        name: "Logitech MX Master 3S",
        price: 2490000,
        category: "accessory",
        image: "..//test_picture/master3s.jpg",
        rating: 4.6,
        inStock: true
    },
    {
        id: 12,
        name: "Apple Watch Series 10",
        price: 10990000,
        category: "accessory",
        image: "..//test_picture/apwseries10.jpg",
        rating: 4.5,
        inStock: true
    }
];

let currentCategory = "all";
let currentSearch = "";
let currentSort = "default";
let cartCount = 0;

let productGrid;
let cartBadge;
let modalOverlay;
let modalBody;
let categoryButtonsContainer;
let searchInput;
let sortSelect;

createAppLayout();
renderProducts();

// =========================
// tao uxui bang javascript
// =========================
function createAppLayout() {
    const app = document.createElement("div");
    app.className = "app";

    const header = createHeader();
    const controls = createControls();
    const categories = createCategoryButtons();

    productGrid = document.createElement("div");
    productGrid.className = "product-grid";
    productGrid.id = "productGrid";

    const modal = createModal();

    app.appendChild(header);
    app.appendChild(controls);
    app.appendChild(categories);
    app.appendChild(productGrid);

    document.body.appendChild(app);
    document.body.appendChild(modal);
}

function createHeader() {
    const header = document.createElement("header");
    header.className = "header";

    const logo = document.createElement("div");
    logo.className = "logo";

    const title = document.createElement("h1");
    title.textContent = "Product Catalog";

    const subtitle = document.createElement("p");
    subtitle.textContent = "Interactive catalog with Vanilla JavaScript";

    logo.appendChild(title);
    logo.appendChild(subtitle);

    const actions = document.createElement("div");
    actions.className = "header-actions";

    const cart = document.createElement("button");
    cart.className = "cart";
    cart.type = "button";
    cart.textContent = "🛒";

    cartBadge = document.createElement("span");
    cartBadge.className = "cart-badge";
    cartBadge.textContent = "0";

    cart.appendChild(cartBadge);

    const darkToggle = document.createElement("button");
    darkToggle.className = "dark-toggle";
    darkToggle.type = "button";
    darkToggle.textContent = "Dark mode";

    darkToggle.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            darkToggle.textContent = "Light mode";
        } else {
            darkToggle.textContent = "Dark mode";
        }
    });

    actions.appendChild(cart);
    actions.appendChild(darkToggle);

    header.appendChild(logo);
    header.appendChild(actions);

    return header;
}

function createControls() {
    const controls = document.createElement("section");
    controls.className = "controls";

    searchInput = document.createElement("input");
    searchInput.className = "search-input";
    searchInput.type = "text";
    searchInput.placeholder = "Tìm kiếm sản phẩm...";

    searchInput.addEventListener("input", function () {
        currentSearch = searchInput.value.trim().toLowerCase();
        renderProducts();
    });

    sortSelect = document.createElement("select");
    sortSelect.className = "sort-select";

    const sortOptions = [
        { value: "default", label: "Sắp xếp mặc định" },
        { value: "price-asc", label: "Giá tăng dần" },
        { value: "price-desc", label: "Giá giảm dần" },
        { value: "name-asc", label: "Tên A-Z" },
        { value: "rating-desc", label: "Đánh giá cao nhất" }
    ];

    sortOptions.forEach(optionData => {
        const option = document.createElement("option");
        option.value = optionData.value;
        option.textContent = optionData.label;
        sortSelect.appendChild(option);
    });

    sortSelect.addEventListener("change", function () {
        currentSort = sortSelect.value;
        renderProducts();
    });

    controls.appendChild(searchInput);
    controls.appendChild(sortSelect);

    return controls;
}

function createCategoryButtons() {
    categoryButtonsContainer = document.createElement("div");
    categoryButtonsContainer.className = "category-buttons";

    const categories = ["all", "phone", "laptop", "tablet", "accessory"];

    categories.forEach(category => {
        const button = document.createElement("button");
        button.className = "category-btn";
        button.type = "button";
        button.dataset.category = category;
        button.textContent = getCategoryName(category);

        if (category === currentCategory) {
            button.classList.add("active");
        }

        button.addEventListener("click", function () {
            currentCategory = category;
            updateActiveCategoryButton();
            renderProducts();
        });

        categoryButtonsContainer.appendChild(button);
    });

    return categoryButtonsContainer;
}

function createModal() {
    modalOverlay = document.createElement("div");
    modalOverlay.className = "modal-overlay hidden";

    const modal = document.createElement("div");
    modal.className = "modal";

    const closeButton = document.createElement("button");
    closeButton.className = "close-modal";
    closeButton.type = "button";
    closeButton.textContent = "X";

    modalBody = document.createElement("div");
    modalBody.className = "modal-body";

    closeButton.addEventListener("click", closeModal);

    modalOverlay.addEventListener("click", function (event) {
        if (event.target === modalOverlay) {
            closeModal();
        }
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeModal();
        }
    });

    modal.appendChild(closeButton);
    modal.appendChild(modalBody);
    modalOverlay.appendChild(modal);

    return modalOverlay;
}

// =========================
// san pham
// =========================
function renderProducts() {
    productGrid.textContent = "";

    let result = products.slice();

    result = filterByCategory(result);
    result = searchProducts(result);
    result = sortProducts(result);

    if (result.length === 0) {
        const emptyMessage = document.createElement("p");
        emptyMessage.className = "empty-message";
        emptyMessage.textContent = "Không tìm thấy sản phẩm phù hợp.";
        productGrid.appendChild(emptyMessage);
        return;
    }

    const fragment = document.createDocumentFragment();

    result.forEach(product => {
        const card = createProductCard(product);
        fragment.appendChild(card);
    });

    productGrid.appendChild(fragment);
}

function createProductCard(product) {
    const card = document.createElement("article");
    card.className = "product-card";
    card.dataset.id = product.id;

    card.addEventListener("click", function () {
        openModal(product.id);
    });

    const image = document.createElement("img");
    image.className = "product-image";
    image.src = product.image;
    image.alt = product.name;

    const category = document.createElement("span");
    category.className = "product-category";
    category.textContent = getCategoryName(product.category);

    const name = document.createElement("h2");
    name.className = "product-name";
    name.textContent = product.name;

    const price = document.createElement("p");
    price.className = "product-price";
    price.textContent = formatCurrency(product.price);

    const rating = document.createElement("p");
    rating.className = "rating";
    rating.textContent = `⭐ ${product.rating}`;

    const stock = document.createElement("p");
    stock.className = "stock";

    if (product.inStock) {
        stock.classList.add("in-stock");
        stock.textContent = "Còn hàng";
    } else {
        stock.classList.add("out-stock");
        stock.textContent = "Hết hàng";
    }

    const addButton = document.createElement("button");
    addButton.className = "add-cart-btn";
    addButton.type = "button";
    addButton.textContent = "Thêm giỏ";

    if (!product.inStock) {
        addButton.disabled = true;
        addButton.textContent = "Hết hàng";
    }

    addButton.addEventListener("click", function (event) {
        event.stopPropagation();

        if (product.inStock) {
            addToCart();
        }
    });

    card.appendChild(image);
    card.appendChild(category);
    card.appendChild(name);
    card.appendChild(price);
    card.appendChild(rating);
    card.appendChild(stock);
    card.appendChild(addButton);

    return card;
}

// =========================
// loc, tim kiem, sap xep
// =========================
function filterByCategory(productList) {
    if (currentCategory === "all") {
        return productList;
    }

    return productList.filter(product => product.category === currentCategory);
}

function searchProducts(productList) {
    if (currentSearch === "") {
        return productList;
    }

    return productList.filter(product => {
        return product.name.toLowerCase().includes(currentSearch);
    });
}

function sortProducts(productList) {
    const sortedProducts = productList.slice();

    if (currentSort === "price-asc") {
        sortedProducts.sort((a, b) => a.price - b.price);
    }

    if (currentSort === "price-desc") {
        sortedProducts.sort((a, b) => b.price - a.price);
    }

    if (currentSort === "name-asc") {
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (currentSort === "rating-desc") {
        sortedProducts.sort((a, b) => b.rating - a.rating);
    }

    return sortedProducts;
}

// =========================
// phuong thuc 
// =========================
function openModal(productId) {
    const product = products.find(item => item.id === productId);

    if (!product) {
        return;
    }

    modalBody.textContent = "";

    const image = document.createElement("img");
    image.className = "modal-image";
    image.src = product.image;
    image.alt = product.name;

    const title = document.createElement("h2");
    title.className = "modal-title";
    title.textContent = product.name;

    const info = document.createElement("div");
    info.className = "modal-info";

    const price = document.createElement("p");
    price.textContent = `Giá: ${formatCurrency(product.price)}`;

    const category = document.createElement("p");
    category.textContent = `Danh mục: ${getCategoryName(product.category)}`;

    const rating = document.createElement("p");
    rating.textContent = `Đánh giá: ${product.rating} sao`;

    const stock = document.createElement("p");
    stock.textContent = product.inStock ? "Trạng thái: Còn hàng" : "Trạng thái: Hết hàng";

    const addButton = document.createElement("button");
    addButton.className = "add-cart-btn";
    addButton.type = "button";
    addButton.textContent = product.inStock ? "Thêm vào giỏ hàng" : "Hết hàng";
    addButton.disabled = !product.inStock;

    addButton.addEventListener("click", function () {
        addToCart();
    });

    info.appendChild(price);
    info.appendChild(category);
    info.appendChild(rating);
    info.appendChild(stock);

    modalBody.appendChild(image);
    modalBody.appendChild(title);
    modalBody.appendChild(info);
    modalBody.appendChild(addButton);

    modalOverlay.classList.remove("hidden");
}

function closeModal() {
    modalOverlay.classList.add("hidden");
}

// =========================
// gio hang
// =========================
function addToCart() {
    cartCount++;
    cartBadge.textContent = cartCount;
}

// =========================
// tinh nang ho tro
// =========================
function updateActiveCategoryButton() {
    const buttons = categoryButtonsContainer.querySelectorAll(".category-btn");

    buttons.forEach(button => {
        if (button.dataset.category === currentCategory) {
            button.classList.add("active");
        } else {
            button.classList.remove("active");
        }
    });
}

function getCategoryName(category) {
    if (category === "all") {
        return "Tất cả";
    }

    if (category === "phone") {
        return "Điện thoại";
    }

    if (category === "laptop") {
        return "Laptop";
    }

    if (category === "tablet") {
        return "Tablet";
    }

    if (category === "accessory") {
        return "Phụ kiện";
    }

    return category;
}

function formatCurrency(number) {
    return number.toLocaleString("vi-VN") + "đ";
}