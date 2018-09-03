$(document).ready(() => {
    shoppingCart = $('.cart .table tbody');

    if(localStorage.cart) {
        cart = JSON.parse(localStorage.getItem('cart'))
    } else {
        shoppingCart
            .text("Shopping Cart is empty")
            .css('font-size', '30px');
    }

    var totalProductsPrice = 0;

    for (product of cart.products) {
        shoppingCart.append(addToCart(product));
        totalProductsPrice += product.total;
    }

    // cartContainer = document.getElementById("cartContainer");
    // tr = cartContainer.getElementsBytagNames("tr");
    productTotal = document.getElementById("productTotal");
    inputQ = document.getElementById("inputQuantity");

    inputQ.addEventListener("change", function(input) {
        let productPrice = parseFloat(document.getElementById("productPrice").textContent);
        inputQ.setAttribute("value", input.value);
        quantity = inputQ.value;
        let totalProductPrice = productPrice * quantity;
        productTotal.textContent = totalProductPrice;
    });



    let totalSum = document.getElementById("totalSum");
    totalSum.textContent = totalProductsPrice + " $";

    shoppingCart.on("click", ".del", evt => {
        let delButton = $(evt.target);
        tr = delButton.closest("tr");
        tr.hide();
        fid = tr.data("fid");
        cart.products = cart.products.filter(
            product => +product.fid !== fid 
        );
        let totalProductsPrice = 0;
        for(product of cart.products) {
            totalProductsPrice += product.total;
        }
        totalSum.textContent = totalProductsPrice + " $";
        localStorage.setItem('cart', JSON.stringify(cart));
    });
});



function addToCart(product) {
    return `<tr data-fid="${product.fid}">
                <th scope="row">
                <img src="${product.img}">
                </th>
                <td>${product.name}</td>
                <td>${product.availability}</td>
                <td>${product.color}</td>
                <td id="productPrice">${product.price}</td>
                <td>
                    <input type="number" id="inputQuantity" value="${product.quantity}" min="1" max="5">
                </td>
                <td id="productTotal">${product.total}</td>                
                <td class="del">X</td>
            </tr>`;
}