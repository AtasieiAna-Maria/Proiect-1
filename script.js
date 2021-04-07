function laIncarcare() {
    myTimer();
    myURL();
    myLocation();
    myBrawserNameAndVersion();
    mySO();
}

var myVarTime = setInterval(myTimer, 1000);
function myTimer() {
    document.getElementById("p1Data").innerHTML = "Time: " + new Date();
}

function myURL() {
    document.getElementById("p2AdresaURL").innerHTML = "Adresa URL: " + window.location;
}

function myLocation() {
    navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
    document.getElementById("p3LocatieCurenta").innerHTML = "Locatia curenta: --- Latitude: " + position.coords.latitude + " --- Longitude: " + position.coords.longitude;
}

function myBrawserNameAndVersion() {
    document.getElementById("p4NumeSiVersiuneBrawser").innerHTML = "Nume brawser: " + navigator.appName + " --- Versiune brawser: " + navigator.appVersion;
}

function mySO() {
    document.getElementById("p5SO").innerHTML = "Sistemul de operare: " + navigator.platform;
}

function extragereNumar() {
    let elements = [];
    for (let i = 1; i <= 8; ++i) {
        elements[i] = (Math.trunc(Math.random()*255).toString(16)).toUpperCase();
    }
    let stringFormated = "";

    for (let i = 1; i <= 8; ++i) {
        stringFormated += elements[i].toString() + " ";
    }

    document.getElementById("p1NumereCastigatoare").innerHTML = "Numerele câștigătoare sunt: " + stringFormated;

    let numarNumere = verificareNumere(elements)
    if (0 !== numarNumere) {
        document.getElementById("p2NumereGhicite").innerHTML = "Ai ghicit " + numarNumere + " numere.";
    }
    else {
        document.getElementById("p2NumereGhicite").innerHTML = "Nu ai ghicit niciun numar.";
    }
}

function verificareNumere(elements) {
    let count = 0;
    for (let i = 1; i <= 8; ++i) {
        for (let j = 1; j <= 8; ++j) {
            if (elements[i] === document.getElementById("tb" + j).value.toString().toUpperCase()) {
                ++count;
            }
        }
    }

    return count;
}

function draw(event) {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");

    var conturColor = document.getElementById("contur");
    var umplereColor = document.getElementById("umplere");

    ctx.beginPath();

    ctx.rect(20, 20, 150, 100);
    
    ctx.fillStyle = umplereColor.value;
    ctx.strokeStyle = conturColor.value;
    ctx.fill(); 
    ctx.stroke();
}

function schimbaContinut(resursa){
    
}