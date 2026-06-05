const refreshBtn = document.getElementById("refreshBtn");
const globalLoading = document.getElementById("globalLoading");
const fetchTime = document.getElementById("fetchTime");

const widgets = [
    {
        name: "Users API",
        elementId: "usersWidget",
        url: "https://jsonplaceholder.typicode.com/users"
    },
    {
        name: "Weather API",
        elementId: "weatherWidget",
        url: "https://api.open-meteo.com/v1/forecast?latitude=21.03&longitude=105.85&current_weather=true"
    },
    {
        name: "Country API",
        elementId: "countryWidget",
        url: "https://restcountries.com/v3.1/name/vietnam"
    }
];

async function fetchJson(url) {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }

    return await response.json();
}

function showGlobalLoading() {
    globalLoading.classList.remove("hidden");
    refreshBtn.disabled = true;
}

function hideGlobalLoading() {
    globalLoading.classList.add("hidden");
    refreshBtn.disabled = false;
}

function renderWidgetLoading(index) {
    const widget = widgets[index];
    const element = document.getElementById(widget.elementId);

    element.innerHTML = `
        <div class="widget-loading">
            Đang tải dữ liệu từ ${widget.name}...
        </div>
    `;
}

function renderWidget(index, data) {
    if (index === 0) {
        renderUsersWidget(data);
    }

    if (index === 1) {
        renderWeatherWidget(data);
    }

    if (index === 2) {
        renderCountryWidget(data);
    }
}

function renderWidgetError(index, message) {
    const widget = widgets[index];
    const element = document.getElementById(widget.elementId);

    element.innerHTML = `
        <div class="widget-error">
            <strong>Lỗi tải ${widget.name}</strong>
            <p>${message}</p>
        </div>
    `;
}

function renderUsersWidget(users) {
    const element = document.getElementById("usersWidget");

    const firstFiveUsers = users.slice(0, 5);

    element.innerHTML = `
        <div class="widget-success">
            <div class="stat">
                <strong>Tổng số users</strong>
                <span>${users.length}</span>
            </div>

            <div class="stat">
                <strong>5 users đầu tiên</strong>
                <ul class="user-list">
                    ${firstFiveUsers.map(user => `
                        <li>${user.name} - ${user.email}</li>
                    `).join("")}
                </ul>
            </div>
        </div>
    `;
}

function getWeatherDescription(code) {
    const weatherCodes = {
        0: "Trời quang",
        1: "Ít mây",
        2: "Có mây",
        3: "Nhiều mây",
        45: "Sương mù",
        48: "Sương mù đóng băng",
        51: "Mưa phùn nhẹ",
        53: "Mưa phùn vừa",
        55: "Mưa phùn dày",
        61: "Mưa nhẹ",
        63: "Mưa vừa",
        65: "Mưa lớn",
        80: "Mưa rào nhẹ",
        81: "Mưa rào vừa",
        82: "Mưa rào lớn",
        95: "Dông"
    };

    return weatherCodes[code] || "Không rõ";
}

function renderWeatherWidget(data) {
    const element = document.getElementById("weatherWidget");
    const weather = data.current_weather;

    element.innerHTML = `
        <div class="widget-success">
            <div class="stat">
                <strong>Nhiệt độ hiện tại</strong>
                <span>${weather.temperature}°C</span>
            </div>

            <div class="stat">
                <strong>Tốc độ gió</strong>
                <span>${weather.windspeed} km/h</span>
            </div>

            <div class="stat">
                <strong>Mô tả</strong>
                <span>${getWeatherDescription(weather.weathercode)}</span>
            </div>

            <div class="stat">
                <strong>Thời gian cập nhật</strong>
                <span>${weather.time}</span>
            </div>
        </div>
    `;
}

function renderCountryWidget(data) {
    const element = document.getElementById("countryWidget");
    const country = data[0];

    element.innerHTML = `
        <div class="widget-success">
            <img class="flag" src="${country.flags.svg}" alt="Vietnam flag">

            <div class="stat">
                <strong>Quốc gia</strong>
                <span>${country.name.common}</span>
            </div>

            <div class="stat">
                <strong>Thủ đô</strong>
                <span>${country.capital ? country.capital[0] : "Không có dữ liệu"}</span>
            </div>

            <div class="stat">
                <strong>Khu vực</strong>
                <span>${country.region}</span>
            </div>

            <div class="stat">
                <strong>Dân số</strong>
                <span>${country.population.toLocaleString("vi-VN")}</span>
            </div>
        </div>
    `;
}

// Promise.allSettled — xử lý khi 1 API lỗi
async function loadDashboard() {
    const startTime = Date.now();

    showGlobalLoading();
    fetchTime.textContent = "Đang tải dữ liệu...";

    widgets.forEach((_, index) => {
        renderWidgetLoading(index);
    });

    const results = await Promise.allSettled([
        fetchJson(widgets[0].url),
        fetchJson(widgets[1].url),
        fetchJson(widgets[2].url)
    ]);

    results.forEach((result, index) => {
        if (result.status === "fulfilled") {
            renderWidget(index, result.value);
        } else {
            renderWidgetError(index, result.reason.message);
        }
    });

    hideGlobalLoading();

    const loadedTime = Date.now() - startTime;
    fetchTime.textContent = `Data loaded in ${loadedTime} ms`;

    console.log(`Loaded in ${loadedTime}ms`);
}

refreshBtn.addEventListener("click", loadDashboard);

loadDashboard();