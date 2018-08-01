(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

        
        //XHR way of sending GET requests
         
        //1 - Create an XHR object with XMLHttpRequest on submission
        const unsplashRequest = new XMLHttpRequest();
        //2 - Fetch resource by sending a GET request
	   	unsplashRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
	    //3 - Point this to a function when fetch is successful
	    unsplashRequest.onload = addImage;
	    //4 - Error handling
	    unsplashRequest.onerror = function (err) {
	    	requestError(err, 'image');
	    };
	    //Optional - set request header if needed
		unsplashRequest.setRequestHeader('Authorization', 'Client-ID <your_client_ID>');
		//5 - Send the request
		unsplashRequest.send();

		//1
		const articleRequest = new XMLHttpRequest();
		//2
		articleRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=<your_api_key>`);
		//3
		articleRequest.onload = addArticles;
		//4
		articleRequest.onerror = function (err) {
			requestError(err, 'article');
		};
		//5
		articleRequest.send();

    //The addImage fxn called onload
	function addImage() {
		let htmlContent = '';
		const data = JSON.parse(this.responseText);
		const firstImage = data.results[0];

		if (data && data.results && data.results[0]) {
			htmlContent = 
			`<figure>
				<img src="${firstImage.urls.regular}" alt="${searchedForText}>"
				<figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
			</figure>`;
		} else {
			htmlContent = '<div class="error-no-image">No images available</div>';
		}
		responseContainer.insertAdjacentHTML('afterbegin', htmlContent);

	}

		//The addArticles fxn called onload
		function addArticles () {
			let htmlContent = '';
			const data = JSON.parse(this.responseText);

			if (data.response && data.response.docs && data.response.docs.length > 1) {
				htmlContent = '<ul>' + data.response.docs.map(article =>
					`<li class="article">
						<h2><a href="${article.web_url}">${article.headline.main}</a></h2>
						<p>${article.snippet}</p>
					</li>`
					).join('') + '</ul>';
			} else {
				htmlContent = '<div class="error-no-articles">No articles available</div>';
			}

			responseContainer.insertAdjacentHTML('beforeend', htmlContent);
		}
    });



})();




