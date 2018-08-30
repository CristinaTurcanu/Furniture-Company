$(document).ready(() => {
    wishlistContainer = $('.wishlist .table tbody');

    if(localStorage.wishlist) {
        wishlist = JSON.parse(localStorage.getItem('wishlist'))
    } else {
        wishlistContainer
            .text("Wishlist is empty")
            .css('font-size', '30px');
    }

    for (product of wishlist.products) {
        wishlistContainer.append(addToWishlist(product))
    }

    wishlistContainer.on("click", ".del", evt => {
        let delButton = $(evt.target);
        tr = delButton.closest("tr");
        tr.hide();
        cid = tr.data("cid");
        fid = tr.data("fid");
    });
});

function addToWishlist(product) {
    return `<tr data-fid="${product.fid}" data-cid="${product.cid}">
                <th scope="row">
                <img src="${product.img}">
                </th>
                <td>${product.name}</td>
                <td>${product.availability}</td>
                <td>${product.price}</td>
                <td class="add">Add</td>
                <td class="del">X</td>
            </tr>`;
}
