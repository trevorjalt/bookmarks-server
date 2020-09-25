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
            description: "",
            rating: '4'
        }
    ];
}

function makeMaliciousBookmark() {
    const maliciousBookmark = {
      id: 911,
      title: 'Naughty naughty very naughty <script>alert("xss");</script>',
      url: 'https://www.hackers.com',
      description: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`,
      rating: 1,
    }
    const expectedBookmark = {
      ...maliciousBookmark,
      title: 'Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;',
      description: `Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`
    }
    return {
      maliciousBookmark,
      expectedBookmark,
    }
  }
  

module.exports = {
    makeBookmarksArray,
    makeMaliciousBookmark,
};