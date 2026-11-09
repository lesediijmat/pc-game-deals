const games = [
    { id: 1, title: "Hollow Knight", normalPrice: 14.99, salePrice: 7.49, store: "Steam" },
    { id: 2, title: "Stardew Valley", normalPrice: 13.99, salePrice: 13.99, store: "GOG" },
    { id: 3, title: "Celeste", normalPrice: 19.99, salePrice: 4.99, store: "Steam" },
    { id: 4, title: "Hades", normalPrice: 24.99, salePrice: 12.49, store: "Epic Games" },
    { id: 5, title: "Portal 2", normalPrice: 9.99, salePrice: 0.99, store: "Steam" },
    { id: 6, title: "Terraria", normalPrice: 9.99, salePrice: 9.99, store: "GOG" },
    { id: 7, title: "Disco Elysium", normalPrice: 39.99, salePrice: 9.99, store: "GOG" },
    { id: 8, title: "Cuphead", normalPrice: 19.99, salePrice: 14.99, store: "Steam" }
];

let currentGames = games;

function displayGames(gamesToDisplay) {
    const gamesContainer = document.getElementById("games-container");

    gamesContainer.innerHTML = "";

    gamesToDisplay.forEach(function(game) {
        const gameCard = document.createElement("div");

        const saleLabel = game.salePrice < game.normalPrice
            ? "ON SALE"
            : "";

        gameCard.innerHTML = `
            <text id="sale-label">${saleLabel}</text>
            <h3>${game.title}</h3>
            <p>Store: ${game.store}</p>
            <p>Normal Price: $${game.normalPrice.toFixed(2)}</p>
            <p>Sale Price: $${game.salePrice.toFixed(2)}</p>
            
        `;

        gamesContainer.appendChild(gameCard);
    });
}

const searchInput = document.getElementById("search-input");
const saleFilter = document.getElementById("sale-filter");

function filterGames() {
    const searchTerm = searchInput.value.toLowerCase();
    const onlyOnSale = saleFilter.checked;

    const filteredGames = currentGames.filter(function(game) {
        const matchesSearch = game.title.toLowerCase().includes(searchTerm);

        const isOnSale = game.salePrice < game.normalPrice;

        return matchesSearch && (!onlyOnSale || isOnSale);
    });

    displayGames(filteredGames);
}

searchInput.addEventListener("input", filterGames);
saleFilter.addEventListener("change", filterGames);

displayGames(games);

async function loadCheapSharkDeals() {
    try {
        const response = await fetch(
            "https://www.cheapshark.com/api/1.0/deals?onSale=1&pageSize=8"
        );

        if (!response.ok) {
            throw new Error("Could not fetch game deals");
        }

        const deals = await response.json();
        const storeNames = await loadStores();

        const liveGames = deals.map(function(deal) {
            return {
                id: deal.dealID,
                title: deal.title,
                normalPrice: Number(deal.normalPrice),
                salePrice: Number(deal.salePrice),
                store: storeNames[deal.storeID] || deal.storeID
            };
        });

        currentGames = liveGames;
        filterGames();

    } catch (error) {
        console.error("Error loading deals:", error);
    }
}

async function loadStores() {
  const response = await fetch("https://www.cheapshark.com/api/1.0/stores");
  const stores = await response.json();

  const storeNames = {};

  stores.forEach(function(store) {
    storeNames[store.storeID] = store.storeName;
  });

  return storeNames;
}

loadCheapSharkDeals();