window.addEventListener("load", ()=> {

    let lat;
    let lon;


    let degree = document.querySelector('.degree');
    let timezone = document.querySelector('.timezone');
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.degree-section span')

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
    
            lat = position.coords.latitude;
            lon = position.coords.longitude;
            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/edbea218432ac27de1b3da161f4c60eb/${lat},${lon}`;

                        
            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);

                    const {temperature, icon} = data.currently;

                    degree.textContent = temperature;
                    timezone.textContent = data.timezone;

                    let celsius = (temperature - 32) * (5 / 9);

                    setIcons(icon, document.querySelector('.icon'));

                    temperatureSection.addEventListener("click", ()=> {
                        if (temperatureSpan.textContent === "F") {
                            temperatureSpan.textContent = "C";
                            degree.textContent = Math.floor(celsius);
                        } else {
                            if (temperatureSpan.textContent === "C") {
                                temperatureSpan.textContent = "F";
                                degree.textContent = degree;
                            }
                        }
                        
                    });
                });
        });
    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({color : "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }

});