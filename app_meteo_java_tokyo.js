const outputtemp = document.getElementById("outputtemp");
const outputimmagine = document.getElementById("outputimmagine");
const outputtesto = document.getElementById("outputtesto");
const outputluogo = document.getElementById("outputluogo");
const outputqualaria = document.getElementById("outputqualaria");
const outputvento=document.getElementById("outputvento");
const outputmaxmin=document.getElementById("outputmaxmin");
const outputsole=document.getElementById("outputsole");
const outputumidita=document.getElementById("outputumidita");
const template = "https://api.geoapify.com/v1/geocode/search?apiKey=5e8d464f7a6f48f281288c93c1531355&text=tokyo";
const template1 = "https://api.open-meteo.com/v1/forecast?latitude=%LATITUDE&longitude=%LONGITUDE&current_weather=true";
const template2= "https://air-quality-api.open-meteo.com/v1/air-quality?latitude=%LATITUDE&longitude=%LONGITUDE&hourly=pm10,pm2_5";
const template3="https://api.open-meteo.com/v1/forecast?latitude=%LATITUDE&longitude=%LONGITUDE&current=temperature_2m,relative_humidity_2m,is_day&minutely_15=temperature_2m,weather_code,wind_speed_10m&hourly=temperature_2m,weather_code,uv_index,is_day&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,daylight_duration,uv_index_max,precipitation_probability_max,wind_speed_10m_max,wind_direction_10m_dominant&timezone=auto";

