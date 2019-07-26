const queryParamsString = window.location.search.substr(1);
const queryParams = queryParamsString
  .split("&")
  .reduce((accumulator, singleQueryParam) => {
    const [key, value] = singleQueryParam.split("=");
    accumulator[key] = decodeURIComponent(value);
    return accumulator;
  }, {});

let categoryId = queryParams["cid"];
let furnitureId = queryParams["fid"];
let prodDetails = document.getElementById("prod-details");
let details = document.getElementById("details");
if (categoryId && furnitureId) {
  let productDetailUrl = `http://iw-internship.herokuapp.com/api/v1/furniture-categories/${categoryId}/furnitures/${furnitureId}`;
  fetch(productDetailUrl)
    .then(response => response.json())
    .then(productDetail => {
      if (productDetail.visible) {
        let imgs = prodDetails.getElementsByTagName("img");
        for (var i = 0; i < imgs.length; i++) {
          imgs[i].src = `images/products/frn${furnitureId}.jpg`;
        }
        for (field in productDetail) {
          element = document.getElementById(field);
          if (element) element.textContent = productDetail[field]
        }

        let addBtns = prodDetails.getElementsByTagName("button");
        for (var i = 0; i < addBtns.length; i++) {
          addBtns[i].addEventListener("click", addTocart, false);
        }
      }
    });
}

function addTocart() {
  let product = {};
  // product.img = `images/products/frn${furnitureId}.jpg`;
  product.img = document.getElementById("img").src;
  product.fid = furnitureId;
  product.name = document.getElementById("name").textContent;
  product.availability = document.getElementById("availability").textContent;
  product.color = document.getElementById("color").textContent;
  product.price = parseFloat(document.getElementById("price").textContent);
  product.quantity = parseFloat(document.getElementById("selectQuantity").value);
  product.total = product.price * product.quantity;

  cart = JSON.parse(localStorage.getItem('cart'));
  let addToCart = true;
  for (prod of cart.products) {
    if (prod.fid == product.fid) {
      addToCart = false;
    }
  }
  if (addToCart) {
    cart.products.push(product);
  }
  localStorage.setItem('cart', JSON.stringify(cart));
}