const key = "0dac7064969268c3a7f17f9bc17c6fae";

function show_data(data) {
  document.querySelector(".cidade").innerHTML = "Tempo em " + data.name;
  document.querySelector(".temperatura").innerHTML =
    Math.floor(data.main.temp) + "°C";
  document.querySelector(".umidade").innerHTML =
    "Umidade: " + data.main.humidity + "%";
  document.querySelector(".texto-previsao").innerHTML =
    data.weather[0].description;
  document.querySelector(".img-previsao").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
  console.log(data);
}

async function search_city(city) {
  const data = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=pt_br&units=metric`
  ).then((response) => response.json());
  show_data(data);
}

function click_button() {
  const city = document.querySelector(".input-city").value;
  search_city(city);
}
