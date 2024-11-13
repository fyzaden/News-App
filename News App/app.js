// const apiKey = "";

const newsContainer = document.getElementById("news-container");

const searchInput = document.getElementById("search-input");

const searchButton = document.getElementById("search-button");

async function fetchDataNews() {
  try {
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=12&apiKey=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.error("Error fetching news", error);
    return [];
  }
}

async function performSeacrh() {
  const sButton = searchInput.value.trim();
  if (sButton !== "") {
    try {
      const articles = await fetchNewsButton(sButton);
      // Add additional check to confirm that the result returned by API is an OK response
      // It would be good to also filter recieved articles as I can see articles named 'Removed' when I search for 'Google'
      displayNews(articles);
    } catch (error) {
      console.error("Error searching news", error);
    }
  }
}

searchButton.addEventListener("click", performSeacrh);
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    performSeacrh();
  }
});

// Rename the parameter from sButton to searchQuery
async function fetchNewsButton(sButton) {
  try {
    const apiUrl = `https://newsapi.org/v2/everything?q=${sButton}&pageSize=12&apiKey=${apiKey}`;
    const response = await fetch(apiUrl);
    // Add additional check to confirm that the result returned by API is an OK response
    if (!response.ok) {
      throw Error(`An error occured when fetching data from ${url}.`)
    }
    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.error("Error fetching news", error);
    return [];
  }
}

function displayNews(articles) {
  // Use innerText of textContent instead of innerHTML. InnerHTML can be a security risk.
  newsContainer.innerHTML = "";
  articles.forEach((article) => {
    const newsCard = document.createElement("div");
    newsCard.classList.add("news-card");
    if (article.urlToImage) {
      const img = document.createElement("img");
      img.src = article.urlToImage;
      img.alt = article.title;
      newsCard.appendChild(img);
    }

    const title = document.createElement("h2");
    title.textContent = article.title;
    const shortTitle =
      article.title.length > 30
        ? article.title.slice(0, 30) + "..."
        : article.title;
    title.textContent = shortTitle;

    const description = document.createElement("p");
    const shortDesc =
      article.description.length > 100
        ? article.description.slice(0, 100) + "..."
        : article.description;
    description.textContent = shortDesc;

    newsCard.appendChild(title);
    newsCard.appendChild(description);
    newsCard.addEventListener("click", (e) => {
      window.open(article.url, "_blank");
    });
    newsContainer.appendChild(newsCard);
  });
}

(async () => {
  try {
    const articles = await fetchDataNews();
    displayNews(articles);
  } catch (error) {
    console.error("Error fetching news", error);
  }
})();
