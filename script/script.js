document.querySelector(".busca").addEventListener("submit", async(e) => {
    e.preventDefault();

    const apiKey = '8765ade84b0fd13d040b2b45821568e9',
        lang = "pt_br",
        units = "metric";


    let input = document.querySelector("#searchInput").value;
    if (input !== "") {
        showAviso("Carregando...");

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=${apiKey}&units=${units}&lang=${lang}`


        let results = await fetch(url),
            json = await results.json();

        if (json.cod === 200) {
            limpaInfo();
            showInfo({
                nome: json.name,
                pais: json.sys.country,
                temperaturaAtual: json.main.temp,
                temperaturaMax: json.main.temp_max,
                temperaturaMin: json.main.temp_min,
                iconeTempo: json.weather[0].icon,
                ventoVelocidade: json.wind.speed,
                ventoAngulo: json.wind.deg,
                descricao: json.weather[0].description

            });
        } else {
            limpaInfo();
            showAviso("Não encontramos essa localização")
        }
    }

});

function limpaInfo() {
    showAviso("");
    document.querySelector(".resultado").style.display = "none";

}



function showInfo(json) {
    console.log(json);

    showAviso("");
    document.querySelector(".resultado").style.display = "block";
    document.querySelector('.titulo').innerHTML = `${json.nome}, ${json.pais}`
    document.querySelector('.tempInfo').innerHTML = `${json.temperaturaAtual.toFixed(1)}<sup>ºC</sup>`


    document.querySelector('.tempMax').innerHTML = `<i class="fa fa-arrow-up"></i>${json.temperaturaMax.toFixed()}<sup>ºC</sup>`;
    document.querySelector('.tempMin').innerHTML = `<i class="fa fa-arrow-down"></i>${json.temperaturaMin.toFixed()}<sup>ºC</sup>`;


    document.querySelector('.temp img').setAttribute("src", `http://openweathermap.org/img/wn/${json.iconeTempo}@2x.png`)
    document.querySelector('.ventoInfo').innerHTML = `${json.ventoVelocidade} <span>km/h</span>`
    document.querySelector('.ponteiro').style.transform = `rotate(${json.ventoAngulo}deg)`;

}

function showAviso(msg) {
    document.querySelector(".aviso").innerHTML = msg;
}