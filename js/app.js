const categoryNavigation = document.getElementById("categoryNavigation");

const productsGrid = document.getElementById("productsGrid");

const categoryTitle = document.getElementById("categoryTitle");

const productCount = document.getElementById("productCount");

const searchInput = document.getElementById("searchInput");

const noResults = document.getElementById("noResults");

let activeCategory = "all";


// CREATE CATEGORIES
function renderCategories() {

    categoryNavigation.innerHTML = "";

    const allButton = document.createElement("button");

    allButton.className = "category-btn active";

    allButton.textContent = "Të gjitha";

    allButton.addEventListener("click", () => {

        activeCategory = "all";

        searchInput.value = "";

        renderCategories();

        renderProducts();

    });

    categoryNavigation.appendChild(allButton);


    restaurantMenu.categories.forEach(category => {

        const button = document.createElement("button");

        button.className = "category-btn";

        if (activeCategory === category.id) {

            button.classList.add("active");

        }

        button.textContent = `${category.icon} ${category.name}`;

        button.addEventListener("click", () => {

            activeCategory = category.id;

            searchInput.value = "";

            renderCategories();

            renderProducts();

        });

        categoryNavigation.appendChild(button);

    });


    const buttons = categoryNavigation.querySelectorAll(".category-btn");

    buttons.forEach((button, index) => {

        const isActive = index === 0
            ? activeCategory === "all"
            : restaurantMenu.categories[index - 1].id === activeCategory;

        button.classList.toggle("active", isActive);

    });

}


// CREATE PRODUCTS
function renderProducts() {

    productsGrid.innerHTML = "";

    const searchValue = searchInput.value
        .toLowerCase()
        .trim();


    let filteredProducts = restaurantMenu.products.filter(product => {

        const matchesCategory =
            activeCategory === "all" ||
            product.category === activeCategory;

        const matchesSearch =
            product.name.toLowerCase().includes(searchValue) ||
            product.description.toLowerCase().includes(searchValue);

        return matchesCategory && matchesSearch;

    });


    // CATEGORY TITLE
    if (activeCategory === "all") {

        categoryTitle.textContent = "Të gjitha produktet";

    } else {

        const category = restaurantMenu.categories.find(
            item => item.id === activeCategory
        );

        categoryTitle.textContent = category
            ? category.name
            : "Menuja";

    }


    // PRODUCT COUNT
    productCount.textContent = `${filteredProducts.length} produkte`;


    // NO RESULTS
    if (filteredProducts.length === 0) {

        noResults.hidden = false;

        return;

    }

    noResults.hidden = true;


    // PRODUCT CARDS
    filteredProducts.forEach(product => {

        const card = document.createElement("article");

        card.className = "product-card";


        const image = document.createElement("img");

        image.src = product.image;

        image.alt = product.name;

        image.loading = "lazy";

        image.onerror = () => {

            image.src = "https://placehold.co/600x400?text=No+Image";

        };


        const content = document.createElement("div");

        content.className = "product-content";


        const name = document.createElement("h3");

        name.textContent = product.name;


        const description = document.createElement("p");

        description.textContent = product.description;


        const price = document.createElement("div");

        price.className = "product-price";

        price.textContent = `${product.price} ден.`;


        content.appendChild(name);

        content.appendChild(description);

        content.appendChild(price);


        card.appendChild(image);

        card.appendChild(content);


        productsGrid.appendChild(card);

    });

}


// SEARCH
searchInput.addEventListener("input", () => {

    renderProducts();

});


// INITIALIZE
renderCategories();

renderProducts();
