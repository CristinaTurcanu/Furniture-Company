shoppingCart = document.getElementById("cartContainer");
let cart = {"products": []};

if(localStorage.cart) {
    cart = JSON.parse(localStorage.getItem("cart"))
} else {
    shoppingCart.texContent = "Shopping Cart is empty"
}
let totalProductsPrice = 0;
for(product of cart.products){
    shoppingCart.innerHTML += addToCart(product);
    totalProductsPrice += product.total;
}
let totalSum = document.getElementById("totalSum");
totalSum.textContent = totalProductsPrice + " $";

// Event to change quantity and update total price
let inputQ = shoppingCart.getElementsByClassName("inputQuantity");
for (var q = 0; q < inputQ.length; q++) {
    inputQ[q].addEventListener("click", changeQuantity, false);
}
function changeQuantity() {
    let input = event.target;
    let tr = input.parentNode.parentNode;
    let price = tr.getElementsByClassName("productPrice");
    let productTotal = tr.getElementsByClassName("productTotal");
    for (var p = 0; p < price.length; p++){
        p = price[p].textContent;
        for (var t = 0; t < productTotal.length; t++){
            productTotal[t].textContent = p * input.value;
            t = parseFloat(productTotal[t].textContent);
        }
    }

    let totalProductsPrice = 0;
    for (prod of cart.products) {
        if (prod.fid == tr.dataset.fid) {
            prod.quantity = input.value;
            prod.total = prod.price * prod.quantity;
        }
        totalProductsPrice += parseFloat(prod.total);
        }
        totalSum.textContent = totalProductsPrice + " $";
        localStorage.setItem("cart", JSON.stringify(cart));
}
// ----------------------------------------------------------------

// Event to delete product from cart and localStorage
let delBtns = shoppingCart.getElementsByClassName("del");
for (var i = 0; i < delBtns.length; i++) {
    delBtns[i].addEventListener("click", deleteProduct, false);
}
function deleteProduct() {
    let delButton = event.target;
    let tr = delButton.parentNode;
    let fid = tr.dataset.fid;

    cart.products = cart.products.filter(
        product => product.fid != fid 
    );
    let totalProductsPrice = 0;
    for(product of cart.products) {
        totalProductsPrice += product.total;
    }
    totalSum.textContent = totalProductsPrice + " $";
    localStorage.setItem('cart', JSON.stringify(cart));
    tr.style.display = "none";
}
// --------------------------------------------------------------

function addToCart(product) {
    return `<tr data-fid="${product.fid}">
                <th scope="row">
                <img src="${product.img}">
                </th>
                <td>${product.name}</td>
                <td>${product.availability}</td>
                <td>${product.color}</td>
                <td class="productPrice">${product.price}</td>
                <td>
                    <input type="number" class="inputQuantity" value="${product.quantity}" min="1" max="5">
                </td>
                <td class="productTotal">${product.total}</td>                
                <td class="del">X</td>
            </tr>`;
}
