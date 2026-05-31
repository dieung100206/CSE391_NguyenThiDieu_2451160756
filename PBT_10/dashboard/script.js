const userWidget =
    document.getElementById("widget-user");

const weatherWidget =
    document.getElementById("widget-weather");

const countryWidget =
    document.getElementById("widget-country");

const refreshBtn =
    document.getElementById("refreshBtn");

const globalStatus =
    document.getElementById("globalStatus");

const loadTime =
    document.getElementById("loadTime");

function setLoading() {

    globalStatus.textContent =
        "Loading all APIs...";

    userWidget.innerHTML =
        '<p class="loading">Loading...</p>';

    weatherWidget.innerHTML =
        '<p class="loading">Loading...</p>';

    countryWidget.innerHTML =
        '<p class="loading">Loading...</p>';
}

function renderWidget(index, data) {

    switch(index){

        case 0:

            userWidget.innerHTML = `
                <p><strong>
                    ${data.results[0].name.first}
                    ${data.results[0].name.last}
                </strong></p>

                <p>${data.results[0].email}</p>

                <img
                    src="${data.results[0].picture.large}"
                    alt="User">
            `;
            break;

        case 1:

            weatherWidget.innerHTML = `
                <p>
                    Temperature:
                    <strong>
                        ${data.current.temperature_2m}
                        °C
                    </strong>
                </p>

                <p>
                    Wind:
                    ${data.current.wind_speed_10m}
                    km/h
                </p>
            `;
            break;

        case 2:

            countryWidget.innerHTML = `
                <p>
                    <strong>
                        ${data[0].name.common}
                    </strong>
                </p>

                <p>
                    Capital:
                    ${data[0].capital?.[0]}
                </p>

                <p>
                    Population:
                    ${data[0].population.toLocaleString()}
                </p>
            `;
            break;
    }
}

function renderWidgetError(index, message) {

    const html = `
        <p class="error">
            Error:
            ${message}
        </p>
    `;

    switch(index){

        case 0:
            userWidget.innerHTML = html;
            break;

        case 1:
            weatherWidget.innerHTML = html;
            break;

        case 2:
            countryWidget.innerHTML = html;
            break;
    }
}

/*
 Promise.allSettled
 xử lý khi 1 API lỗi
*/

async function loadDashboard() {

    setLoading();

    const startTime =
        Date.now();

    const results =
        await Promise.allSettled([

            fetch(
                "https://randomuser.me/api/"
            ).then(r => r.json()),

            fetch(
                "https://api.open-meteo.com/v1/forecast?latitude=21.0285&longitude=105.8542&current=temperature_2m,wind_speed_10m"
                ).then(r => r.json()),

            fetch(
                "https://restcountries.com/v3.1/name/vietnam"
            ).then(r => r.json())
        ]);

    results.forEach((result,index)=>{

        if(
            result.status ===
            "fulfilled"
        ){

            renderWidget(
                index,
                result.value
            );

        }else{

            renderWidgetError(
                index,
                result.reason.message
            );

        }

    });

    const duration =
        Date.now() - startTime;

    globalStatus.textContent =
        "All APIs completed";

    loadTime.textContent =
        `Data loaded in ${duration} ms`;

    console.log(
        `Loaded in ${duration}ms`
    );
}

refreshBtn.addEventListener(
    "click",
    loadDashboard
);

loadDashboard();