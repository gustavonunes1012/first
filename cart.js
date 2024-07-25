function displayCartItens() {
    const cart = JSON.parse(localStorage.getItem("cart"));
if (cart !== null) {
    for(id in cart){
        const product = cart[id];
        const tr = document.createElement ("tr");
        tr.innerHTML = `
        <td>${product.title}</td>
        <td>${product.price.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})}</td>
        `;
        const td = document.createElement("td");
        const btn = document.createElement("button");
        btn.classList = "btn btn-danger btn-sm btm-remove";
        btn.textContent = "Remover do carrinho";
        td.append(btn);
        tr.append(td);
        document.querySelector(".cart-table tbody") .append(tr);
    };
        } 
}
    
displayCartItens();