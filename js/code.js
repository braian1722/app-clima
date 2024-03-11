const API_KEY ='1b21d236898b2a4123ffb015135a15d5';

let ubicacion = document.getElementById('ubicacion');
let temperaturaValor = document.getElementById('temperatura-valor');
let temperaturaDetalle = document.getElementById('temperatura-detalle');
let vientos = document.getElementById('vientos');
let icono = document.getElementById('icono-animado');
let fecha = document.getElementById('fecha');
let hora = document.getElementById('hora');



const obtenerFecha = ()=>{
    let fechaActual = new Date();
    fechaActual.toLocaleDateString()
    const opcionesFecha = { day: 'numeric', month: 'numeric', year: 'numeric' };
    const fechaFormato = fechaActual.toLocaleDateString('es-ES', opcionesFecha);

    const horaFormato = fechaActual.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    return `${fechaFormato} <br> ${horaFormato}`
}


window.addEventListener('load',()=>{
    let latitude;
    let longitude;
    if(navigator.geolocation){//si damos permitir accedemos a las cordenadas
        navigator.geolocation.getCurrentPosition( position =>{
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;

            const urlApi = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&lang=es&units=metric&appid=${API_KEY}`;
            console.log(urlApi)

            fetch(urlApi)
                .then(response => {return response.json()}) //que nos restorne un json
                .then(data =>{//aca va el codigo
                    
                    let temp = Math.round(data.main.temp);
                    temperaturaValor.textContent = `${temp} °C`;

                    let name = data.name;
                    ubicacion.textContent = name.toUpperCase();

                    let des = data.weather[0].description;
                    temperaturaDetalle.textContent = des.toUpperCase();

                    let vie = data.wind.speed;
                    vientos.textContent = `Velocidad ${vie}KM/H`
                    //fecha y hora
                    fecha.innerHTML = obtenerFecha();
                    setInterval(()=>{
                        fecha.innerHTML = obtenerFecha();
                    },1000)

                    //iconos
                    console.log(data.weather[0].main)
                    switch(data.weather[0].main){
                        case 'Clouds':
                            icono.src = 'animated/cloudy.svg';
                            break;
                        case 'Clear':
                            icono.src = 'animated/day.svg';
                            break; 
                        case 'Thunderstorm':
                            icono.src = 'animated/thunder.svg';
                            break;
                        case 'Drizzle':
                            icono.src = 'animated/rainy-3.svg';
                            break; 
                        case 'Rain':
                            icono.src = 'animated/rainy-6.svg';
                            break;
                        case 'Snow':
                            icono.src = 'animated/snowy-4.svg';
                            break;
                        case 'Atmosphere':
                            icono.src = 'animated/weather.svg';
                            break;
                    }
                })
                .catch(e =>{
                    console.log(e);
                })

        })
        
    }
})

