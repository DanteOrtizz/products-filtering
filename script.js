const products = [
    {
      name: 'Sony Playstation 5',
      url: 'images/playstation_5.png',
      type: 'games',
      price: 499.99,
    },
    {
      name: 'Samsung Galaxy',
      url: 'images/samsung_galaxy.png',
      type: 'smartphones',
      price: 399.99,
    },
    {
      name: 'Cannon EOS Camera',
      url: 'images/cannon_eos_camera.png',
      type: 'cameras',
      price: 749.99,
    },
    {
      name: 'Sony A7 Camera',
      url: 'images/sony_a7_camera.png',
      type: 'cameras',
      price: 1999.99,
    },
    {
      name: 'LG TV',
      url: 'images/lg_tv.png',
      type: 'televisions',
      price: 799.99,
    },
    {
      name: 'Nintendo Switch',
      url: 'images/nintendo_switch.png',
      type: 'games',
      price: 299.99,
    },
    {
      name: 'Xbox Series X',
      url: 'images/xbox_series_x.png',
      type: 'games',
      price: 499.99,
    },
    {
      name: 'Samsung TV',
      url: 'images/samsung_tv.png',
      type: 'televisions',
      price: 1099.99,
    },
    {
      name: 'Google Pixel',
      url: 'images/google_pixel.png',
      type: 'smartphones',
      price: 499.99,
    },
    {
      name: 'Sony ZV1F Camera',
      url: 'images/sony_zv1f_camera.png',
      type: 'cameras',
      price: 799.99,
    },
    {
      name: 'Toshiba TV',
      url: 'images/toshiba_tv.png',
      type: 'televisions',
      price: 499.99,
    },
    {
      name: 'iPhone 14',
      url: 'images/iphone_14.png',
      type: 'smartphones',
      price: 999.99,
    },
];
  
// Get DOM elements -------------------------------------------------------------
const productsWrapperEl = document.getElementById('products-wrapper');
const checkEls = document.querySelectorAll('.check');
const filtersContainer = document.getElementById('filters-container');
const searchInput = document.getElementById('search');
const cartButton = document.getElementById('cartButton');
const cartCount = document.getElementById('cartCount');

// Initialize cart item count ----------------------------------------------------
let cartItemCount = 0;

// Initialize products ----------------------------------------------------------
const productsEls = [];

// Loop over the products and create the product elements ------------------------
products.forEach((product) => {
    const productEl = createProductElement(product);
    productsEls.push(productEl);
    productsWrapperEl.appendChild(productEl);
  }
);

// Add filter event listeners ----------------------------------------------
filtersContainer.addEventListener('change', filterProducts);
searchInput.addEventListener('input', filterProducts);

// create product function ----------------------------------------------
function createProductElement(product) {
    const productEl = document.createElement('div');
  
    productEl.className = 'item space-y-2';
  
    productEl.innerHTML = `<div
    class="bg-gray-100 flex justify-center relative overflow-hidden group cursor-pointer border"
  >
    <img
      src="${product.url}"
      alt="${product.name}"
      class="w-full h-full object-cover"
    />
    <span
      class="status bg-gray-800 text-white absolute bottom-0 left-0 right-0 text-center py-2 translate-y-full transition group-hover:translate-y-0"
      >Add To Cart</span
    >
  </div>
  <p class="text-xl">${product.name}</p>
  <strong>$${product.price.toLocaleString()}</strong>`;

    productEl.querySelector('.status').addEventListener('click', addToCart);

    return productEl;
}

// Toggle add/remove from cart -----------------------------------------------------------------
function addToCart(e) {
    const statusEl = e.target;

    if (statusEl.classList.contains('added')) {
        // remove from cart
        statusEl.classList.remove('added');
        statusEl.innerText = 'Add to cart';
        statusEl.classList.remove('bg-red-600');
        statusEl.classList.add('bg-gray-800');

        cartItemCount--;

    } else {
        // add to cart
        statusEl.classList.add('added');
        statusEl.innerText = 'Remove from cart';
        statusEl.classList.remove('bg-gray-800');
        statusEl.classList.add('bg-red-600');

        cartItemCount++;
    }

    // update cart item count
    cartCount.innerText = cartItemCount.toString();
}

// filter product by search or checkbox -----------------------------------------------
function filterProducts() {
  // get search term
  const searchTerm = searchInput.value.trim().toLowerCase();

  // get checked categories
  const checkedCategories = Array.from(checkEls).filter((check) => check.checked).map((check) => check.id);

    // loop over products and check for matches
    productsEls.forEach((productEl, index) => {
      const product = products[index];

      // product search validation
      const matchesSearcheTerm = product.name.toLowerCase().includes(searchTerm);
      const isInCheckedCategory = checkedCategories.length === 0 || checkedCategories.includes(product.type);

      // show or hide products
      if (matchesSearcheTerm && isInCheckedCategory) {
        productEl.classList.remove('hidden');
      } else {
        productEl.classList.add('hidden');
      }
    });
}