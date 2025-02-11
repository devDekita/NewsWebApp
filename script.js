async function fetchNews() {
    const location = document.getElementById('location').value;
    const newsList = document.getElementById('news-list');
    newsList.innerHTML = ''; // Clear previous results

    if (!location) {
      alert('Please enter a location.');
      return;
    }

    const apiKey = '63019e79f34b4b76bae8b39d9e4c02c3'; 
    const apiUrl = `https://newsapi.org/v2/top-headlines?q=${location}&apiKey=${apiKey}`;

    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.articles && data.articles.length > 0) {
        data.articles.forEach(article => {
          const newsItem = document.createElement('li');
          newsItem.className = 'news-item';
          newsItem.innerHTML = `
            <h3>${article.title}</h3>
            <p>${article.description || 'No description available.'}</p>
            <a href="${article.url}" target="_blank">Read more</a>
          `;
          newsList.appendChild(newsItem);
        });
      } else {
        newsList.innerHTML = '<p>No news found for this location.</p>';
      }
    } catch (error) {
      console.error('Error fetching news:', error);
      newsList.innerHTML = '<p>Something went wrong. Please try again later.</p>';
    }
  }