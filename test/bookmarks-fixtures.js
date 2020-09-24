function makeBookmarksArray() {
    return [
        {
            id: 1,
            title: "Apple",
            url: "https://www.apple.com",
            description: "All the pretty things",
            rating: '5'
        },
        {
            id: 2,
            title: "Google",
            url: "https://www.google.com",
            description: "All the services",
            rating: '5'
        },
        {
            id: 3,
            title: "Pokemon",
            url: "https://www.pokemon.com",
            description: "Gotta catch em all",
            rating: '5'
        },
        {
            id: 4,
            title: "Amazon",
            url: "https://www.amazon.com",
            description: "",
            rating: '4'
        },
        {
            id: 5,
            title: "Politico",
            url: "https://www.politico.com",
            description: "",
            rating: '3'
        },
        {
            id: 6,
            title: "Yahoo",
            url: "https://www.yahoo.com",
            description: null,
            rating: '4'
        }
    ];
}
  
  module.exports = {
    makeBookmarksArray,
  };