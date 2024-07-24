const rowProducts = document.querySelector(".row-products");
fetch("https://api.mercadolibre.com/sites/MLB/search?q=notebooks")
.then(response => response.json())
.then(data => {
    data.results.forEach(product => {
        const col = document.createElement("div");
        col.classList = "col-4";
        col.innerHTML = `
        <div class = "card h-100">
        <img src="${product.thumbnail}" class="card-img-toop" alt="${product.title}">
        <div class="card-body">
<h2 class="card-title">${product.title}</h2>
<p class="card.text"><strong>${product.price.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})}</strong></p>


        </div>
        </div>
        `;
        const btn = document.createElement("a");
        btn.href = "#";
        btn.classList = "btn btn-primary";
        col.querySelector(".card-body").append(btn)
        btn.textContent = "Adicionar ao carrinho";
        rowProducts.append(col);
    })
})