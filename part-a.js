const games = [
  {
    "id": 1,
    "title": "Hollow Knight",
    "normalPrice": 14.99,
    "salePrice": 7.49,
    "store": "Steam"
  },
  {
    "id": 2,
    "title": "Stardew Valley",
    "normalPrice": 13.99,
    "salePrice": 13.99,
    "store": "GOG"
  },
  {
    "id": 3,
    "title": "Celeste",
    "normalPrice": 19.99,
    "salePrice": 4.99,
    "store": "Steam"
  },
  {
    "id": 4,
    "title": "Hades",
    "normalPrice": 24.99,
    "salePrice": 12.49,
    "store": "Epic Games"
  },
  {
    "id": 5,
    "title": "Portal 2",
    "normalPrice": 9.99,
    "salePrice": 0.99,
    "store": "Steam"
  },
  {
    "id": 6,
    "title": "Terraria",
    "normalPrice": 9.99,
    "salePrice": 9.99,
    "store": "GOG"
  },
  {
    "id": 7,
    "title": "Disco Elysium",
    "normalPrice": 39.99,
    "salePrice": 9.99,
    "store": "GOG"
  },
  {
    "id": 8,
    "title": "Cuphead",
    "normalPrice": 19.99,
    "salePrice": 14.99,
    "store": "Steam"
  }
]

function getGamesOnSale(games) {
    return games.filter(function(game) {
        return game.salePrice < game.normalPrice;
    });
}

function getDiscountPercentage(game) {

    const amountSaved = game.normalPrice - game.salePrice;

    const discount = (amountSaved / game.normalPrice) * 100;

    return discount;
}

function getCheapestGame(games) {
    return games.reduce(function(cheapest, game) {
        if (game.salePrice < cheapest.salePrice) {
            return game;
        }
        return cheapest;
    });
}

function searchGames(games, searchTerm) {
    return games.filter(function(game) {
        return game.title.toLowerCase().includes(searchTerm.toLowerCase());
    });
}

const discountedGames = getGamesOnSale(games);

console.log(
  "Hollow Knight discount:",
  getDiscountPercentage(games[0]).toFixed(2) + "%"
);

console.log(
  "Cheapest game:",
  getCheapestGame(games)
);

console.log(
  "Search results for 'Hades':",
  searchGames(games, "Hades")
);