class Producto {
    constructor(nombre, descripcion, precio, foto) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.foto = foto;
    }
    mostrar() {
        return this.nombre + ":\n" + this.descripcion + " $" + this.precio + "\n";
    }
}

function obtenerSubtotal() {
    let precioSubtotal = 0;
    let carritoJson = localStorage.getItem("carrito");
    let array = JSON.parse(carritoJson) ?? [];
    array.forEach(producto => {
        precioSubtotal = precioSubtotal + Number(producto.precio);
    });
    return precioSubtotal;
}
const productos = [];


const pedirApi = async () => {
    //se llama al archivo Json para consumir su info
    const resp = await fetch("./tortas.json")
    const data = await resp.json()

    data.forEach(producto => {
        const nuevoProducto = new Producto(producto.nombre, producto.descripcion, producto.precio, producto.foto);
        productos.push(nuevoProducto);

    });
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


async function dibujarProductos(productos) {
    await pedirApi();
    let contenedor = document.createElement("div");
    contenedor.classList.add('contenedor-productos');
    productos.forEach(producto => {
        let card = document.createElement("div");
        card.classList.add('div-card');
        let nombre = document.createElement("h3");
        nombre.innerHTML = producto.nombre;
        nombre.classList.add("nombre-tortas");
        let valor = document.createElement("h3");
        valor.innerHTML = "$" + producto.precio;
        valor.classList.add("precio-tortas");
        let button = document.createElement("button");
        button.innerHTML = "agregar";
        button.classList.add("boton");
        button.onclick = function () {
            agregarProductos(producto);
            Toastify({
                text: "Se agrego correctamente al carrito",
                className: "info",
                position: 'center',
                gravity: 'bottom',
                style: {
                    background: "green",
                }
            }).showToast();
        };
        let imagen = document.createElement("img");
        imagen.classList.add("img-tortas");
        imagen.setAttribute('src', producto.foto);
        imagen.setAttribute('height', 220);
        imagen.setAttribute('width', 220);

        card.append(imagen);
        card.append(nombre);
        card.append(valor);
        card.append(button);

        contenedor.append(card);
    });
    document.body.append(contenedor);
}

async function run() {
    await dibujarProductos(productos);
    imprimirProductosSeleccionados();
    imprimirSelect();
    imprimirFooter();
}

function imprimirSelect() {
    var selectList = document.createElement("select");
    selectList.id = "envios";
    selectList.name = "envios";
    var option = document.createElement("option");
    option.value = "retiro";
    option.text = "Retiro por el local";
    var option2 = document.createElement("option");
    option2.value = "delivery";
    option2.text = "Delivery dentro de CABA";
    selectList.appendChild(option);
    selectList.appendChild(option2);
    selectList.onchange = cambioEnvios;
    document.body.append(selectList);
}



function imprimirProductosSeleccionados() {
    //si ya existe lo elimina, buscandolo por id
    let elem = document.getElementById("Div1");
    elem?.parentNode.removeChild(elem);
    //
    let parrafoProductos = document.createElement("div");
    parrafoProductos.innerHTML = "<h3>Estos son los productos seleccionados:</h3>";
    parrafoProductos.classList.add("parrafo-productos");
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
            Toastify({
                text: "Se limpio el carrito",
                className: "info",
                position: 'center',
                gravity: 'bottom',
                style: {
                    background: "red",
                }
            }).showToast();

        };
        parrafoProductos.append(buttonClear);
        imprimirFooter();
    }

    precioFinal = obtenerSubtotal();
    calcularDescuento(parrafoProductos);
    let valorTotal = document.createElement("h3");
    valorTotal.innerHTML = "$" + precioFinal;
    parrafoProductos.append(valorTotal);

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

function imprimirFooter() {
    let elem = document.getElementById("footer");
    elem?.parentNode.removeChild(elem);

    let footer = document.createElement("div");
    footer.innerHTML = "© Copyright - Athina pastelería - 2022";
    footer.classList.add('footer');
    footer.id = 'footer';
    document.body.append(footer);
}

function cambioEnvios() {
     let info = document.getElementById("metodo-envio");
    if(!info){
        info = document.createElement("h3");
        info.id = "metodo-envio";
    }
    var valorSelect = document.getElementById("envios");
    valorSelect.value == "retiro" ? info.innerHTML = "El punto de retiro es Larrea 743, de 9hs a 18hs" : info.innerHTML = "El delivery es a coordinar. El costo dentro de CABA es de $600";
    document.body.append(info);
    imprimirFooter();
}
run();