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

    // Change the quantity of one product and update total price for that product 
    shoppingCart.on("click", ".inputQuantity", (evt) => {
        let input = $(evt.target);
        let tr = input.closest("tr");
        let price = parseFloat(tr.find(".productPrice").text());

    });

    let totalSum = document.getElementById("totalSum");
    totalSum.textContent = totalProductsPrice + " $";


    // Delete a product from shopping cart and update total Products price
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
                <td class="productPrice">${product.price}</td>
                <td>
                    <input type="number" class="inputQuantity" value="${product.quantity}" min="1" max="5">
                </td>
                <td class="productTotal">${product.total}</td>                
                <td class="del">X</td>
            </tr>`;
}