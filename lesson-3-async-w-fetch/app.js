(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

        // Using the fetch API to send a GET request to Unsplash
        fetch(`https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`, {
	    	headers: {
	    		Authorization: 'Client-ID e990e0c51468af37368d9d1f96c492cfa2d1a7cff9babc661f9263d585716005'
	    	}
	    }).then((response) => {
	    	return response.json();
	    }).then((data) => {
	    	addImage(data);
	    }).catch((e) => {
	    	console.log(e);
	    });

        // Using the fetch API to send a GET request to NYTimes
	    fetch(`http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=53243f58daa64b6393469d74d0c3d25e`, {
	    }).then((response) => {
	    	return response.json();
	    }).then((articles) => {
	    	addArticles(articles);
	    }).catch((e) => {
	    	console.log(e);
	    });

    });

    // addImage function to parse the response and show 
    // the first image onto the HTML
    function addImage(data) {
    	let htmlContent = '';
		const firstImage = data.results[0];
		if (firstImage) {
			htmlContent = `<figure>
					<img src="${firstImage.urls.regular}" alt="${searchedForText}>"
					<figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
				</figure>`;
		} else {
			htmlContent = 'No image was returned for your search';
		}

		responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
	}

	// addArticles function to parse the respones and show 
	// all the articles onto the HTML
	function addArticles(articles) {
		let htmlContent = '';
		if (articles) {
			htmlContent = '<ul>' + articles.response.docs.map(article =>
				`<li class="article">
					<h2><a href="${article.web_url}">${article.headline.main}</a></h2>
					<p>${article.snippet}</p>
				</li>`
				).join('') + '</ul>';
		} else {
			htmlContent = 'No articles found';
		}
		responseContainer.insertAdjacentHTML('beforeend', htmlContent);
	}
})();


