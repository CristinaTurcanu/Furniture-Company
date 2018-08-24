const Http = new XMLHttpRequest();
const url = "https://iw-internship.herokuapp.com/api/v1/furniture-categories/";
var responses = [];
Http.open("GET", url);
Http.send();
Http.onreadystatechange = e => {
  responses = JSON.parse(Http.responseText);
  objectTemplate = document.getElementsByClassName("object")[0];
  resultsDom = document.getElementsByClassName("results")[0];
  for (response of responses) {
    test = objectTemplate.cloneNode(true);
    test.removeAttribute("hidden");
    test.getElementsByClassName("id")[0].innerText = response.id;
    test.getElementsByClassName("name")[0].innerText = response.name;
    test.getElementsByClassName("position")[0].innerText = response.position;
    test.getElementsByClassName("visible")[0].innerText = response.visible;
    test.getElementsByClassName("created_at")[0].innerText =
      response.created_at;
    resultsDom.appendChild(test);
  }
};