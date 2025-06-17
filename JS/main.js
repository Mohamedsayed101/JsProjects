let title = document.querySelector("#title");
let price = document.querySelector("#price");
let tax = document.querySelector("#taxes");
let ads = document.querySelector("#ads");
let discount = document.querySelector("#discount");

let total = document.getElementById("total");

let count = document.querySelector("#count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");

let mood = "create";
let temp;

// calc Total price
function getTotal() {
  if (price.value !== "") {
    let t = +price.value + +tax.value + +ads.value - +discount.value;
    total.innerText = t;
    total.style.background = "#040";
  } else {
    total.innerText = "";
    total.style.background = "blue";
  }
}

// submit product

let dataPro;
if (localStorage.product != null) {
  dataPro = JSON.parse(localStorage.product);
} else {
  dataPro = [];
}
submit.onclick = (e) => {
  if (
    title.value === "" ||
    price.value === "" ||
    +price.value <= 0 ||
    category.value === ""
  ) {
    e.preventDefault();
  }
  let obj = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: tax.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };
  if (mood === "create") {
    if (obj.count > 1) {
      for (let i = 0; i < obj.count; i++) {
        dataPro.push(obj);
      }
    } else {
      dataPro.push(obj);
    }
  } else {
    dataPro[temp] = obj;
    mood = "create";
    submit.innerHTML = "Create";
    count.style.display = "block";
  }

  localStorage.setItem("product", JSON.stringify(dataPro));
  clearData();
};
// save localStorge
// clear inputs

function clearData() {
  title.value = "";
  price.value = "";
  tax.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}
// show
function showData() {
  getTotal();
  let table = "";
  for (let index = 0; index < dataPro.length; index++) {
    table += `
        <tr>
        <td>${index + 1}</td>
        <td>${dataPro[index].title}</td>
        <td>${dataPro[index].price}</td>
        <td>${dataPro[index].taxes || 0}</td>
        <td>${dataPro[index].ads || 0}</td>
        <td>${dataPro[index].discount || 0}</td>
        <td>${dataPro[index].total}</td>
        <td>${dataPro[index].category}</td>
        <td><button onclick="updataData(${index})" id="updata">Updata</button></td>  
        <td><button onclick="deleteProduct(${index})" id="delete">delete</button></td>  
        </tr>
        `;
  }
  document.getElementById("tbody").innerHTML = table;
  // delete all
  let btnDelete = document.getElementById("deleteAll");
  if (dataPro.length > 0) {
    btnDelete.innerHTML = `<button onclick="deleteAll()" id="delete">delete All (${dataPro.length})</button>`;
  } else {
    btnDelete.innerHTML = "";
  }
}
showData();

// delete
function deleteProduct(i) {
  dataPro.splice(i, 1);
  localStorage.product = JSON.stringify(dataPro);
  showData();
}
// updata
function updataData(i) {
  let product = dataPro[i];

  title.value = product.title;
  price.value = product.price;
  tax.value = product.taxes;
  ads.value = product.ads;
  discount.value = product.discount;
  getTotal();
  count.style.display = "none";
  category.value = product.category;
  mood = "updata";
  submit.innerHTML = "Update";
  temp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

// search

let searchMood = "title";
function getSearchMood(id) {
  let search = document.getElementById("search");
  if (id === "searchByTitle") {
    searchMood = "title";
    search.placeholder = "Search By Title";
  } else {
    searchMood = "category";
    search.placeholder = "Search By Category";
  }
  search.focus();
  search.value = "";
  showData();
}

function searchData(val) {
  let table = "";
  for (let index = 0; index < dataPro.length; index++) {
    if (searchMood === "title") {
      if (dataPro[index].title.includes(val.toLowerCase())) {
        table += `
        <tr>
        <td>${index + 1}</td>
        <td>${dataPro[index].title}</td>
        <td>${dataPro[index].price}</td>
        <td>${dataPro[index].taxes || 0}</td>
        <td>${dataPro[index].ads || 0}</td>
        <td>${dataPro[index].discount || 0}</td>
        <td>${dataPro[index].total}</td>
        <td>${dataPro[index].category}</td>
        <td><button onclick="updataData(${index})" id="updata">Updata</button></td>  
        <td><button onclick="deleteProduct(${index})" id="delete">delete</button></td>  
        </tr>
        `;
      }
    } else {
      if (dataPro[index].category.includes(val.toLowerCase())) {
        table += `
            <tr>
            <td>${index + 1}</td>
            <td>${dataPro[index].title}</td>
            <td>${dataPro[index].price}</td>
            <td>${dataPro[index].taxes || 0}</td>
            <td>${dataPro[index].ads || 0}</td>
            <td>${dataPro[index].discount || 0}</td>
            <td>${dataPro[index].total}</td>
            <td>${dataPro[index].category}</td>
        <td><button onclick="updataData(${index})" id="updata">Updata</button></td>  
        <td><button onclick="deleteProduct(${index})" id="delete">delete</button></td>  
        </tr>
        `;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}
// clean data

// delete All
function deleteAll() {
  localStorage.clear();
  dataPro.splice(0);
  showData();
}
