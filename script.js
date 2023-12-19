const apiProducts = "https://fakestoreapi.com/products";
const apiCategories = "https://fakestoreapi.com/products/categories";
const displayCat = document.querySelectorAll(".catLinks");
const getTopRated = document.querySelector(".topRated");
const bestSellerTitle = document.querySelector(".bestSellerTitle");
const getBestSeller = document.querySelector(".bestSeller");
const getProducts = document.querySelector(".products");

fetch(apiProducts)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network not ok");
    }
    return response.json();
  })
  .then((data) => {
    console.log("products", data);
    findTopRated(data);
    displayTopRatedProducts(findTopRated(data));
    findBestSellerProduct(data);
    displayBestSeller(findBestSellerProduct(data));
    getElectronics(data);
    fetchAllProducts(data);
    displayProducts(fetchAllProducts(data));
  })
  .catch((error) => {
    console.log(error);
  });

fetch(apiCategories)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network not ok");
    }
    return response.json();
  })
  .then((data) => {
    console.log("cat", data);
    displayCategories(data, displayCat);
  })
  .catch((error) => {
    console.log(error);
  });

function displayCategories(data, elements) {
  elements.forEach((element) => {
    const catLinks = data
      .map((cat) => `<a href="#" class="text-white text-capitalize">${cat}</a>`)
      .join("");
    element.innerHTML = catLinks;
  });
}

function findTopRated(data) {
  const topRated = data.filter((product) => product.rating.rate > 4.65);
  console.log("toprated", topRated);
  return topRated;
}

function displayTopRatedProducts(data) {
  getTopRated.innerHTML = data
    .map(
      (product) => `<div class="col-12 col-lg-4 mx-auto">
      <div class="text-center">
      <img src="${product.image}"class="img-adjust img-fluid" alt="..." />
              <h4>${product.title}</h4>
              <p>
               $ ${product.price}
              </p>
            </div>
          </div>`
    )
    .join("");
}

bestSellerTitle.textContent = "Our best seller";

function findBestSellerProduct(data) {
  const getPrices = data.map((product) => product.price);
  console.log("maxprice", getPrices);
  const maxPrice = Math.max(...getPrices);
  console.log(maxPrice);
  const getMaxPrice = data.filter((product) => product.price === maxPrice);
  return getMaxPrice;
}

function displayBestSeller(data) {
  getBestSeller.innerHTML = data
    .map(
      (product) => `<div class="col-12 col-lg-4 mb-4">
   <h4>${product.title}</h4>
  </div>
  <div class="col-12 col-lg-8 text-center">
   <img src=${product.image} class="img-fluid img-adjust"/>
  </div>`
    )
    .join(" ");
}

function fetchAllProducts(data) {
  const products = data.map((product) => product);
  return products;
}

function getElectronics(data, categoryName) {
  const electronics = data.filter(
    (products) => products.category === categoryName
  );
  console.log("elect", electronics);
}

function displayProducts(data) {
  getProducts.innerHTML = data.map(
    (
      product
    ) => `<div class='col-md-4 col-lg-3 mb-2 bg-white p-4 rounded-4 shadow-lg card-size'>
      <p class='fw-bold fs-5 mb-1'>${product.title.slice(0, 20)}</p>
      <p class='fw-light fs-5 '>$${product.price}</p>
      <div class='imgResize'>
      <img src='${product.image}' alt='${product.title.slice(
      0,
      20
    )}' class='w-100 h-100'/>
      </div>
    </div>`
  );
}
