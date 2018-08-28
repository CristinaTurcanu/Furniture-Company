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
          // cardTemplate = cardContainer.find('.card');
          for (furniture of furnitures) {
              if (furniture.visible) {
                
                  // let card = cardTemplate.clone()
                  // card.prop('hidden', false);
                  // card.attr('data-id', furniture.id);
                  // card.addClass('cln');
                  // card.find('.description .name').text(furniture.name)
                  // card.find('.description .price').text(furniture.price + ' $')
                  // card.find('.description .availability').text(furniture.availability)                  
                  // card.find('.description .descr').text(furniture.description)
                  cardContainer.append(generateCard(furniture, catId));
              }
          }
      });
    });
  });



function generateCard(furniture, catId) {
  return `<div class="card">
            <img src="images/products/bed1.jpg" alt="">
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
