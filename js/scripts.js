$(document).ready(() => {

  categoryContainer = $('.products .categories');
  let categoryUrl = "http://iw-internship.herokuapp.com/api/v1/furniture-categories/";
  fetch(categoryUrl)
  .then(response => {
    return response.json();
  })
  .then((categories) => {
    for (category of categories) {
      if(category.visible) {
        btn = $('<button class=btn/>');
        btn.text(category.name);
        btn.attr('data-id', category.id);
        categoryContainer.append(btn);
      }
    }
  });

  $(document).on('click', '.products .categories .btn', (evt) => {
    let target = $(evt.target);
    const catId = target.data("id");

    furnituresUrl = `${categoryUrl}${catId}/furnitures`;

    fetch(furnituresUrl)
      .then((response) => {
        return response.json();
      })

      .then( furnitures => {
          cardContainer = $(".products .cards");
          cardContainer.children('.card').remove();
          for (furniture of furnitures) {
              if (furniture.visible) {
                cardContainer.append(generateCard(furniture, catId));
              }
          }
      });
    });
  
  $(document).on('click', '.products .cards .card .overlay i', (evt) => {
    i = $(evt.target);
    console.log("Added to wishlist");

    let wishlist = localStorage.getItem('wishlist');
      if(wishlist) {
        wishlist = JSON.parse(wishlist);    
      } else {
        wishlist = {};
        wishlist.products = [];
      }

    card = i.closest('.card');

    let product = {};
    product.name = card.find('.products .cards .card .description .name')
    product.price = card.find('.products .cards .card .description .price')
    product.availability = card.find('.products .cards .card .description .availability')
    product.img = card.find('.products .cards .card .image img')

    wishlist.products.push(product);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  });

});


function generateCard(furniture, catId) {
  return `<div class="card">
            <img src="images/products/frn${furniture.id}.jpg">
            <div class="description">
                <a href="product-details.html?cid=${catId}&fid=${furniture.id}"><p class="name">${furniture.name}</p></a>
                <p class="price">${furniture.price + ' $'}</p>
                <p class="availability">${furniture.availability}</p>
                <p class="descr">${furniture.description}</p>
            </div>
            <button class="add">Add to cart</button>
            <div class="overlay">
                <i class="fa fa-heart"></i> 
            </div>
        </div> `;
  
}
