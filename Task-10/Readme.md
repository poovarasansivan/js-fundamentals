# Task - Creating a Multipage Ecommerce Website

- Build a comprehensive eCommerce simulation that includes product listings, a shopping cart, and dynamic price calculations.


## Project Directory

```
task-10/
│
├── index.html                 # Homepage
├── script.js                  # Homepage content rendering logics
├── style.css                  # Styles for Homepage
│
├── css/
│   ├── about.css             # About us page styles
|   ├── cart.css              # Cart page styles
|   ├── contact.css           # Contact us page styles
|   ├── products.css          # Products page styles
│   └── view-product.css      # View products page styles
│
├── script/
│   ├── viewproduct.js         # Single Product detils logic
│   ├── product.js             # Product details page logic
│   └── cart.js                # Cart management logic
│
├── data/
│   │  
│   └── productsdata.js        # Sample products data for Home page
|
├── assets/
|   ├── about.png              # About us page image 
|   ├── andriod.png            # Android Playstore image
|   ├── ios.png                # Applestore image
|   ├── categories             # Contains the images for each categories
│   └── newproducts            # Contains the images for newly launched products
|
└── Readme.md                  # Documentation of this project.
```

## Features 

- Fetches product data from 8 categories:
    - Laptops
    - Smartphones
    - Furniture
    - Home Decoration
    - Men's Shirts
    - Women's Dresses
    - Fragrances
    - Men's Shoes

- Displays product cards dynamically.
- Shows pricing with discount calculation.
- Indicates stock status.
- `"Add to Cart"` functionality.
- `"View Details"` navigation.


## API Endpoints Used

- const Laptopurl       = `"https://dummyjson.com/products/category/laptops";`
- const Smartphoneurl   = `"https://dummyjson.com/products/category/smartphones";`
- const Furnitureurl    = `"https://dummyjson.com/products/category/furniture";`
- const Lightingurl     = `"https://dummyjson.com/products/category/home-decoration";`
- const Mensurl         = `"https://dummyjson.com/products/category/mens-shirts";`
- const Womensurl       = `"https://dummyjson.com/products/category/womens-dresses";`
- const Fragrancesurl   = `"https://dummyjson.com/products/category/fragrances";`
- const Shoesurl        = `"https://dummyjson.com/products/category/mens-shoes";`

## Functions

1. fetchProducts()
    - Fetches all product categories in parallel using Promise.all.
    - Stores combined product data in the global allProducts array.
    - Calls `displayProducts()` to render them on the UI.

    ``` 
   async function fetchProducts() {
  const [laptops, smartphones, ...] = await Promise.all([...]);
  allProducts = [...laptops.products, ...smartphones.products, ...];
  displayProducts(allProducts);
    }
    ```

2. displayProducts(products)
    - Accepts an array of product objects.
    - Dynamically creates product cards with:
        - Thumbnail
        - Title
        - Price with discount
        - Stock availability
        - Action buttons

    ```
    <div class="list-products-card">
        <img src="${product.thumbnail}" alt="${product.title}">
        <h2>${product.title}</h2>
        <p>
          <span>$${product.price}</span> 
          ${
            product.discountPercentage
              ? `<del>$${(
                  product.price /
                  (1 - product.discountPercentage / 100)
                ).toFixed(2)}</del>`
              : ""
          }
        </p>
        <h3>${
          product.availabilityStatus ||
          (product.stock > 0 ? "IN STOCK" : "OUT OF STOCK")
        }</h3>
        <div class="product-buttons">
          <button type="button" class="add-to-cart" onclick="addToCart(${product.id})">
            <i class="fa fa-cart-plus" aria-hidden="true"></i>
          </button>
          <button type="button" class="view-details" onclick="viewProductDetails(${product.id}, '${product.category}')">View Details</button>
        </div>
      </div>
      ```

3. addToCart(productId)
    - Check if product exists in local storage.
    - Increase quantity if it already exists.
    - Add new product with quantity 1 if not.
    - Update localStorage.

4. viewProductDetails(id, category)
    - Redirects to product detail page with query parameters.

    ```
    product.html?id=PRODUCT_ID&category=PRODUCT_CATEGORY
    ```
5. applyFilters()
    - Filters Supported:
      - Search – by product name
      - Category – using a dropdown (`#categoryFilter`)
      - Price – low-to-high or high-to-low (`#priceFilter`)

    - Triggered by:
      - Clicking #searchButton
      - Pressing Enter in #searchInput
      - Clicking #filterButton

```
      function applyFilters() {
  const searchTerm = document.getElementById("searchInput").value.toLowerCase();
  const selectedCategory = document.getElementById("categoryFilter").value;
  const selectedPrice = document.getElementById("priceFilter").value;

  let filtered = [...allProducts];

  if (searchTerm) {
    filtered = filtered.filter((product) =>
      product.title.toLowerCase().includes(searchTerm)
    );
  }

  if (selectedCategory) {
    filtered = filtered.filter((product) => {
      const categoryMap = {
        laptops: "laptops",
        smartphones: "smartphones",
        furniture: "furniture",
        lighting: "home-decoration",
        mens: "mens-shirts",
        womens: "womens-dresses",
        fragrances: "fragrances",
        shoes: "mens-shoes",
      };
      return product.category === categoryMap[selectedCategory];
    });
  }


  if (selectedPrice === "low-to-high") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (selectedPrice === "high-to-low") {
    filtered.sort((a, b) => b.price - a.price);
  }

  displayProducts(filtered);
  }
```

## Summarization

- Created a Simple Ecommerce Application with Product listing, Filter and Searching Options, also a cart functionality.
- Able to view product details by navigating to `view-products` page. Used a query parms to handle particular product detials rendering.
- Used a local storage to handle the cart functionality.

## Demo of the Ecommerce Website.

![Ecommerce-website](./assets/ecommerce.mp4)