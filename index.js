let carrito = [];
let cuerpo = document.querySelector(".bolsa table tbody");
let precio = 0;
let botones = document.querySelectorAll(".productos .producto button");
let cuenta = document.querySelector(".bolsa .cuenta");
let total = document.getElementById("precio5");

function anadir() {
    let name = this.parentNode.querySelector("h3").textContent;
    let price = parseFloat(this.parentNode.querySelector("p").textContent); // Conversion directa a número
    let url = this.parentNode.querySelector(".imagen img").getAttribute("src");

    // Añade el producto al carrito
    carrito.push({ name, price, url });
    localStorage.setItem("articulos", JSON.stringify(carrito));
    cuenta.textContent = carrito.length;

    // Suma al precio total
    precio += price;
    total.textContent = precio.toFixed(2); // Muestra el total en el formato adecuado
    localStorage.setItem("precio", precio.toFixed(2));

    actualizar();
}

function actualizar() {
    cuerpo.innerHTML = "";

    carrito.forEach((item, index) => {
        let fila = document.createElement("tr");

        let imagen = document.createElement("img");
        imagen.src = item.url;
        let imagenTd = document.createElement("td");
        imagenTd.appendChild(imagen);
        fila.appendChild(imagenTd);

        fila.innerHTML += `
            <td>${item.name}</td>
            <td>${item.price.toFixed(2)}</td>
            <td><a href="#" onclick="eliminar(${index});">X</a></td>
        `;

        cuerpo.appendChild(fila);
    });
}

function eliminar(index) {
    let item = carrito[index];
    carrito.splice(index, 1);

    precio -= item.price; // Resta el precio eliminado del total
    total.textContent = precio.toFixed(2);
    cuenta.textContent = carrito.length;

    localStorage.setItem("articulos", JSON.stringify(carrito));
    localStorage.setItem("precio", precio.toFixed(2));
    actualizar();
}

window.addEventListener("load", cargar);

function cargar() {
    let itemlocal = localStorage.getItem("articulos");
    let preciolocal = localStorage.getItem("precio");

    if (itemlocal) {
        carrito = JSON.parse(itemlocal);
        precio = preciolocal ? parseFloat(preciolocal) : 0;
        total.textContent = precio.toFixed(2);
        cuenta.textContent = carrito.length;
        actualizar();
    }
}

function vaciar2() {
    cuerpo.innerHTML = "";
    cuenta.textContent = "0";
    precio = 0;
    carrito = [];
    localStorage.removeItem("articulos");
    localStorage.removeItem("precio");
    total.textContent = "0.00";
}

botones.forEach(btn => {
    btn.addEventListener("click", anadir);
});
