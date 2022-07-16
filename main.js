let state = {
  products: [],
  modal: "",
  selected: null,
  onTheBag: {
    bagCount: 0,
    productsOnTheBag: [],
  },
  filter: "",
};

function getTheProducts() {
  fetch("http://localhost:3005/store")
    .then((resp) => resp.json())
    .then((products) => {
      state.products = products;
      renderTheProducts();
    });
}

function renderTheProducts() {
  let main = document.querySelector("main");
  main.innerHTML = "";
  for (let product of state.products) {
    createSingleProduct(product, main);
  }
}

function renderTheProductsByType(type) {
  let main = document.querySelector("main");
  main.innerHTML = "";
  for (let product of state.products) {
    if (product.type === type) {
      createSingleProduct(product, main);
    }
  }
}

function createSingleProduct(product, main) {
  if (product.name.toLowerCase().includes(state.filter.toLowerCase())) {
    let productLink = document.createElement("a");
    productLink.addEventListener("click", () => {
      state.selected = product;
      createSingleProductPage(main);
    });
    let productUnit = document.createElement("div");
    productUnit.className = "product";
    let productImage = document.createElement("img");
    productImage.className = "product-image";
    productImage.src = product.image;
    let productTitle = document.createElement("p");
    productTitle.className = "product-title product-text";
    productTitle.textContent = product.name;
    let productPrice = document.createElement("p");
    productPrice.className = "product-price product-text";
    productPrice.textContent = `${product.price}$`;
    productLink.appendChild(productUnit);
    productUnit.append(productImage, productTitle, productPrice);
    main.appendChild(productLink);
  }
}

function createSingleProductPage(main) {
  document.querySelector("h2").textContent = "";
  main.innerHTML = "";
  main.className = "single-prod-main";
  let singleProdImageContainer = document.createElement("div");
  singleProdImageContainer.className = "single-prod-image-container";
  let singleProdImage = document.createElement("img");
  singleProdImage.className = "single-prod-image";
  singleProdImage.src = `${state.selected.image}`;

  let singleProdInfoContainer = document.createElement("div");
  singleProdInfoContainer.className = "single-prod-info-container";
  let singleProdName = document.createElement("p");
  singleProdName.className = "single-prod-name";
  singleProdName.textContent = state.selected.name;
  let singleProdBtn = document.createElement("button");
  singleProdBtn.className = "single-prod-addToBag";
  singleProdBtn.textContent = "Add to the bag";
  singleProdBtn.addEventListener("click", () => {
    addProductToBag(state.selected);
  });

  singleProdImageContainer.append(singleProdImage);

  singleProdInfoContainer.append(singleProdName, singleProdBtn);

  main.append(singleProdImageContainer, singleProdInfoContainer);
}
function addProductToBag(product) {
  state.onTheBag.bagCount++;
  state.onTheBag.productsOnTheBag.push(product);
  document.querySelector("#bag").className = "bag-count";
  document.querySelector("#bag").innerHTML = state.onTheBag.bagCount;
}

document.querySelector(".girls").addEventListener("click", (e) => {
  renderTheProductsByType(e.target.textContent);
});
document.querySelector(".guys").addEventListener("click", (e) => {
  renderTheProductsByType(e.target.textContent);
});
document.querySelector(".search").addEventListener("click", () => {
  state.modal = "search";
  renderModal();
});
document.querySelector(".cancel-modal").addEventListener("click", () => {
  state.modal = "";
  renderModal();
});

function renderModal() {
  if (state.modal !== "") {
    document.querySelector("#modal").className = "modal";
  } else {
    document.querySelector("#modal").className = "no-modal";
    return;
  }
  if (document.querySelector(".search-form") != null) {
    document.querySelector(".search-form").remove();
  }
  if (state.modal === "search") {
    document.querySelector(".modal-content > h1").textContent =
      "Search your favorite items";
    let form = document.createElement("form");
    form.className = "search-form";
    let input = document.createElement("input");
    input.className = "search-input";
    input.placeholder = "Search";
    form.append(input);
    document.querySelector(".modal-content").append(form);
  }
  document
    .querySelector(".search-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      state.filter = document.querySelector(".search-input").value;
      state.modal = "";
      render();
    });
}

function render() {
  document.querySelector("#bag").textContent = state.onTheBag.bagCount;
  if (state.onTheBag.bagCount === 0) {
    document.querySelector("#bag").innerHTML = "";
    document.querySelector("#bag").className = "";
  }
  getTheProducts();
  renderModal();
}
render();
