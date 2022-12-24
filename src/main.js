import { DataForm } from "./ui/DataForm.js";
import { TemperaturesList } from "./ui/TemperaturesList.js";
import { WeatherDataProcessor } from "./data/WeatherDataProcessor.js";
//https://api.open-meteo.com/v1/gfs?latitude=31.0461&longitude=34.8516&hourly=temperature_2m&timezone=IST&start_date=2022-12-18&end_date=2023-01-03
// let latitude = 31.046;
// let longitude=34.851;
// let start_date="2022-12-18";
// let end_date="2022-12-19";

// let promiseResponse = fetch(url);

// let promiseData = promiseResponse.then(response=>response.json());
// let dataProcessing = promiseData.then(data => console.log(data.hourly.time
//     ))
// this.#formElement = document.getElementById(params.idForm);
//        this.#inputElements = document.querySelectorAll(`#${params.idForm} [name]`);
//        this.#dateFromElement = document.getElementById(params.idDateFrom);
//        this.#dateToElement = document.getElementById(params.idDateTo);
//        this.#hourFromElement = document.getElementById(params.idHourFrom);
//        this.#hourToElement = document.getElementById(params.idHourTo);
//        this.#errorMessageElem = document.getElementById(params.idErrorMessage);
// const cities = weatherProcessor.getCities();
// console.log(cities);
const weatherProcessor = new WeatherDataProcessor();
const params = {idForm: "data_form", idDateFrom: "date_from", idDateTo: "date_to",
idHourFrom: "hour_from", idHourTo: "hour_to", idErrorMessage: "error_message",
sitySelector: 'select[name="city"]',
minMaxDates: getMinMaxDates(weatherProcessor.getPeriodInDays()),
cities: weatherProcessor.getCities()};

const dataForm = new DataForm(params);
const temperatureList = new TemperaturesList("items-list", "city");
function getMinMaxDates(periodInDays) {
    const date = new Date();
    const start_date = date.toISOString().substring(0,10);
    const day = date.getDate();
    date.setDate(day + periodInDays);
    const end_date = date.toISOString().substring(0,10);
    return {minDate: start_date, maxDate: end_date};
}
// ===========================way #1==================================
dataForm.addHandler(async (dataFromForm) => {
     const data = await weatherProcessor.getData(dataFromForm);
     temperatureList.showTemperatures(data)
})
// ===========================way #2==================================
// dataForm.addHandler( (dataFromForm) => {
//     const promiseData = weatherProcessor.getData(dataFromForm);
//     promiseData.then( data => temperatureList.showTemperatures(data));
// })


