$(document).ready(() => {
    shoppingCart = $('.cart .table tbody');

    if(localStorage.cart) {
        cart = JSON.parse(localStorage.getItem('cart'))
    } else {
        shoppingCart
            .text("Shopping Cart is empty")
            .css('font-size', '30px');
    }








});

function addToCart(product) {
    return `<tr data-fid="" data-cid="">
                <th scope="row">
                <img src="">
                </th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>                
                <td class="del">X</td>
            </tr>`;
}