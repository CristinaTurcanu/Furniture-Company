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
        btn.val(category.id);
        categoryContainer.append(btn);
      }
    }
  });

  $(document).on('click', '.products .categories .btn', (evt) => {
    let target = $(evt.target);

    furnituresUrl = `${categoryUrl}${target.val()}/furnitures`;

    fetch(furnituresUrl)
    .then((response) => {
      return response.json();
    })

    .then((furnitures) => {
      cardContainer = $('.products .cards');
      cardTemplate = cardContainer.find('.card');
      for (furniture of furnitures) {
        cardContainer = $(".products .cards");
        cardContainer.children('.card.cln').remove();
        cardTemplate = cardContainer.find('.card');
        for (furniture of furnitures) {
            console.log('here')
            if (furniture.visible) {
                let card = cardTemplate.clone()
                card.prop('hidden', false);
                card.addClass('cln');
                card.find('.description .name').text(furniture.name)
                card.find('.description .price').text(furniture.price)
                card.find('.description .availability').text(furniture.availability)                        
                card.find('.description .descr').text(furniture.description)
                cardContainer.append(card)
            }
        }
      }
    });
  });
});















// Filter
$(function() {
  $('.toggles button').click(function() {
    var get_id = this.id;
    var get_current = $('.cards .' + get_id);

    $('.card').not(get_current).hide(500);
    get_current.show(500);
  });

  $('#showall').click(function() {
    $('.card').show(500);
  });
});