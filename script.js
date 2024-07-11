const products = [
    {
        name: 'ONNIT - Alpha Brain',
        description: 'Premium Nootropic Brain Supplement, 90 Count - Caffeine-Free Focus Capsules for Concentration, Brain Booster & Memory Support',
        link: 'https://www.amazon.com/ONNIT-Alpha-Brain-90ct-Concentration/dp/B07WP7Q5BF',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuR6AeWLb-JqVhKOxEB5k37irIuk9oxymDrG_nWtAD_9wOxJex'
    },
    {
        name: 'Black Rifle Coffee',
        description: 'Black Rifle Coffee Company',
        link: 'https://www.amazon.com/Black-Rifle-Coffee-Company-Liberty/dp/B08C4S9HFW',
        img: 'https://m.media-amazon.com/images/I/41nZpuamo3L._SX300_SY300_QL70_FMwebp_.jpg'
    },
    {
        name: 'Liquid I.V.® Hydration Multiplier',
        description: 'Lemon Lime - Hydration Powder Packets',
        link: 'https://www.amazon.com/Liquid-I-V-Multiplier-Electrolyte-Supplement/dp/B01IT9NLHW',
        img: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcR83Jca3UUw7lm_E4n8j6Qx0knqWSPj52EwDByiHZ8LY2A7bIu0'
    },
    {
        name: 'Lions Mane Supplement',
        description: 'Lions Mane Mushroom for Brain Support and Immune Health',
        link: 'https://www.amazon.com/Lions-Mushroom-Capsules-Month-Supply/dp/B07PM8X5CG',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOpiBmpCevpYfBF18dZbNY7-O5rH62uQAFIE11pk0iWeLyUzS9'
    },
    {
        name: 'Butcher Knife Set',
        description: '3PCS Butcher Knife Set, Hand Forged Serbian Chef Knife & Meat Cleaver Knife',
        link: 'https://www.amazon.com/Topfeel-Butcher-Serbian-Cleaver-Cutting/dp/B0CF183C4S',
        img: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRJGAGDNxj7qxl2PNPjGXXNGmyNv7jX_3l76kMCx1TXWrRxbO2m'
    },
    {
        name: 'Native Deodorant',
        description: '72 Hour Odor Control | Deodorant for Women and Men, Aluminum Free',
        link: 'https://www.amazon.com/Native-Deodorant-Probiotics-Ingredients-Honeysuckle/dp/B08KGZ33S3',
        img: 'https://m.media-amazon.com/images/I/51owNYCft1L.jpg'
    },
    {
        name: 'Native Deodorant (Charcoal)',
        description: '72 Hour Odor Control | Deodorant for Women and Men, Aluminum Free (Charcoal)',
        link: 'https://www.amazon.com/Native-Deodorant-Aluminum-Probiotics-Charcoal/dp/B0BC23R5Y4',
        img: 'https://m.media-amazon.com/images/I/51SUoyp98RL._SL1000_.jpg'
    }
];

function headerSearch() {
    const query = document.getElementById('headerSearch').value.toLowerCase();
    const results = products.filter(product => product.name.toLowerCase().includes(query) || product.description.toLowerCase().includes(query));

    displaySearchResults('headerSearchResults', results);
}

function productSearch() {
    const query = document.getElementById('productSearch').value.toLowerCase();
    const results = products.filter(product => product.name.toLowerCase().includes(query) || product.description.toLowerCase().includes(query));

    displaySearchResults('productSearchResults', results);
    displayProducts(results);
}

function displaySearchResults(elementId, results) {
    const resultsContainer = document.getElementById(elementId);
    resultsContainer.innerHTML = '';

    results.forEach(result => {
        const resultItem = document.createElement('div');
        resultItem.classList.add('result-item');
        resultItem.innerHTML = `<a href="${result.link}" target="_blank">${result.name}</a>`;
        resultsContainer.appendChild(resultItem);
    });
}

function displayProducts(productsToDisplay) {
    const productGrid = document.querySelector('.product-grid');
    productGrid.innerHTML = '';

    productsToDisplay.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
            <img src="${product.img}" alt="Product Image">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <a href="${product.link}" class="btn">Take a Peek!</a>
        `;
        productGrid.appendChild(productElement);
    });
}

document.getElementById('headerSearch').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        window.location.href = 'products/index.html';
    }
});

document.getElementById('productSearch').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        productSearch();
    }
});

window.onload = function () {
    displayProducts(products);
};

console.log("Website loaded successfully!");