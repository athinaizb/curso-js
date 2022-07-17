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
const productos = [];



const producto1 = new Producto("Brownie", "Brownie con nueces, cubierto por una capa de dulce de leche y una capa de merengue italiano", "2400");
const producto2 = new Producto("Rogel", "Capas de masa philo, rellenas de dulce de leche y cubierta de merengue italiano", "2000");
const producto3 = new Producto("Lime curd", "Base de brownie con una capa de mousse de chocolate con cereales y una cama de curd de limon", "2800");
const producto4 = new Producto("Lemon pie", "Base de tarta con relleno de curd de limon y merengue italiano", "2200");

// agrega los productos al array "productos" mediante el metodo push 
productos.push(producto1);
productos.push(producto2);
productos.push(producto3);
productos.push(producto4);

// se recorre el array de "productos" para poder listar la totalidad de los mismos haciendo uso de la funcion "mostrar" de la clase Producto 
function obtenerProductos() {
    let misProductos = "";
    for (const producto of productos) {
        misProductos = misProductos + producto.mostrar();
    }
    return misProductos;
}

// dentro del do while, vamos a mostrar los productos que tenemos 
// el usuario va a elegir cual quiere
// le vamos a preguntar cuantos quiere de lo que eligio
// hasta que el quiera salir
// le vamos a mostrar el valor total de su compra

let input = "";
let precio = 0;
let precioFinal = 0;
let precioConDescuento = 0;

do {
    input = prompt(obtenerProductos()).toLowerCase();
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
        case "lemon pie":
            precio = producto4.precio;
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

// en caso de que la compra supere los 4500 pesos, se le realizara un descuento del 10% al precio final
if (precioFinal >= 4500) {

    precioConDescuento = precioFinal * 0.9;
    alert("El total de tu compra era de " + precioFinal + "\n y con el descuento del 10% te queda en " + precioConDescuento);
} else {
    alert("El total de tu compra es de $" + precioFinal);

}




