function displayCartItens() {
    const cart = JSON.parse(localStorage.getItem("cart"));
    document.querySelector(".cart-table tbody") .innerHTML = "";
    let total = 0;
if (cart !== null) {
    for(id in cart){
        const product = cart[id];
        const tr = document.createElement ("tr");
        tr.innerHTML = `
        <td>${product.title}</td>
        <td>${product.price.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})}</td>
        `;
        total += product.price;
        const td = document.createElement("td");
        const btn = document.createElement("button");
        btn.classList = "btn btn-danger btn-sm btm-remove";
        btn.textContent = "Remover do carrinho";
        btn.addEventListener("click", e => {
            e.preventDefault();
            removeFromCart(id);
        })
        td.append(btn);
        tr.append(td);
        document.querySelector(".cart-table tbody") .append(tr);
    };
        } 
        showOrderSummary(total);
}
    function showOrderSummary(total) {
        const orderSummary = document.querySelector(".order-summary");
        orderSummary.innerHTML = "";
        if (total > 0) {
            orderSummary.innerHTML = `
            <div class="card">
<div class="card-body">
<h2 class="title">Resumo do pedido</h2>
<p class="card-text"><strong>Total: ${total.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})}</strong></p>
</div>
            </div>
        
            `;
            const btn = document.createElement("a");
            btn.href = "#";
            btn.classList = "btn btn-primary";
            btn.textContent = "Finalizar pedido";
            btn.addEventListener("click", e => {
                e.preventDefault();
                checkout();
            });
            orderSummary.querySelector(".card-body").append(btn);
        }
    }
    function checkout() {
        localStorage.clear();
        alert("Ta gastando bem! compre mais.");
        displayCartItens();
    }
    function removeFromCart(id) {
        const cart = JSON.parse(localStorage.getItem("cart"));
        delete cart[id];
        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Produto removido com sucesso");
        displayCartItens();
    }
displayCartItens();