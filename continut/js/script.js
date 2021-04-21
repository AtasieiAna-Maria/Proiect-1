function laIncarcare() {
    getTimer();
    getURL();
    getLocation();
    getBrawserNameAndVersion();
    getSO();
    drawCanvas();
}

var varTime = setInterval(getTimer, 1000);

function getTimer() {
    document.getElementById("data").innerHTML = "Time: " + new Date();
}

function getURL() {
    document.getElementById("url").innerHTML = "Adresa URL: " + window.location;
}

function getLocation() {
    navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
    document.getElementById("location").innerHTML = "Locatia curenta: --- Latitude: " + position.coords.latitude + " --- Longitude: " + position.coords.longitude;
}

function getBrawserNameAndVersion() {
    document.getElementById("browser").innerHTML = "Nume browser: " + navigator.appName + " --- Versiune browser: " + navigator.appVersion;
}

function getSO() {
    document.getElementById("so").innerHTML = "Sistemul de operare: " + navigator.platform;
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

    document.getElementById("winners").innerHTML = "Numerele câștigătoare sunt: " + stringFormated;

    let noOfWinners = verificareNumere(elements)
    if (0 !== noOfWinners) {
        document.getElementById("guessed").innerHTML = "Ai ghicit " + noOfWinners + " numere.";
    }
    else {
        document.getElementById("guessed").innerHTML = "Nu ai ghicit niciun numar.";
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

var p = null;

function draw(event) {
    if (p == null) {
        p = { x:event.offsetX,
              y:event.offsetY };
    }
    else {
        let ctx = document.getElementById("drawingCanvas").getContext("2d");

        let conturColor = document.getElementById("contur");
        let umplereColor = document.getElementById("umplere");

        ctx.fillStyle = umplereColor.value;
        ctx.fillRect(Math.min(p.x, event.offsetX), Math.min(p.y, event.offsetY), Math.abs(p.x - event.offsetX), Math.abs(p.y - event.offsetY));

        ctx.strokeStyle = conturColor.value;
        ctx.strokeRect(Math.min(p.x, event.offsetX), Math.min(p.y, event.offsetY), Math.abs(p.x - event.offsetX), Math.abs(p.y - event.offsetY));
        
        p = null;
    }
}


function schimbaContinut(resursa, jsFisier, jsFunctie) {
    let formatInput = resursa + '.html';
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        document.getElementById("continut").innerHTML = this.responseText;
        if (jsFisier) {
            var elementScript = document.createElement('script');
            elementScript.onload = function () {
                if (jsFunctie) {
                    window[jsFunctie]();
                }
            };
            elementScript.src = jsFisier;
            document.head.appendChild(elementScript);
        }
        else {
            if (jsFunctie) {
                window[jsFunctie]();
            }
        }
    }
  };

  modifyNavBarFocus(resursa);

  xhttp.open("GET", formatInput, true);
  xhttp.send();
}

function modifyNavBarFocus(resursa){
    document.getElementById('acasa').classList.remove("active");
    document.getElementById('inregistreaza').classList.remove("active");
    document.getElementById('video').classList.remove("active");
    document.getElementById('despre_html').classList.remove("active");
    document.getElementById('desen').classList.remove("active");
    document.getElementById('invat_js').classList.remove("active");
    document.getElementById('persoane').classList.remove("active");
    document.getElementById('verifica').classList.remove("active");
    document.getElementById('cumparaturi').classList.remove("active");
    document.getElementById(resursa).classList.add("active");
}

function verifica() {
    let http=new XMLHttpRequest();
    http.open("GET","http://localhost:5678/resurse/utilizatori.json");
    http.send();
    http.onreadystatechange=(e)=>{
      let login=document.getElementById("login").value;
      let password=document.getElementById("password").value;
      let users=JSON.parse(http.responseText);
      for(let i=0;i<users.length;++i){
        if(users[i].utilizator==login && users[i].parola==password){
          alert("Good credentials!");
          return;
        }
      }
      alert("Wrong credentials!")
  }
}