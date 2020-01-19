// import { currentId } from "async_hooks";

window.addEventListener('load', () => {
    let long;
    let lat;
    let tempretureDescritpion = document.querySelector(
        '.temperature-description'
    );
    let tempretureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let tempretureSection = document.querySelector('.degree-section')
    let tempretureSectionSpan = document.querySelector('.degree-section span')
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const proxy = 'https://cors-anywhere.herokuapp.com/'
            const api = `${proxy}https://api.darksky.net/forecast/b559179b471ec757033845725ad74a23/${lat},${long}`;
            fetch(api)
                .then(response => {
                    return response.json();
                }).then(data => {
                    console.log(data);
                    const { temperature, summary, icon } = data.currently;

                    tempretureDegree.textContent = temperature;
                    tempretureDescritpion.textContent = summary;
                    locationTimezone.textContent = data.timezone;

                    let cel = (temperature - 32) * (5 / 9);
                    setIcons(icon, document.querySelector('.icon'));

                    tempretureSection.addEventListener('click', () => {
                        if (tempretureSectionSpan.textContent === "F") {
                            tempretureSectionSpan.textContent = "C";
                            tempretureDegree.textContent = Math.floor(cel);
                        } else {
                            tempretureSectionSpan.textContent = "F";
                            tempretureDegree.textContent = temperature;
                        }
                    });
                })
        });

    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({ color: "white" });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();

        skycons.play();
        return skycons.set(iconID, skycons[currentIcon]);
    }
    //  else {
    //     h1.textContent = "Hey this is not working";
    // }

});