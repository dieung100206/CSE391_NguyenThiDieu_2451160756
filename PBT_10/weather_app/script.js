const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const result = document.getElementById("result");
const historyList = document.getElementById("historyList");

let searchHistory =
    JSON.parse(localStorage.getItem("weatherHistory")) || [];

renderHistory();

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();

    if (!city) {
        alert("Vui lòng nhập tên thành phố!");
        return;
    }

    getWeather(city);
});

async function getWeather(city) {

    // Loading State
    result.innerHTML = `
        <div class="loading">
            <div class="spinner"></div>
            <p>Đang tải...</p>
        </div>
    `;

    try {

        const response = await fetch(
            `https://wttr.in/${city}?format=j1`
        );

        if (!response.ok) {
            throw new Error("Không tìm thấy thành phố");
        }

        const data = await response.json();

        const current = data.current_condition[0];

        const temperature = current.temp_C;
        const humidity = current.humidity;
        const description = current.weatherDesc[0].value;
        const icon = current.weatherIconUrl[0].value;

        // Success State
        result.innerHTML = `
            <div class="weather-card">
                <h2>${city}</h2>

                <img src="${icon}" alt="weather">

                <p class="temp">${temperature}°C</p>

                <p><strong>Độ ẩm:</strong> ${humidity}%</p>

                <p><strong>Mô tả:</strong> ${description}</p>
            </div>
        `;

        saveHistory(city);

    } catch (error) {

        // Error State
        result.innerHTML = `
            <div class="error">
                ❌ Không thể lấy dữ liệu thời tiết.
                <br>
                Kiểm tra lại tên thành phố hoặc kết nối mạng.
            </div>
        `;
    }
}

function saveHistory(city) {

    searchHistory = searchHistory.filter(
        item => item.toLowerCase() !== city.toLowerCase()
    );

    searchHistory.unshift(city);

    if (searchHistory.length > 5) {
        searchHistory.pop();
    }

    localStorage.setItem(
        "weatherHistory",
        JSON.stringify(searchHistory)
    );

    renderHistory();
}

function renderHistory() {

    historyList.innerHTML = "";

    searchHistory.forEach(city => {

        const li = document.createElement("li");

        li.textContent = city;

        li.addEventListener("click", () => {
            cityInput.value = city;
            getWeather(city);
        });

        historyList.appendChild(li);
    });
}