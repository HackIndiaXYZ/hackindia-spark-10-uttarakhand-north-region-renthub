

const defaultProducts = [
    { id: 1, name: "Laptop", price: 500, location: "delhi", rating: 5, image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400" },
    { id: 2, name: "iPhone 14", price: 700, location: "mumbai", rating: 4, image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=400" },
    { id: 3, name: "Camera", price: 400, location: "delhi", rating: 5, image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400" },
    { id: 4, name: "Bicycle", price: 200, location: "bangalore", rating: 4, image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400" },
    { id: 5, name: "PS5", price: 800, location: "bangalore", rating: 5, image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400" },
    { id: 6, name: "Smart TV", price: 600, location: "mumbai", rating: 4, image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=400" }
];

if (!localStorage.getItem('products')) {
    localStorage.setItem('products', JSON.stringify(defaultProducts));
}

const productsWrapper = document.getElementById('products-wrapper');
const searchInput = document.getElementById('search-input');
const locationFilter = document.getElementById('location-filter');
const minPriceInput = document.getElementById('min-price');
const maxPriceInput = document.getElementById('max-price');
const ratingFilter = document.getElementById('rating-filter');

function displayProducts() {
    const products = JSON.parse(localStorage.getItem('products'));
    productsWrapper.innerHTML = '';

    const searchText = searchInput.value.toLowerCase();
    const selectedLocation = locationFilter.value;
    const minPrice = parseFloat(minPriceInput.value) || 0;
    const maxPrice = parseFloat(maxPriceInput.value) || Infinity;
    const selectedRating = parseInt(ratingFilter.value) || 0;

    products.forEach(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchText);
        const matchesLocation = !selectedLocation || product.location === selectedLocation;
        const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
        const matchesRating = product.rating >= selectedRating;

        if (matchesSearch && matchesLocation && matchesPrice && matchesRating) {
            let stars = '★'.repeat(product.rating) + '☆'.repeat(5 - product.rating);
            
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <img src="${product.image}" class="product-img" alt="${product.name}">
                <div class="product-info">${product.name}</div>
                <div class="product-price">₹${product.price} / Day</div>
                <div class="product-rating">${stars}</div>
                <button class="rent-btn">Rent Now</button>
            `;
            productsWrapper.appendChild(card);
        }
    });
}

if(productsWrapper) {
    searchInput.addEventListener('input', displayProducts);
    locationFilter.addEventListener('change', displayProducts);
    minPriceInput.addEventListener('input', displayProducts);
    maxPriceInput.addEventListener('input', displayProducts);
    ratingFilter.addEventListener('change', displayProducts);
    displayProducts();
}
