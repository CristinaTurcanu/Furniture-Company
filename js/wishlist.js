
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
// Delete product from wishlist and localStorage
let delBtns = wishlistContainer.getElementsByClassName("del");
for (var i = 0; i < delBtns.length; i++) {
    delBtns[i].addEventListener("click", deleteProduct, false);
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
// -----------------------------------------------------------------

// Add product from wishlist to cart
let addBtns = wishlistContainer.getElementsByClassName("add");
for (var i = 0; i < addBtns.length; i++) {
    addBtns[i].addEventListener("click", addProduct, false);
}
function addProduct() {
    let addBtn = event.target;
    let fid = addBtn.parentNode.dataset.fid;
    addBtn.textContent = "Added";

    if(localStorage.cart) {
        cart = JSON.parse(localStorage.getItem("cart"));
    } else {
        cart = { products: [] };
    }

    let addToCart = true;
    let product = wishlist.products.filter(product => +product.fid == fid)[0];
    for (prod of cart.products) {
        if (prod.fid == product.fid) {
            addToCart = false;
            prod.quantity++;
        }
    }
    if (addToCart) {
        cart.products.push(product);
        product.quantity = 1;
        product.total = parseFloat(product.price * product.quantity);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
}
// ----------------------------------------------------------------------------

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
