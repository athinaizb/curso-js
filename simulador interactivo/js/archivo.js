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

function agregarProductos(producto) {

    let arrayCarritoJson = localStorage.getItem("carrito");
    let arrayCarrito = JSON.parse(arrayCarritoJson) || [];
    arrayCarrito.push(producto);
    arrayCarritoJson = JSON.stringify(arrayCarrito);
    localStorage.setItem("carrito", arrayCarritoJson);
    precioFinal = obtenerSubtotal();
    imprimirProductosSeleccionados();
}

let input = "";
let precio = 0;
let precioFinal = 0;
let precioConDescuento = false;
let productoSeleccionado;
let productosSeleccionados = [];


function dibujarProductos(productos) {
    productos.forEach(producto => {
        let card = document.createElement("div");
        card.classList.add('div-card');
        let nombre = document.createElement("h3");
        nombre.innerHTML = "<h3>" + producto.nombre + "</h3>";
        let valor = document.createElement("h3");
        valor.innerHTML = "<h3>" + producto.precio + "</h3>";
        let button = document.createElement("button");
        button.innerHTML = "agregar";
        button.onclick = function () {
            agregarProductos(producto);
        };

        card.append(nombre);
        card.append(valor);
        card.append(button);
        document.body.append(card);
    });
}

dibujarProductos(productos);
imprimirProductosSeleccionados();


function imprimirProductosSeleccionados() {
    //si ya existe lo elimina, buscandolo por id
    let elem = document.getElementById("Div1");
    elem?.parentNode.removeChild(elem);
    //
    let parrafoProductos = document.createElement("div");
    parrafoProductos.innerHTML = "<h2>Estos son los productos seleccionados</h2>";
    document.body.append(parrafoProductos);
    //le agrega el id
    parrafoProductos.setAttribute("id", "Div1")

    let lista = document.createElement("ol");
    document.body.append(lista);
    let carritoJson = localStorage.getItem("carrito");
    let carrito = JSON.parse(carritoJson);

    if (carrito) {
        carrito.forEach(producto => {
            let product = document.createElement("li");
            product.innerHTML = producto.nombre + " $" + producto.precio;
            parrafoProductos.append(product);
        });
        let buttonClear = document.createElement("button");
        buttonClear.innerHTML = "limpiar carrito";
        buttonClear.onclick = function () {
            localStorage.removeItem("carrito");
            imprimirProductosSeleccionados();
        };
        parrafoProductos.append(buttonClear);
    }

    precioFinal = obtenerSubtotal();
    let valorTotal = document.createElement("h3");
    valorTotal.innerHTML = "$" + precioFinal;
    parrafoProductos.append(valorTotal);
    calcularDescuento(parrafoProductos);

}

function calcularDescuento(parrafoProductos) {
    precioConDescuento = false;
    if (Number(precioFinal) && precioFinal >= 4500) {
        precioFinal = precioFinal * 0.9;
        precioConDescuento = true;
    }
    if (precioConDescuento) {
        let labelDescuento = document.createElement("h4");
        labelDescuento.innerHTML = "El valor final tiene un 10% de descuento ya que superó los $4500";
        parrafoProductos.append(labelDescuento);
    }
}
