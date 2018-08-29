$(document).ready(() => {
    wishlistContainer = $('.wishlist .table tbody');

    if(localStorage.wishlist) {
        wishlist = JSON.parse(localStorage.getItem('wishlist'))
    } else {
        wishlistContainer
            .text("Wishlist is empty")
            .css('font-size', '30px');
    }

    for(product of wishlist.products) {
        wishlistContainer.append(addWish())
    }
});

function addWish() {
    return `<tr>
                <th scope="row">
                <img src="${product.img}">
                </th>
                <td>${product.name}</td>
                <td>${product.availability}</td>
                <td>${product.price}</td>
                <td>${product.quantity}</td>
                <td>${product.total}</td>
                <td class="add">Add</td>
                <td class="del">X</td>
            </tr>`;
}