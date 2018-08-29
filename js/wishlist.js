$(document).ready(() => {
    if(localStorage.wishlist) {
        wishlist = JSON.parse(localStorage.wishlist)
    } else {
        console.log("Wishlist is empty")
    }
});