(() => {
    let url = template;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const coordinates = data.features[0].geometry.coordinates;
            const latitude = coordinates[1];
            const longitude = coordinates[0];
            let url1 = template1.replace("%LATITUDE", latitude).replace("%LONGITUDE", longitude);
            fetch(url1)
                .then(response => response.json())
                .then(weatherData => {
                    outputtemp.innerHTML = "";
                    outputimmagine.innerHTML = "";
                    outputtesto.innerHTML = "";
                    outputluogo.innerHTML = "";
                    outputqualaria.innerHTML = "";
                    outputvento.innerHTML = "";
                    outputmaxmin.innerHTML = "";
                    outputsole.innerHTML = "";
                    outputtemp.innerText +=
                    "Informazioni relative a: " + data.features[0].properties.formatted;
                    outputluogo.innerHTML = 
                        "<p><strong>Temperatura:</strong> " + weatherData.current_weather.temperature + "C</p>" ;
                    if ((weatherData.current_weather.windspeed)<62){
                        outputvento.innerHTML += '<p><img src="https://image.spreadshirtmedia.net/image-server/v1/compositions/T31A1PA29PT10X0Y33D147998243W6028H3704Cx0091D3/views/1,width=550,height=550,appearanceId=1,backgroundColor=FFFFFF,noPt=true/ventoso-vento-simbolo-icona-tazza.jpg" alt="Soleggiato" style="width: 50px; height: 50px;"><strong>Velocità del vento:</strong> ' + weatherData.current_weather.windspeed + "km/h" + "                      " + '<img src="https://upload.wikimedia.org/wikipedia/commons/b/bb/Button_Icon_GreenBlue.svg" alt="Bollino verde" style="width: 20px; height: 20px;">' + "Codice verde" + "</p>";                    }
                    else if ((weatherData.current_weather.windspeed)>=62 && (weatherData.current_weather.windspeed)<74){
                        outputvento.innerHTML += '<p><img src="https://image.spreadshirtmedia.net/image-server/v1/compositions/T31A1PA29PT10X0Y33D147998243W6028H3704Cx0091D3/views/1,width=550,height=550,appearanceId=1,backgroundColor=FFFFFF,noPt=true/ventoso-vento-simbolo-icona-tazza.jpg" alt="Soleggiato" style="width: 50px; height: 50px;"><strong>Velocità del vento:</strong> ' + weatherData.current_weather.windspeed + "km/h" + "                      " + '<img src="https://upload.wikimedia.org/wikipedia/commons/b/bb/Button_Icon_GreenBlue.svg" alt="Bollino verde" style="width: 20px; height: 20px;">' + "Codice verde" + "</p>";                    }
                    else if ((weatherData.current_weather.windspeed)>=74 && (weatherData.current_weather.windspeed)<88){
                        outputvento.innerHTML += '<p><img src="https://image.spreadshirtmedia.net/image-server/v1/compositions/T31A1PA29PT10X0Y33D147998243W6028H3704Cx0091D3/views/1,width=550,height=550,appearanceId=1,backgroundColor=FFFFFF,noPt=true/ventoso-vento-simbolo-icona-tazza.jpg" alt="Soleggiato" style="width: 50px; height: 50px;"><strong>Velocità del vento:</strong> ' + weatherData.current_weather.windspeed + "km/h" + "                      " + '<img src="https://upload.wikimedia.org/wikipedia/commons/b/bb/Button_Icon_GreenBlue.svg" alt="Bollino verde" style="width: 20px; height: 20px;">' + "Codice verde" + "</p>";                    }
                    else if ((weatherData.current_weather.windspeed)>=88){
                        outputvento.innerHTML += '<p><img src="https://image.spreadshirtmedia.net/image-server/v1/compositions/T31A1PA29PT10X0Y33D147998243W6028H3704Cx0091D3/views/1,width=550,height=550,appearanceId=1,backgroundColor=FFFFFF,noPt=true/ventoso-vento-simbolo-icona-tazza.jpg" alt="Soleggiato" style="width: 50px; height: 50px;"><strong>Velocità del vento:</strong> ' + weatherData.current_weather.windspeed + "km/h" + "                      " + '<img src="https://upload.wikimedia.org/wikipedia/commons/b/bb/Button_Icon_GreenBlue.svg" alt="Bollino verde" style="width: 20px; height: 20px;">' + "Codice verde" + "</p>";                    }                    
                    if (weatherData.current_weather.weathercode === 0) {
                        if (weatherData.current_weather.is_day === 1){
                            outputimmagine.innerHTML += '<img src="https://www.3bmeteo.com/images/set_icone/9/80-80/1.png" alt="Soleggiato" style="width: 120px; height: 120px;">';
                            outputtesto.innerText="Soleggiato";
                        }
                        else{
                            outputimmagine.innerHTML += '<img src="https://www.3bmeteo.com/images/set_icone/9/80-80/1n.png" alt="cielo sereno" style="width: 120px; height: 120px;">';
                            outputtesto.innerText="Cielo sereno";
                        }
                    } 
                    else if (weatherData.current_weather.weathercode === 1){
                        if (weatherData.current_weather.is_day === 1){
                            outputimmagine.innerHTML += '<img src="https://www.3bmeteo.com/images/set_icone/9/80-80/50.png" alt="Soleggiato con velature sparse" style="width: 120px; height: 120px;">';
                            outputtesto.innerText="Soleggiato con velature sparse";
                        }
                        else{
                            outputimmagine.innerHTML += '<img src="https://www.3bmeteo.com/images/set_icone/9/80-80/44n.png" alt="Cielo sereno con poche velature" style="width: 120px; height: 120px;">';
                            outputtesto.innerText="Cielo sereno con poche velature";
                        }
                        
                    }
                    else if (weatherData.current_weather.weathercode === 2) {
                        if (weatherData.current_weather.is_day === 1){
                            outputimmagine.innerHTML += '<img src="https://www.3bmeteo.com/images/set_icone/9/80-80/51.png" alt="Parzialmente nuvoloso" style="width: 120px; height: 120px;">';
                            outputtesto.innerText="Parzialmente Nuvoloso";
                        }
                        else{
                            outputimmagine.innerHTML += '<img src="https://www.3bmeteo.com/images/set_icone/9/80-80/45n.png" alt="cielo parzialmente nuvoloso" style="width: 120px; height: 120px;">';
                            outputtesto.innerText="Cielo parzialmente nuvoloso";
                        }
                    }
                    else if (weatherData.current_weather.weathercode === 3) {
                        if (weatherData.current_weather.is_day === 1){
                            outputimmagine.innerHTML += '<img src="https://www.3bmeteo.com/images/set_icone/9/80-80/48.png" alt="Nuvoloso" style="width: 120px; height: 120px;">';
                            outputtesto.innerText="Nuvoloso";
                        }
                        else{
                            outputimmagine.innerHTML += '<img src="https://www.3bmeteo.com/images/set_icone/9/80-80/47n.png" alt="Nuvoloso" style="width: 120px; height: 120px;">';
                            outputtesto.innerText="Nuvoloso";
                        }
                    }
                    else if (weatherData.current_weather.weathercode === 45){
                        if (weatherData.current_weather.is_day === 1){
                            outputimmagine.innerHTML += '<img src="https://www.3bmeteo.com/images/set_icone/9/80-80/38.png" alt="Nebbia" style="width: 120px; height: 120px;">';
                            outputtesto.innerText="Nebbia";
                        }
                        else{
                            outputimmagine.innerHTML += '<img src="https://www.3bmeteo.com/images/set_icone/9/80-80/60n.png" alt="Nebbia" style="width: 120px; height: 120px;">';
                            outputtesto.innerText="Nebbia";
                        }
                    }
                    else if (weatherData.current_weather.weathercode === 48){
                        if (weatherData.current_weather.is_day === 1){
                            outputimmagine.innerHTML += '<img src="https://www.3bmeteo.com/images/set_icone/9/80-80/55.png" alt="Brina" style="width: 120px; height: 120px;">';
                            outputtesto.innerText="Brina";
                        }
                        else{
                            outputimmagine.innerHTML += '<img src="https://www.3bmeteo.com/images/set_icone/9/80-80/41n.png" alt="Brina" style="width: 120px; height: 120px;">';
                            outputtesto.innerText="Brina";
                        }
                    }
                    else if (weatherData.current_weather.weathercode === 51){
                        if (weatherData.current_weather.is_day === 1){
                            outputimmagine.innerHTML += '<img src="https://www.3bmeteo.com/images/set_icone/9/80-80/9.png" alt="Pioviggina di intensità leggera" style="width: 120px; height: 120px;">';
                            outputtesto.innerText="Pioviggina di intensità leggera";
                        }
                        else{
                            outputimmagine.innerHTML += '<img src="https://www.3bmeteo.com/images/set_icone/9/80-80/26n.png" alt="Pioviggina di intensità leggera" style="width: 120px; height: 120px;">';
                            outputtesto.innerText="Pioviggina di intensità leggera";
                        }
                    }
                    else if((weatherData.current_weather.weathercode === 53)|| (weatherData.current_weather.weathercode === 61)|| (weatherData.current_weather.weathercode === 63)){
                        if(weatherData.current_weather.is_day === 1){
                            outputimmagine.innerHTML += '<img src="https://www.3bmeteo.com/images/set_icone/9/80-80/10.png" alt="Pioviggina di intensità moderata" style="width: 120px; height: 120px;">';
                            outputtesto.innerText="Pioviggina di intensità moderata";
                        }
                        else{
                            outputimmagine.innerHTML += '<img src="https://www.3bmeteo.com/images/set_icone/9/80-80/3n.png" alt="Pioviggina di intensità moderata" style="width: 120px; height: 120px;">';
                            outputtesto.innerText="Pioviggina di intensità moderata";
                        }
                    }
                    else if ((weatherData.current_weather.weathercode === 55)|| (weatherData.current_weather.weathercode === 57)){
                        if(weatherData.current_weather.is_day === 1){
                            outputimmagine.innerHTML += '<img src="https://www.3bmeteo.com/images/set_icone/9/80-80/8.png" alt="Pioviggina di intensità alta" style="width: 120px; height: 120px;">';
                            outputtesto.innerText="Pioviggina di intensità alta";
                        }
                        else{
                            outputimmagine.innerHTML += '<img src="https://www.3bmeteo.com/images/set_icone/9/80-80/4n.png" alt="Pioviggina di intensità alta" style="width: 120px; height: 120px;">';
                            outputtesto.innerText="Pioviggina di intensità alta";
                        }
                    }
                    else if (weatherData.current_weather.weathercode === 66){
                        if (weatherData.current_weather.is_day === 1){
                            outputimmagine.innerHTML += '<img src="https://www.3bmeteo.com/images/set_icone/9/80-80/30.png" alt="Pioggia e neve lieve" style="width: 120px; height: 120px;">';
                            outputtesto.innerText="Pioggia e neve lieve";
                        }
                        else{
                            outputimmagine.innerHTML += '<img src="https://www.3bmeteo.com/images/set_icone/9/80-80/16n.png" alt="Pioggia e neve lieve" style="width: 120px; height: 120px;">';
                            outputtesto.innerText="Pioggia e neve lieve";
                        }
                    }
                    else if(weatherData.current_weather.weathercode === 67){
                        if (weatherData.current_weather.is_day === 1){
                            outputimmagine.innerHTML += '<img src="https://www.3bmeteo.com/images/set_icone/9/80-80/17.png" alt="Nevischio intenso" style="width: 120px; height: 120px;">';
                            outputtesto.innerText="Nevischio intenso";
                        }
                        else{
                            outputimmagine.innerHTML += '<img src="https://www.3bmeteo.com/images/set_icone/9/80-80/18n.png" alt="Nevischio intenso" style="width: 120px; height: 120px;">';
                            outputtesto.innerText="Nevischio intenso";
                        }
                    }
                    else if (weatherData.current_weather.weathercode === 71){
                        if (weatherData.current_weather.is_day === 1){
                            outputimmagine.innerHTML += '<img src="https://www.3bmeteo.com/images/set_icone/9/80-80/17.png" alt="Neve leggera" style="width: 120px; height: 120px;">';
                            outputtesto.innerText="Neve leggera";
                        }
                        else{
                            outputimmagine.innerHTML += '<img src="https://www.3bmeteo.com/images/set_icone/9/80-80/22n.png" alt="Neve leggera" style="width: 120px; height: 120px;">';
                            outputtesto.innerText="Neve leggera";
                        }
                    }
                    else if (weatherData.current_weather.weathercode === 73){
                        if (weatherData.current_weather.is_day === 1){
                            outputimmagine.innerHTML += '<img src="https://www.3bmeteo.com/images/set_icone/9/80-80/21.png" alt="Neve" style="width: 120px; height: 120px;">';
                            outputtesto.innerText="Neve";
                        }
                        else{
                            outputimmagine.innerHTML += '<img src="https://www.3bmeteo.com/images/set_icone/9/80-80/22n.png" alt="Neve leggera" style="width: 120px; height: 120px;">';
                            outputtesto.innerText="Neve leggera";
                        }
                    }
                    else if (weatherData.current_weather.weathercode === 75){
                        if (weatherData.current_weather.is_day === 1){
                            outputimmagine.innerHTML += '<img src="https://www.3bmeteo.com/images/set_icone/9/80-80/25.png" alt="Neve forte" style="width: 120px; height: 120px;">';
                            outputtesto.innerText="Neve forte"; 
                        }
                        else{
                            outputimmagine.innerHTML += '<img src="https://www.3bmeteo.com/images/set_icone/9/80-80/66n.png" alt="Neve forte" style="width: 120px; height: 120px;">';
                            outputtesto.innerText="Neve forte";
                        }
                    }
                    else if (weatherData.current_weather.weathercode === 77) {
                        outputimmagine.innerHTML += '<img src="https://www.3bmeteo.com/images/set_icone/9/80-80/37.png" alt="Grandine" style="width: 120px; height: 120px;">';
                        outputtesto.innerText="Grandine";
                    }
                    else if (weatherData.current_weather.weathercode === 80) {
                        if (weatherData.current_weather.is_day === 1){
                            outputimmagine.innerHTML += '<img src="https://www.3bmeteo.com/images/set_icone/9/80-80/54.png" alt="Pioggia" style="width: 120px; height: 120px;">';
                            outputtesto.innerText="Pioggia";
                        }
                        else{
                            outputimmagine.innerHTML += '<img src="https://www.3bmeteo.com/images/set_icone/9/80-80/4n.png" alt="Pioggia" style="width: 120px; height: 120px;">';
                            outputtesto.innerText="Pioggia";
                        }
                    }
                    else if (weatherData.current_weather.weathercode === 81) {
                        if (weatherData.current_weather.is_day === 1){
                            outputimmagine.innerHTML += '<img src="https://www.3bmeteo.com/images/set_icone/9/80-80/56.png" alt="Pioggia moderata" style="width: 120px; height: 120px;">';
                            outputtesto.innerText="Pioggia moderata";
                        }
                        else{
                            outputimmagine.innerHTML += '<img src="https://www.3bmeteo.com/images/set_icone/9/80-80/58n.png" alt="Pioggia moderata" style="width: 120px; height: 120px;">';
                            outputtesto.innerText="Pioggia moderata";
                        }
                    }
                    else if (weatherData.current_weather.weathercode === 82) {
                        if (weatherData.current_weather.is_day === 1){
                            outputimmagine.innerHTML += '<img src="https://www.3bmeteo.com/images/set_icone/9/80-80/57.png" alt="Pioggia molto forte" style="width: 120px; height: 120px;">';
                            outputtesto.innerText="Pioggia molto forte";
                        }
                        else{
                            outputimmagine.innerHTML += '<img src="https://www.3bmeteo.com/images/set_icone/9/80-80/58n.png" alt="Pioggia molto forte" style="width: 120px; height: 120px;">';
                            outputtesto.innerText="Pioggia molto forte";
                        }
                    }
                    else if (weatherData.current_weather.weathercode === 85) {
                        outputimmagine.innerHTML += '<img src="https://www.3bmeteo.com/images/set_icone/9/80-80/21.png" alt="Rovesci di neve" style="width: 120px; height: 120px;">';
                        outputtesto.innerText="Rovesci di neve";
                    }
                    else if (weatherData.current_weather.weathercode === 86) {
                        outputimmagine.innerHTML += '<img src="https://www.3bmeteo.com/images/set_icone/9/80-80/23.png" alt="Rovesci di neve forti" style="width: 120px; height: 120px;">';
                        outputtesto.innerText="Rovesci di neve forti";
                    }
                    else if (weatherData.current_weather.weathercode === 95) {
                        if (weatherData.current_weather.is_day === 1){
                            outputimmagine.innerHTML += '<img src="https://www.3bmeteo.com/images/set_icone/9/80-80/6.png" alt="Temporale" style="width: 120px; height: 120px;">';
                            outputtesto.innerText="Temporale";
                        }
                        else{
                            outputimmagine.innerHTML += '<img src=" https://www.3bmeteo.com/images/set_icone/9/80-80/5n.png" alt="Temporale" style="width: 120px; height: 120px;">';
                            outputtesto.innerText="Temporale";
                        }
                    }
                    else if ((weatherData.current_weather.weathercode === 96)|| (weatherData.current_weather.weathercode === 99)) {
                        outputimmagine.innerHTML += '<img src="https://www.3bmeteo.com/images/set_icone/9/80-80/62.png" alt="Temporale con moderate/forti grandinate" style="width: 120px; height: 120px;">';
                        outputtesto.innerText="Temporale con moderate/forti grandinate";
                    }
                    let url2 = template2.replace("%LATITUDE", latitude).replace("%LONGITUDE", longitude);
                    fetch(url2)
                        .then(response => response.json())
                        .then(data => {
                            let sommapm10 = 0;
                            let contatorepm10 = 0;
                            data.hourly.pm10.forEach((valore) => {
                                sommapm10 += valore;
                                contatorepm10++;
                            });
                            let mediapm10 = 0;
                            if (contatorepm10 !== 0) {
                                mediapm10 = sommapm10 / contatorepm10;
                            } else {
                                mediapm10 = 0;
                            }
                            let sommapm25 = 0;
                            let contatorepm25 = 0;
                            data.hourly.pm2_5.forEach((valore) => {
                                sommapm25 += valore;
                                contatorepm25++;
                            });
                            let mediapm25 = 0;
                            if (contatorepm25 !== 0) {
                                mediapm25 = sommapm25 / contatorepm25;
                            } else {
                                mediapm25 = 0;
                            }
                            outputqualaria.innerHTML = "<p><strong>Qualità dell'aria:</strong> PM10: " + mediapm10.toFixed(2) +  "μg/m³ PM25: " + mediapm25.toFixed(2)+"μg/m³</p>";
                            let url3 = template3.replace("%LATITUDE", latitude).replace("%LONGITUDE", longitude);
                            fetch(url3)
                                .then(response => response.json())
                                .then(data => {
                                    let tempmax=0;
                                    data.daily.temperature_2m_max.forEach((valore) => {
                                        if (valore > tempmax) {
                                            tempmax = valore;
                                        }
                                    });
                                    let tempmin=1000;
                                    data.daily.temperature_2m_min.forEach((valore) => {
                                        if (valore < tempmin) {
                                            tempmin = valore;
                                        }
                                    });
                                    outputmaxmin.innerHTML = "<p><strong>Temperatura minima e massima:</strong>: " + tempmin +  "°C"+"/"+tempmax+"</p>";
                                    let percumidita=data.current.relative_humidity_2m ;                                   
                                    outputumidita.innerHTML = "<p><strong>Umidità</strong>: " + percumidita +  "%";
                                    let oraalba=data.daily.sunrise[0];
                                    let oratramonto=data.daily.sunset[0];
                                    outputsole.innerHTML += '<table>' +'<tr><td><img src="https://www.3bmeteo.com/images/long/sole-alba.svg" alt="Alba" title="Alba" style="width: 50px; height: 50px;"></td>' +
                                    '<td><img src="https://www.3bmeteo.com/images/long/sole-tramonto.svg" alt="Tramonto" title="Tramonto" style="width: 50px; height: 50px;"></td></tr>' +
                                    '<tr><td>' + oraalba.slice(-5) + '</td><td>' + oratramonto.slice(-5) + '</td></tr>' +
                                    '</table>';
                                }); 
                        });  
                });
        });
})();
