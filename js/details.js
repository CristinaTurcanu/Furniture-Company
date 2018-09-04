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
              document.getElementById("name").textContent = productDetail.name;
              document.getElementById("availability").textContent = productDetail.availability;
              document.getElementById("description").textContent = productDetail.description;
              document.getElementById("color").textContent = productDetail.color;
              document.getElementById("price").textContent = productDetail.price;

              // let div = $(`.prod-details .details .${field} span`);
              // if (div.length) {
              //   div.text(productDetail[field]);
              // }s


              let addBtns = prodDetails.getElementsByTagName("button");
              for(var i = 0; i < addBtns.length; i++) {
                addBtns[i].addEventListener("click", addTocart(i), false);
              }
              function addTocart(i) {
                let product = {};
                product.img = `images/products/frn${furnitureId}.jpg`;
                product.fid = furnitureId;
                product.name = document.getElementById("name").textContent;
                product.availability = document.getElementById("availability").textContent;
                product.color = document.getElementById("color").textContent;
                product.price = parseFloat(document.getElementById("price").textContent);
                // nu selecteaza valoare 
                product.quantity = parseFloat(document.getElementById("selectQuantity").value);
                product.total = product.price * product.quantity;
          
                cart = JSON.parse(localStorage.getItem('cart'));
                let addToCart = true;
                for( prod of cart.products) {
                  if(prod.fid == product.fid) {
                    addToCart = false;
                  }
                }
                if(addToCart) {
                  cart.products.push(product);
                }
                localStorage.setItem('cart', JSON.stringify(cart));
              }
            }
          }   
        });
    }

   















// $(document).ready(() => {
//     const queryParamsString = window.location.search.substr(1);
//     const queryParams = queryParamsString
//       .split("&")
//       .reduce((accumulator, singleQueryParam) => {
//         const [key, value] = singleQueryParam.split("=");
//         accumulator[key] = decodeURIComponent(value);
//         return accumulator;
//       }, {});
  
//     let categoryId = queryParams["cid"];
//     let furnitureId = queryParams["fid"];
//     if (categoryId && furnitureId) {
//       let productDetailUrl = `http://iw-internship.herokuapp.com/api/v1/furniture-categories/${categoryId}/furnitures/${furnitureId}`;
//       fetch(productDetailUrl)
//         .then(response => {
//           return response.json();
//         })
//         .then(productDetail => {
//           if (productDetail.visible) {
//             $('.prod-details .image img').attr('src', `images/products/frn${furnitureId}.jpg`);
//             for (field in productDetail) {
//               let div = $(`.prod-details .details .${field} span`);
//               if (div.length) {
//                 div.text(productDetail[field]);
//               }
//             }
//           }
//         });
//     }
//   });