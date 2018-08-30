$(document).ready(() => {
    shoppingCart = $('.cart .table tbody');

    if(localStorage.cart) {
        cart = JSON.parse(localStorage.getItem('cart'))
    } else {
        shoppingCart
            .text("Shopping Cart is empty")
            .css('font-size', '30px');
    }

    for(product of cart.products) {
        shoppingCart.append(addToCart(product));
    }
    shoppingCart.on("click", ".del", evt => {
        let delButton = $(evt.target);
        tr = delButton.closest("tr");
        tr.hide();
        fid = tr.data("fid");
        cart.products = cart.products.filter(
            product => +product.fid !== fid 
        );
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