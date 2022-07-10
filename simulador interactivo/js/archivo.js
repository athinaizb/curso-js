class Producto {
    constructor(nombre, descripcion, precio) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
    }
    mostrar() {
        return this.nombre + ":\n" + this.descripcion + " $" + this.precio + "\n";
    }
}


// esta funcion recibe el actual precio total, el precio del item seleccionado y la cantidad que quiere del mismo
// chequea que sea un numero y si es asi le agrega al precio final el producto calculado
function obtenerSubtotal(precioFinalActual, precio, cantidad) {
    if (isNaN(cantidad)) {
        alert("No ingresaste un numero");
    }
    else {
        precioFinalActual = precioFinalActual + (precio * cantidad);
    }
    return precioFinalActual;
}

const producto1 = new Producto("Brownie", "Brownie con nueces, cubierto por una capa de dulce de leche y una capa de merengue italiano", "2400");
const producto2 = new Producto("Rogel", "Capas de masa philo, rellenas de dulce de leche y cubierta de merengue italiano", "2000");
const producto3 = new Producto("Lime curd", "Base de brownie con una capa de mousse de chocolate con cereales y una cama de curd de limon", "2800");

const misProductos = producto1.mostrar() + producto2.mostrar() + producto3.mostrar();

// dentro del do while, vamos a mostrar los productos que tenemos 
// el usuario va a elegir cual quiere
// le vamos a preguntar cuantos quiere de lo que eligio
// hasta que el quiera salir
// le vamos a mostrar el valor total de su compra

let input = "";
let precio = 0;
let precioFinal = 0;

do {
    input = prompt(misProductos).toLowerCase();
    switch (input) {
        case "brownie":
            precio = producto1.precio;
            break;
        case "rogel":
            precio = producto2.precio;
            break;
        case "lime curd":
            precio = producto3.precio;
            break;
        default: precio = 0;
    }

    let cantidad = 0;
    if (precio == 0 && input != "salir") {
        alert("No se encontro ese producto");
    }
    else if (input != "salir") {
        cantidad = parseInt(prompt("Seleccionar cantidad"));
        precioFinal = obtenerSubtotal(precioFinal, precio, cantidad);
    }

} while (input !== "salir");

alert("El total de tu compra es de $" + precioFinal);

