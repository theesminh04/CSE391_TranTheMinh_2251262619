const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const loading = document.getElementById("loading");
const errorBox = document.getElementById("error");
const weatherResult = document.getElementById("weatherResult");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const description = document.getElementById("description");
const weatherIcon = document.getElementById("weatherIcon");

const historyList = document.getElementById("historyList");

const HISTORY_KEY = "weather_search_history";

// Ẩn tất cả state
function hideAllStates() {
    loading.classList.add("hidden");
    errorBox.classList.add("hidden");
    weatherResult.classList.add("hidden");
}

// Hiển thị loading
function showLoading() {
    hideAllStates();
    loading.classList.remove("hidden");
}

// Hiển thị lỗi
function showError(message) {
    hideAllStates();
    errorBox.textContent = message;
    errorBox.classList.remove("hidden");
}

// Hiển thị dữ liệu thời tiết
function showWeather(data, city) {
    hideAllStates();

    const current = data.current_condition[0];

    cityName.textContent = city;
    temperature.textContent = current.temp_C;
    humidity.textContent = current.humidity;
    description.textContent = current.weatherDesc[0].value;

    weatherIcon.src = current.weatherIconUrl[0].value;
    weatherIcon.alt = current.weatherDesc[0].value;

    weatherResult.classList.remove("hidden");
}

// Gọi API thời tiết
async function getWeather(city) {
    try {
        showLoading();

        const url = `https://wttr.in/${encodeURIComponent(city)}?format=j1`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Không tìm thấy thành phố hoặc API bị lỗi.");
        }

        const data = await response.json();

        if (!data.current_condition || data.current_condition.length === 0) {
            throw new Error("Dữ liệu thời tiết không hợp lệ.");
        }

        showWeather(data, city);
        saveHistory(city);

    } catch (error) {
        console.error("Weather error:", error);

        if (!navigator.onLine) {
            showError("Bạn đang mất kết nối mạng. Vui lòng kiểm tra Internet.");
        } else {
            showError("Không thể lấy dữ liệu thời tiết. Thành phố không tồn tại hoặc API bị lỗi.");
        }
    }
}

// Lấy lịch sử từ LocalStorage
function getHistory() {
    const history = localStorage.getItem(HISTORY_KEY);
    return history ? JSON.parse(history) : [];
}

// Lưu lịch sử, tối đa 5 thành phố gần nhất
function saveHistory(city) {
    let history = getHistory();

    city = city.trim();

    history = history.filter(item => item.toLowerCase() !== city.toLowerCase());

    history.unshift(city);

    if (history.length > 5) {
        history = history.slice(0, 5);
    }

    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    renderHistory();
}

// Hiển thị lịch sử
function renderHistory() {
    const history = getHistory();

    historyList.innerHTML = "";

    if (history.length === 0) {
        historyList.innerHTML = "<p>Chưa có lịch sử tìm kiếm.</p>";
        return;
    }

    history.forEach(city => {
        const item = document.createElement("span");
        item.className = "history-item";
        item.textContent = city;

        item.addEventListener("click", () => {
            cityInput.value = city;
            getWeather(city);
        });

        historyList.appendChild(item);
    });
}

// Xử lý nút tìm kiếm
searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();

    if (city === "") {
        showError("Vui lòng nhập tên thành phố.");
        return;
    }

    getWeather(city);
});

// Nhấn Enter để tìm
cityInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        searchBtn.click();
    }
});

// Load lịch sử khi mở trang
renderHistory();