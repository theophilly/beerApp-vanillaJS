let beerData;

const fetchData = async () => {
  fetch("https://api.punkapi.com/v2/beers?per_page=6")
    .then(function (response) {
      return response.json();
    })
    .then(function (arr) {
      arr.map((json) => {
        var root = document.getElementById("root");
        var beer = document.createElement("DIV");
        beer.classList.add("beer");
        beer.innerHTML = `    <i class="far fa-star icon"></i>
        <img src=${json.image_url} alt="" />
        <div class="description">
          <h3 class="title">${json.name.toString()}</h3>
          <p>
            ${fetchdes(json.description.toString())}
          </p>
        </div>`;
        console.log(beer);
        root.appendChild(beer);
      });

      var ele = document.querySelectorAll(".icon");
      ele.forEach((item) => {
        item.addEventListener("click", (event) => {
          if (event.target.classList.contains("far")) {
            event.target.classList.remove("far");
            event.target.classList.add("fas");
            alert("Item has been added");
          } else {
            event.target.classList.remove("fas");
            event.target.classList.add("far");
            alert("Item has been removed");
          }
        });
      });
    });
};

fetchData();

fetchdes = (data) => data.substring(0, 130) + "...";

document.querySelector("button").addEventListener("click", (event) => {
  event.preventDefault();

  var searchTerm = document.querySelector("input").value;

  searchTerm = searchTerm.toString();

  document.getElementById("root").innerHTML = "";

  fetch("https://api.punkapi.com/v2/beers?per_page=6&beer_name=" + searchTerm)
    .then(function (response) {
      return response.json();
    })
    .then(function (arr) {
      arr.map((json) => {
        var root = document.getElementById("root");
        var beer = document.createElement("DIV");
        beer.classList.add("beer");
        beer.innerHTML = `    <i class="far fa-star icon"></i>
        <img src=${json.image_url} alt="" />
        <div class="description">
          <h3 class="title">${json.name.toString()}</h3>
          <p>
            ${fetchdes(json.description.toString())}
          </p>
        </div>`;
        console.log(beer);
        root.appendChild(beer);
      });
      var ele = document.querySelectorAll(".icon");
      ele.forEach((item) => {
        item.addEventListener("click", (event) => {
          if (event.target.classList.contains("far")) {
            event.target.classList.remove("far");
            event.target.classList.add("fas");
            alert("Item has been added");
          } else {
            event.target.classList.remove("fas");
            event.target.classList.add("far");
            alert("Item has been removed");
          }
        });
      });
    });
});
