// shoppingCart = document.getElementById("cartContainer");
// let cart = {"products": []};

// if(localStorage.cart) {
//     cart = JSON.parse(localStorage.getItem("cart"))
// } else {
//     shoppingCart.texContent = "Shopping Cart is empty"
// }
// let totalProductsPrice = 0;
// for(product of cart.products){
//     shoppingCart.innerHTML += addToCart(product);
//     totalProductsPrice += product.total;
// }
// let totalSum = document.getElementById("totalSum");
// totalSum.textContent = totalProductsPrice + " $";

// let inputQ = shoppingCart.getElementsByClassName("inputQuantity");
// for (var q = 0; q < inputQ.length; q++) {
//     inputQ[q].addEventListener("click", changeQuantity, false);
// }

// function changeQuantity() {
//     let input = event.target;
//     let tr = input.parentNode.parentNode;
//     let price = tr.getElementsByClassName("productPrice");
//     let productTotal = tr.getElementsByClassName("productTotal");
//     for (var p = 0; p < price.length; p++){
//         p = price[p].textContent;
//         console.log(p);
//     }

//     for (var t = 0; t < productTotal.length; t++){
//         productTotal[t].textContent = p * input.value;
//         console.log(p[t]);
//         console.log(input.value);
//         t = parseFloat(productTotal[t].textContent);
//         console.log(t);
//     }
//     let totalProductsPrice = 0;
        
//     for (prod of cart.products) {
//         if (prod.fid == tr.dataset.fid) {
//             prod.quantity = input.value;
//             prod.total = prod.price * prod.quantity;
//         }
//         totalProductsPrice += parseFloat(prod.total);
//         }
//         totalSum.textContent = totalProductsPrice + " $";
//         localStorage.setItem("cart", JSON.stringify(cart));
// }


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
    let totalSum = document.getElementById("totalSum");
    totalSum.textContent = totalProductsPrice + " $";

    // Change the quantity of one product and update total price for that product 
    shoppingCart.on("click", ".inputQuantity", (evt) => {
        let input = $(evt.target);
        let tr = input.closest("tr");
        let price = parseFloat(tr.find(".productPrice").text());
        let productTotal = tr.find(".productTotal").text(price * input.val());
        productTotal = parseFloat(productTotal.text());
        // Update total sum
        let totalProductsPrice = 0;
        
        for (prod of cart.products) {
            if (prod.fid == tr.data("fid")) {
              prod.quantity = input.val();
              prod.total = prod.price * prod.quantity;
            }
            totalProductsPrice += parseFloat(prod.total);
          }
          totalSum.textContent = totalProductsPrice + " $";
          localStorage.setItem("cart", JSON.stringify(cart));
    });


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