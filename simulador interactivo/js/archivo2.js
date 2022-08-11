var valorSelect = document.getElementById("envios");


let info = document.createElement("h3");

function cambioEnvios() {
    valorSelect.value == "retiro" ? info.innerHTML = "El punto de retiro es Larrea 743, de 9hs a 18hs" : info.innerHTML = "El delivery es a coordinar. El costo dentro de CABA es de $600";
    document.body.append(info);
}