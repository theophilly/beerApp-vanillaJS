let beerData;

const fetchData = async () => {
  document.getElementById("root").innerHTML = "";
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

//This would load the data on start
fetchData();

//This would load the beers when the logo is clicked
document.querySelector(".logo").addEventListener("click", (event) => {
  event.preventDefault();
  fetchData();
});

//This would trim the desccription to 130 characters
fetchdes = (data) => data.substring(0, 110) + "...";
//This would trim the desccription to 130 characters
fetchname = (data) => data.substring(0, 35);

//This would query the search
document.querySelector("button").addEventListener("click", (event) => {
  event.preventDefault();

  var searchTerm = document.querySelector("input").value;

  searchTerm = searchTerm.toString();
  if (
    searchTerm.toString() === null ||
    searchTerm.toString().match(/^ *$/) !== null
  ) {
    alert("Search cannot be empty");
    return;
  }

  document.getElementById("root").innerHTML = "";

  fetch("https://api.punkapi.com/v2/beers?per_page=6&beer_name=" + searchTerm)
    .then(function (response) {
      return response.json();
    })
    .then(function (arr) {
      var check = Object.keys(arr).length;

      if (check == 0) {
        document.getElementById("root").innerHTML = "";
        var root = document.getElementById("root");
        root.innerHTML = ` <div class="noBeer">
          <h3>Sorry! We dont have this type of beer</h3>
          <button class="goBackBtn">
          Go back Home  </button>  </div> `;

        document
          .querySelector(".goBackBtn")
          .addEventListener("click", (event) => {
            event.preventDefault();
            fetchData();
          });

        return;
      }

      arr.map((json) => {
        var root = document.getElementById("root");
        var beer = document.createElement("DIV");
        beer.classList.add("beer");
        beer.innerHTML = `    <i class="far fa-star icon"></i>
        <img src=${json.image_url} alt="" />
        <div class="description">
          <h3 class="title">${fetchname(json.name.toString())}</h3>
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
