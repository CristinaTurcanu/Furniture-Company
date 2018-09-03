$(document).ready(() => {
    shoppingCart = $('.cart .table tbody');

    if(localStorage.cart) {
        cart = JSON.parse(localStorage.getItem('cart'))
    } else {
        shoppingCart
            .text("Shopping Cart is empty")
            .css('font-size', '30px');
    }

    var totalPrice = 0;
    for(product of cart.products) {
        shoppingCart.append(addToCart(product));
        totalPrice += product.total;
    }
    let totalSum = document.getElementById("totalSum");
    totalSum.textContent = totalPrice + " $";

    shoppingCart.on("click", ".del", evt => {
        let delButton = $(evt.target);
        tr = delButton.closest("tr");
        tr.hide();
        fid = tr.data("fid");
        cart.products = cart.products.filter(
            product => +product.fid !== fid 
        );
        // for(product of cart.products) {
        //     totalPrice += product.total;
        //     totalSum.textContent = totalPrice + " $";
        // }

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
                <td>${product.price}</td>
                <td>${product.quantity}</td>
                <td>${product.total}</td>                
                <td class="del">X</td>
            </tr>`;
}