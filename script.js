'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

let map, mapEvent;

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
        const { latitude } = position.coords;
        const { longitude } = position.coords;
        console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

        const coords = [latitude, longitude];

        map = L.map('map').setView(coords, 20);

        L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        map.on('click', function (mapE) {
            mapEvent = mapE;
            console.log("Clicked event:", mapEvent);
            form.classList.remove('hidden');
            inputDistance.focus();
            L.marker(mapEvent.latlng).addTo(map);
        });


    },
        function () {
            alert("Could not get your location");
        });
}

form.addEventListener('submit', function (e) {
    e.preventDefault();

    console.log("Form submitted");
    console.log("mapEvent:", mapEvent);

    if (mapEvent && mapEvent.latlng) {
        const { lat, lng } = mapEvent.latlng;
        console.log("Latitude:", lat, "Longitude:", lng);

        L.marker([lat, lng])
            .addTo(map)
            .bindPopup(
                L.popup({
                    maxWidth: 250,
                    minWidth: 100,
                    autoClose: false,
                    closeOnClick: false,
                    className: 'running-popup',
                })
            )
            .setPopupContent('Sohrab')
            .openPopup();
    } else {
        console.error("mapEvent or latlng is undefined");
    }
});

