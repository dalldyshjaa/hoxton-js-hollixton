let state = {
  products: [],
};
function getTheProducts() {
  fetch("http://localhost:3005/store")
    .then((resp) => resp.json())
    .then((products) => {
      state.products = products;
      renderTheProducts();
    });
}
getTheProducts();
function renderTheProducts() {
  let main = document.querySelector("main");
  main.innerHTML = "";
  for (let product of state.products) {
    let productLink = document.createElement("a");
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
function renderTheProductsByType(type) {
  let main = document.querySelector("main");
  main.innerHTML = "";
  for (let product of state.products) {
    if (product.type === type) {
      let productLink = document.createElement("a");
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
    } else {
      continue;
    }
  }
}
document.querySelector(".girls").addEventListener("click", (e) => {
  renderTheProductsByType(e.target.textContent);
});
document.querySelector(".guys").addEventListener("click", (e) => {
  renderTheProductsByType(e.target.textContent);
});
