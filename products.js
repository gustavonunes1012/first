const rowProducts = document.querySelector(".row-products");

fetch("https://api.mercadolibre.com/sites/MLB/search?q=notebooks&limit=13")
    .then(response => response.json())
    .then(data => {
        const limitedResults = data.results.slice(0, 12);

        limitedResults.forEach(product => {
            const col = document.createElement("div");
            col.classList = "col-4";
            col.innerHTML = `
                <div class="card h-100">
                    <img src="${product.thumbnail}" class="card-img-top" alt="${product.title}">
                    <div class="card-body">
                        <h2 class="card-title">${product.title}</h2>
                        <p class="card-text"><strong>${product.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</strong></p>
                        <a href="#" class="btn btn-primary">Adicionar ao carrinho</a>
                    </div>
                </div>
            `;

            const btn = col.querySelector(".btn");
            btn.addEventListener("click", e => {
                e.preventDefault();
                addToCart(product.id, {
                    title: product.title,
                    price: product.price
                });
                alert("Produto adicionado ao carrinho");
            });

            rowProducts.append(col);
        });
    });

function addToCart(id, product) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (cart === null) cart = {};
    if (cart[id] === undefined) {
        cart[id] = product;
        localStorage.setItem("cart", JSON.stringify(cart));
    }
}
