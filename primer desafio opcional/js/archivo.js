let vecesSaludos = parseInt(prompt("ingrese cantidad de veces que quiere ser saludado"));
console.log(vecesSaludos);
if (isNaN(vecesSaludos)) {
    alert("no es un numero");
}
for (let i = 0; i < vecesSaludos; i++) {
    alert("hola!")
}

