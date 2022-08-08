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

function obtenerSubtotal() {
    let precioSubtotal = 0;
    let carritoJson = localStorage.getItem("carrito");
    let array = JSON.parse(carritoJson);
    array.forEach(producto => {
        precioSubtotal = precioSubtotal + Number(producto.precio);
    });
    return precioSubtotal;

}
const productos = [];
localStorage.removeItem("carrito");


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


function agregarProductos(producto, cantidad) {

    let arrayCarritoJson = localStorage.getItem("carrito");
    let arrayCarrito = JSON.parse(arrayCarritoJson) || [];

    for (let i = 0; i < cantidad; i++) {
        arrayCarrito.push(producto);
    }

    arrayCarritoJson = JSON.stringify(arrayCarrito);
    localStorage.setItem("carrito", arrayCarritoJson);

}

// dentro del do while, vamos a mostrar los productos que tenemos 
// el usuario va a elegir cual quiere
// le vamos a preguntar cuantos quiere de lo que eligio
// hasta que el quiera salir
// le vamos a mostrar el valor total de su compra

let input = "";
let precio = 0;
let precioFinal = 0;
let precioConDescuento = false;
let productoSeleccionado;
let productosSeleccionados = [];

do {
    input = prompt(obtenerProductos()).toLowerCase();
    switch (input) {
        case "brownie":
            precio = producto1.precio;
            productoSeleccionado = producto1;
            break;
        case "rogel":
            precio = producto2.precio;
            productoSeleccionado = producto2;
            break;
        case "lime curd":
            precio = producto3.precio;
            productoSeleccionado = producto3;
            break;
        case "lemon pie":
            precio = producto4.precio;
            productoSeleccionado = producto4;
            break;
        default: precio = 0;
    }

    let cantidad = 0;
    if (precio == 0 && input != "salir") {
        alert("No se encontro ese producto");
    }
    else if (input != "salir") {
        cantidad = parseInt(prompt("Seleccionar cantidad"));
        if (isNaN(cantidad)) {
            alert("No ingresaste un numero");
        }
        else {
            agregarProductos(productoSeleccionado, cantidad);
            precioFinal = obtenerSubtotal();
        }

    }

} while (input !== "salir");

// en caso de que la compra supere los 4500 pesos, se le realizara un descuento del 10% al precio final
if (precioFinal >= 4500) {
    precioFinal = precioFinal * 0.9;
    precioConDescuento = true;
}


let parrafoProductos = document.createElement("div");
parrafoProductos.innerHTML = "<h2>Estos son los productos seleccionados</h2>";
document.body.append(parrafoProductos);
// document.body.append(productosSeleccionados[0].nombre);

let lista = document.createElement("ol");
document.body.append(lista);
let carritoJson = localStorage.getItem("carrito");
let carrito = JSON.parse(carritoJson);
carrito.forEach(producto => {
    let product = document.createElement("li");
    product.innerHTML = producto.nombre + " $" + producto.precio;
    document.body.append(product);
});


let valorTotal = document.createElement("h3");
valorTotal.innerHTML = "$" + precioFinal;
document.body.append(valorTotal);


if (precioConDescuento) {
    let labelDescuento = document.createElement("h4");
    labelDescuento.innerHTML = "El valor final tiene un 10% de descuento ya que superó los $4500";
    document.body.append(labelDescuento);
}



