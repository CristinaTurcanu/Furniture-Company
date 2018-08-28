$(document).ready(() => {
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
    if (categoryId && furnitureId) {
      let productDetailUrl = `http://iw-internship.herokuapp.com/api/v1/furniture-categories/${categoryId}/furnitures/${furnitureId}`;
      fetch(productDetailUrl)
        .then(response => {
          return response.json();
        })
        .then(productDetail => {
          if (productDetail.visible) {
            for (field in productDetail) {
              let div = $(`.prod-details .details .${field}`);
              if (div.length) {
                div.text(productDetail[field]);
              }
            }
          }
        });
    }
  });