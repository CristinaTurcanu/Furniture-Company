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

    $('.products .cards .card .description .name').click(function() {
      const queryParamsString = window.location.search.substr(1);
      const queryParams = queryParamsString
        .split('&')
        .reduce((accumulator, singleQueryParam) => {
          const [key, value] = singleQueryParam.split('=');
          accumulator[key] = decodeURIComponent(value);
          return accumulator;
        }, {});
    
        let categoryId = queryParams["cid"];
        let furnitureId = queryParams["fid"]; 
        if(categoryId && furnitureId) {
          let productDetailUrl = 'http://iw-internship.herokuapp.com/api/v1/furniture-categories/${categoryId}/furnitures/${furnitureId}';
          fetch(productDetailUrl)
          .then(response => {
            return response.json();
          })
          .then(productDetail => {
            if(productDetail.visible) {
              let details = 
              `<section class="prod-details">
                  <div class="image">
                      <img src="images/products/living2.jpg" alt="">
                  </div>
                  <div class="details">
                      <h3 class="name">${productDetail.name}</h3>
                      <hr>
                      <p class="price">${productDetail.price}</p>
                      <p class="description">${productDetail.description}</p>
                      <p class="color">${'Color: ' + productDetail.color}</p>
                      <p class="availability">Availability: ${productDetail.availability}</p>
      
                      <div class="shop">
                          <select>
                              <option>1</option>
                              <option>2</option>
                          </select>
                          <button>Add to cart</button>
                      </div>
                  </div>
                </section>`
            $('.products .cards').append(details);
            }
          }); 
        }
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
// function showDetails(productDetail) {
//   return `<section class="prod-details">
//             <div class="image">
//                 <img src="images/products/living2.jpg" alt="">
//             </div>
//             <div class="details">
//                 <h3 class="name">${productDetail.name}</h3>
//                 <hr>
//                 <p class="price">${productDetail.price}</p>
//                 <p class="description">${productDetail.description}</p>
//                 <p class="color">${'Color: ' + productDetail.color}</p>
//                 <p class="availability">Availability: ${productDetail.availability}</p>

//                 <div class="shop">
//                     <select>
//                         <option>1</option>
//                         <option>2</option>
//                     </select>
//                     <button>Add to cart</button>
//                 </div>
//             </div>
//           </section>`;
// }





















// Filter
// $(function() {
//   $('.toggles button').click(function() {
//     var get_id = this.id;
//     var get_current = $('.cards .' + get_id);

//     $('.card').not(get_current).hide(500);
//     get_current.show(500);
//   });

//   $('#showall').click(function() {
//     $('.card').show(500);
//   });
// });