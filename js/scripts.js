
let categoryContainer = document.getElementById("categories");
let categoryUrl = "http://iw-internship.herokuapp.com/api/v1/furniture-categories/";
fetch(categoryUrl)
  .then(response => response.json())
  .then((categories) => {
    for(category of categories) {
      if(category.visible) {
        btn = document.createElement("button");
        btn.classList.add("btn");
        btn.textContent = category.name;
        btn.setAttribute("data-id", category.id);
        categoryContainer.appendChild(btn);
      }
    }
  });

// categoryContainer.addEventListener("click", selectCategory, false);
// function selectCategory(evt) {
//   let target = event.target;
//   const catId = target.dataset.id;
//   furnituresUrl = `${categoryUrl}${catId}/furnitures`;
//   fetch(furnituresUrl)
//     .then(response => response.json())
//     .then((furnitures) => {
//         cardContainer = document.getElementById("cards");
//         while (cardContainer.firstChild) {
//           cardContainer.removeChild(cardContainer.firstChild);
//         }
//         for (furniture of furnitures) {
//             if (furniture.visible) {
//               cardContainer.appendChild(generateCard(furniture, catId));
//             }
//         }
//     });
// }
$(document).ready(() => {
  $(document).on('click', '.products .categories .btn', (evt) => {
    let target = $(evt.target);
    const catId = target.data("id");

    furnituresUrl = `${categoryUrl}${catId}/furnitures`;
    fetch(furnituresUrl)
      .then(response => response.json())
      .then((furnitures) => {
          cardContainer = $(".products .cards");
          cardContainer.children('.card').remove();
          for (furniture of furnitures) {
              if (furniture.visible) {
                cardContainer.append(generateCard(furniture, catId));
              }
          }
      });
    });
  // Add to wishlist when clicking on the product and push the product to localStorage cart
  $(document).on('click', '.products .cards .card .overlay i', (evt) => {
    i = $(evt.target);
    i.closest('.overlay').addClass('added');

    let wishlist = localStorage.getItem('wishlist');
      if(wishlist) {
        wishlist = JSON.parse(wishlist);    
      } else {
        wishlist = {products: []};
      }

    card = i.closest('.card');
    let product = {};
    product.fid = card.attr('data-fid');
    product.name = card.find('.description .name').text();
    product.price = card.find('.description .price').text();
    product.color = card.find('.description .color').text();
    product.availability = card.find('.description .availability').text();
    product.img = card.find('img').attr('src');

    let allowToAdd = true;
    for (prod of wishlist.products) {
      if (prod.fid == product.fid) {
        allowToAdd = false;
      }
    }
    if (allowToAdd) {
      wishlist.products.push(product);
    }
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  });

// Add product to shopping list from products list and push it to localStorage cart
  $(document).on('click', '.products .cards .card .shopping .add', (evt) => {
    addBtn = $(evt.target);
    addBtn.text("Added");

    let cart = localStorage.getItem('cart');
      if(cart) {
        cart = JSON.parse(cart);
      } else {
        cart = {products: []};
      }
    card = addBtn.closest('.card');  

    let product = {};
    product.img = card.find('img').attr('src');
    product.fid = card.attr('data-fid');
    product.name = card.find('.description .name').text();
    product.availability = card.find('.description .availability').text();
    product.color = card.find('.description .color').text();
    product.price = parseFloat(card.find('.description .price').text());
    product.quantity = parseFloat(card.find('.shopping select option').filter(":selected").text());
    product.total = product.price * product.quantity;

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
});


function generateCard(furniture, catId) {
  return `<div class="card" data-fid="${furniture.id}" data-cid="${catId}">
            <img src="images/products/frn${furniture.id}.jpg">
            <div class="description">
                <a href="product-details.html?cid=${catId}&fid=${furniture.id}"><p class="name">${furniture.name}</p></a>
                <p class="price">${furniture.price}</p>
                <p class="availability">${furniture.availability}</p>
                <p class="color" hidden>${furniture.color}</p>
                <p class="descr">${furniture.description}</p>
            </div>
            <div class="shopping">
              <button class="add">Add to cart</button>
              <select id="quantity" class="form-control">
                <option value="1" selected>1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <div class="overlay">
                <i class="fa fa-heart"></i> 
            </div>
        </div> `;
}