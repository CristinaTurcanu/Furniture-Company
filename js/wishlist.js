
// wishlistContainer = document.getElementById("wishlistContainer");
//  if(localStorage.wishlist) {
//      wishlist = JSON.parse(localStorage.getItem("wishlist"));
//  } else {
//      wishlistContainer.textContent = "Wishlist is empty!";
//  }
//  for(product of wishlist.products) {
//      wishlistContainer.appendChild(addToWishlist());
//  }
//  delBtn = document.getElementsByClassName("del");
//  delBtn.addEventListener("click", deleteProduct, false);

// function deleteProduct (event) {
//     let del = event.target;
//     tr = del.closest("tr");
//     fid = tr.getAttribute("data-fid");
//     wishlist.products = wishlist.products.filter(
//         product => +product.fid !== fid 
//     );
//     localStorage.setItem('wishlist', JSON.stringify(wishlist));
// }

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
        wishlistContainer.append(addToWishlist(product));
    }   

    // Add product from wishlist to shopping cart
    wishlistContainer.on("click", ".add", evt => {
        let addBtn = $(evt.target);
        addBtn.text("Added");

        cart = JSON.parse(localStorage.getItem('cart'));
        let addToCart = true;
        for( prod of cart.products) {
          if(prod.fid == product.fid) {
            addToCart = false;
            prod.quantity += product.quantity;
          }
        }
        if(addToCart) {
          cart.products.push(product);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
    });

    // Delete a product from wishlist
    wishlistContainer.on("click", ".del", evt => {
        let delButton = $(evt.target);
        tr = delButton.closest("tr");
        tr.hide();
        cid = tr.data("cid");
        fid = tr.data("fid");
        wishlist.products = wishlist.products.filter(
            product => +product.fid !== fid 
        );
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    });
    
});

function addToWishlist(product) {
    return `<tr data-fid="${product.fid}" data-cid="${product.cid}">
                <th scope="row">
                <img src="${product.img}">
                </th>
                <td>${product.name}</td>
                <td hidden>${product.color}</td>
                <td>${product.availability}</td>
                <td>${product.price}</td>
                <td class="add">Add</td>
                <td class="del">X</td>
            </tr>`;
}
