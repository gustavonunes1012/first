// Seleciona o contêiner onde os produtos serão exibidos
const rowProducts = document.querySelector(".row-products");

// Busca os dados da API do Mercado Livre para notebooks
fetch("https://api.mercadolibre.com/sites/MLB/search?q=notebooks")
    .then(response => response.json()) // Converte a resposta em JSON
    .then(data => {
        // Limita a quantidade de produtos a 12
        const limitedResults = data.results.slice(0, 12);
        
        // Itera sobre os resultados limitados
        limitedResults.forEach(product => {
            // Cria um elemento de coluna para cada produto
            const col = document.createElement("div");
            col.classList = "col-4";
            col.innerHTML = `
            <div class="card h-100">
                <img src="${product.thumbnail}" class="card-img-top" alt="${product.title}">
                <div class="card-body">
                    <h2 class="card-title">${product.title}</h2>
                    <p class="card-text"><strong>${product.price.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})}</strong></p>
                </div>
            </div>
            `;

            // Cria o botão "Adicionar ao carrinho"
            const btn = document.createElement("a");
            btn.href = "#";
            btn.classList = "btn btn-primary";
            col.querySelector(".card-body").append(btn);
            btn.textContent = "Adicionar ao carrinho";
            btn.addEventListener("click", e => {
                e.preventDefault();
                addToCart(product.id, {
                    title: product.title,
                    price: product.price
                });
                alert("Produto adicionado ao carrinho");
            });

            // Adiciona a coluna ao contêiner de produtos
            rowProducts.append(col);
        });
    });

// Função para adicionar produtos ao carrinho no localStorage
function addToCart(id, product) {
    let cart = JSON.parse(localStorage.getItem("cart")); // Obtém o carrinho do localStorage
    if (cart === null) cart = {}; // Inicializa o carrinho se estiver vazio
    if (cart[id] == undefined) { // Verifica se o produto já está no carrinho
        cart[id] = product; // Adiciona o produto ao carrinho
        localStorage.setItem("cart", JSON.stringify(cart)); // Salva o carrinho atualizado no localStorage
    }
}
