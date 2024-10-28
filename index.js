let cart = [];
let body = document.querySelector(".bag table tbody");
let price = 0;
let buttons = document.querySelectorAll(".subcontainerProducts .product button");
let account = document.querySelector(".bag .account");
let total = document.getElementById("price5");

function add() {
    let name = this.parentNode.querySelector("h3").textContent;
    let price1 = parseFloat(this.parentNode.querySelector("p").textContent); // Conversion directa a número
    let url = this.parentNode.querySelector(".image img").getAttribute("src");

    // Añade el producto al carrito
    cart.push({ name, price1, url });
    localStorage.setItem("articles", JSON.stringify(cart));
    account.textContent = cart.length;

    // Suma al price total
    price += price1;
    total.textContent = price.toFixed(2); // Muestra el total en el formato adecuado
    localStorage.setItem("price", price.toFixed(2));

    update();
}

function update() {
    body.innerHTML = "";

    cart.forEach((item, index) => {
        let fila = document.createElement("tr");

        let image = document.createElement("img");
        image.src = item.url;
        let imageTd = document.createElement("td");
        imageTd.appendChild(image);
        fila.appendChild(imageTd);

        fila.innerHTML += `
            <td>${item.name}</td>
            <td>${item.price1.toFixed(2)}</td>
            <td><a href="#" onclick="eliminate(${index});">X</a></td>
        `;

        body.appendChild(fila);
    });
}

function eliminate(index) {
    let item = cart[index];
    cart.splice(index, 1);

    price -= item.price1; // Resta el price eliminado del total
    total.textContent = price.toFixed(2);
    account.textContent = cart.length;

    localStorage.setItem("articles", JSON.stringify(cart));
    localStorage.setItem("price", price.toFixed(2));
    update();
}

window.addEventListener("load", loadi);

function loadi() {
    let itemlocal = localStorage.getItem("articles");
    let pricelocal = localStorage.getItem("price");

    if (itemlocal) {
        cart = JSON.parse(itemlocal);
        price = pricelocal ? parseFloat(pricelocal) : 0;
        total.textContent = price.toFixed(2);
        account.textContent = cart.length;
        update();
    }
}

function empty2() {
    body.innerHTML = "";
    account.textContent = "0";
    price = 0;
    cart = [];
    localStorage.removeItem("articles");
    localStorage.removeItem("price");
    total.textContent = "0.00";
}

buttons.forEach(btn => {
    btn.addEventListener("click", add);
});
