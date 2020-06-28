window.addEventListener("load", ()=> {

    let lat;
    let lon;

    let degree = document.querySelector('.degree');
    let timezone = document.querySelector('.timezone');

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

                    const {temperature} = data.currently;

                    degree.textContent = temperature;
                    timezone.textContent = data.timezone;
                    
                });
        });
    }
});