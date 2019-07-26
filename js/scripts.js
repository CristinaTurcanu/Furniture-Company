// Create button and retrive names from api
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

let cardContainer = document.getElementById("cards");
let wish = cardContainer.getElementsByClassName("fa-heart");
let addBtns = cardContainer.getElementsByClassName("add");
// Add event listeners to buttons
categoryContainer.addEventListener("click", selectCategory, false);
function selectCategory(event) {
  let target = event.target;
  const catId = target.dataset.id;
  furnituresUrl = `${categoryUrl}${catId}/furnitures`;
  fetch(furnituresUrl)
    .then(response => response.json())
    .then((furnitures) => {
         while (cardContainer.firstChild) {
          cardContainer.removeChild(cardContainer.firstChild);
        }
        for (furniture of furnitures) {
            if (furniture.visible) {
              cardContainer.innerHTML += generateCard(furniture, catId);
              for( var i = 0; i < wish.length; i++) {
                wish[i].addEventListener("click", addToWishlist, false);
              }

              for (var i = 0; i < addBtns.length; i++) {
                addBtns[i].addEventListener("click", addToCart, false);
              }
            }
        }
    });
}
// Click the heart and add the product to wishlist
function addToWishlist() {
  let heart = event.target;
  let overlay = heart.parentNode;
  overlay.classList.add("added");

  let wishlist = localStorage.getItem('wishlist');
  if(wishlist) {
    wishlist = JSON.parse(wishlist);    
  } else {
    wishlist = {products: []};
  }

  let card = heart.parentNode.parentNode;
  let product = {}
  product.fid = card.dataset.fid;
  product.img = card.firstElementChild.getAttribute("src");
  product.name = card.querySelector(".description").querySelector(".name").textContent;
  product.price = card.querySelector(".description").querySelector(".price").textContent;
  product.color = card.querySelector(".description").querySelector(".color").textContent;
  product.availability = card.querySelector(".description").querySelector(".availability").textContent;

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
}

function addToCart() {
    let addBtn = event.target;
    addBtn.textContent = "Added";

    let cart = localStorage.getItem('cart');
      if(cart) {
        cart = JSON.parse(cart);
      } else {
        cart = {products: []};
      }
    let card = addBtn.parentNode.parentNode;

    let product = {};
    product.fid = card.dataset.fid;
    product.img = card.firstElementChild.getAttribute("src");
    product.name = card.querySelector(".description").querySelector(".name").textContent;
    product.color = card.querySelector(".description").querySelector(".color").textContent;
    product.availability = card.querySelector(".description").querySelector(".availability").textContent;
    product.price = parseFloat(card.querySelector(".description").querySelector(".price").textContent);
    product.quantity = parseFloat(card.querySelector(".shopping").querySelector(".form-control").value);
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
}
function generateCard(furniture, catId) {
  return `<div class="card" data-fid="${furniture.id}" data-cid="${catId}">
            <img src="images/products/frn143.jpg">
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
