
const productos = ["Leche", "Yogurt", "Fideos", "Atun", "Choclo enlatado", "Prepizzas", "Pan lactal", "Aceite", "Pure de tomate", "Mayonesa", "ketchup", "Mostaza","Café","Yerba","Harina"];
const precios = [1200, 1700, 660, 1800, 890, 1000, 2500, 2030, 600, 1400, 1200, 900, 4200, 2500, 1800];
const stock = [25, 20, 18, 14, 14, 8, 17, 9, 10, 10, 15, 20, 15, 17, 20];
const imagenes = ["./static/leche.jpeg", "./static/yogurt.jpeg", "./static/fideos.jpeg", "./static/atun.jpeg","./static/choclo.jpeg", "./static/prepizza.jpeg", "./static/pan_lactal.jpeg", "./static/aceite.jpeg","./static/pure_de_tomate.jpeg", "./static/mayonesa.jpeg", "./static/ketchup.jpeg", "./static/mostaza.jpeg","./static/cafe2.jpeg", "./static/yerba.jpeg", "./static/harina.jpeg"];

let listaProductos = document.getElementById("lista_productos");


function agregarProductoLista(index) {
    let cantidadInput = document.getElementById(`cantidad_${index}`);
    let cantidad = parseInt(cantidadInput.value);

    if (isNaN(cantidad) || cantidad <= 0 || cantidad > stock[index]) {
        if (cantidad > stock[index]) {
            alert("Cantidad de productos inválida.");
        } else {
            alert("Cantidad de productos inválida.");
        }
        return;
    }

    let precioUnitario = precios[index];

    let precioTotal = precioUnitario * cantidad;

    let miLista = document.getElementById("lista_mi_lista");
    let li = document.createElement("li");
    li.id = `mi_lista_${index}`; 
    li.innerHTML = `
        <h5 class="nombreProducto">${productos[index]}</h5>
        <p>Precio Unitario: ${precioUnitario} - Cantidad: ${cantidad} - Precio Total: $${precioTotal}</p>
        <button class="btn" onclick="eliminarProductoLista(${index})">Eliminar de mi lista</button>
    `;
    miLista.appendChild(li);
   }

  function eliminarProductoLista(index) {
        let producto = document.getElementById(`mi_lista_${index}`);
        if (producto) {
         producto.remove();
        }
    }    

function obtenerProductos(productos, precios, imagenes, stock) {
    for (let i = 0; i < productos.length; i++) {
        let li = document.createElement("li");
        li.className += ("producto");
        li.innerHTML = 
            `<h5 class="nombreProducto">${productos[i]}</h5>
            <img class="fotoProducto" src="${imagenes[i]}" alt="${productos[i]}">
            <p>Precio: ${precios[i]} - Stock: ${stock[i]}</p>
            <input type="number" id="cantidad_${i}" placeholder="Cantidad" min="1" max="${stock[i]}">
            <button class="btn" onclick="agregarProductoLista(${i})">Agregar a mi lista</button>`;
        listaProductos.appendChild(li);
    }
}

obtenerProductos(productos, precios, imagenes, stock);

let totalCompra = document.getElementsByClassName("contenedorCompra")[0];
let btnCompra = document.getElementById("compra");
btnCompra.addEventListener("click", compraFinalizada);

function compraFinalizada() {
    let total = totalDeCompra();
    alert(`El total gastado fue $${total}`);
    window.location.href = "./finalizarCompra.html";
}

function totalDeCompra() {
    let miLista = document.getElementById("lista_mi_lista").getElementsByTagName("li");
    let total = 0;
    for (let i = 0; i < miLista.length; i++) {
        let precioTexto = miLista[i].getElementsByTagName("p")[0].textContent;
        let precioTotal = parseFloat(precioTexto.match(/Precio Total: \$([0-9]+)/)[1]);
        total += precioTotal;
    }
    return total;
}
