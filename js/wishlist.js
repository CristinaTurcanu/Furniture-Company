
let wishlistContainer = document.getElementById("wishlistContainer");
let wishlist = {"products": []};
let cart = {"products": []};

if(localStorage.wishlist) {
    wishlist = JSON.parse(localStorage.getItem("wishlist"));
} else {
    wishlistContainer.textContent = "Wishlist is empty!";
}
for(product of wishlist.products) {
    wishlistContainer.innerHTML += addToWishlist(product);
}

let delBtns = wishlistContainer.getElementsByClassName("del");
for (var i = 0; i < delBtns.length; i++) {
    delBtns[i].addEventListener("click", deleteProduct, false);
}

let addBtns = wishlistContainer.getElementsByClassName("add");
for (var i = 0; i < addBtns.length; i++) {
    addBtns[i].addEventListener("click", addProduct, false);
}

function deleteProduct() {
    let delBtn = event.target;
    let tr = delBtn.parentNode;
    let fid = tr.dataset.fid;

    wishlist.products = wishlist.products.filter(
        product => product.fid != fid
    );
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    tr.style.display = "none";
}
function addProduct() {
    let addBtn = event.target;
    addBtn.textContent = "Added";
    console.log(addBtn);

    if(localStorage.cart) {
        cart = JSON.parse(localStorage.getItem('cart'));
    } else {
        cart = {"products": []};
    }

    let addToCart = true;
    for (prod of cart.products) {
        if (prod.fid == product.fid) {
            addToCart = false;
            prod.quantity += product.quantity;
        }
    }
    if (addToCart) {
        cart.products.push(product);
        product.quantity = 1;
        product.total = parseFloat(product.price * product.quantity);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
}

// $(document).ready(() => {
//     wishlistContainer = $('.wishlist .table tbody');
//     let wishlist = { "products": [] };
//     if (localStorage.wishlist) {
//         wishlist = JSON.parse(localStorage.getItem('wishlist'))
//     } else {
//         wishlistContainer
//             .text("Wishlist is empty")
//             .css('font-size', '30px');
//     }
//     for (product of wishlist.products) {
//         wishlistContainer[0].innerHTML += addToWishlist(product)
//     }

    // Add product from wishlist to shopping cart
    // wishlistContainer.on("click", ".add", evt => {
    //     let addBtn = $(evt.target);
    //     addBtn.text("Added");

    //     cart = JSON.parse(localStorage.getItem('cart'));
    //     let addToCart = true;
    //     for (prod of cart.products) {
    //         if (prod.fid == product.fid) {
    //             addToCart = false;
    //             prod.quantity += product.quantity;
    //         }
    //     }
    //     if (addToCart) {
    //         cart.products.push(product);
    //         product.quantity = 1;
    //         product.total = parseFloat(product.price * product.quantity);
    //     }
    //     localStorage.setItem('cart', JSON.stringify(cart));
    // });

    // Delete a product from wishlist
//     wishlistContainer.on("click", ".del", evt => {
//         let delButton = $(evt.target);
//         tr = delButton.closest("tr");
//         tr.hide();
//         cid = tr.data("cid");
//         fid = tr.data("fid");
//         wishlist.products = wishlist.products.filter(
//             product => +product.fid !== fid
//         );
//         localStorage.setItem('wishlist', JSON.stringify(wishlist));
//     });

// });

function addToWishlist(product) {
    return `<tr data-fid="${product.fid}">
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
