window.addEventListener("load", ()=> {

    let lat;
    let lon;


    let degree = document.querySelector('.degree');
    let timezone = document.querySelector('.timezone');
    let temperature = document.querySelector('.temperature');

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

                    setIcons(icon, document.querySelector('.icon'));

                });
        });
    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({color : "black"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }

});