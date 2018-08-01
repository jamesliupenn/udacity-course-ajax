/* eslint-env jquery */

(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

		//Ajax way of sending async request
		$.ajax({
			url: `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`,
			headers: 
			{
				Authorization: 'Client-ID e990e0c51468af37368d9d1f96c492cfa2d1a7cff9babc661f9263d585716005'
			}
		}).done(addImage) //When done, execute addImage
		.fail(err => {
			requestError(err, 'image');
		}); //Error handling

		$.ajax({
			url: `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=53243f58daa64b6393469d74d0c3d25e`
		}).done(addArticles) //When done, execute addArticles
		.fail(err => {
			requestError(err, 'articles');
		}); //Error handling

    //The addImage fxn called onload
	function addImage(images) {
		const firstImage = images.results[0];
		responseContainer.insertAdjacentHTML('afterbegin', `<figure>
				<img src="${firstImage.urls.regular}" alt="${searchedForText}>"
				<figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
			</figure>`);
	}

	//The addArticles fxn called onload
	function addArticles (articles) {
		responseContainer.insertAdjacentHTML('beforeend', '<ul>' + articles.response.docs.map(article =>
				`<li class="article">
					<h2><a href="${article.web_url}">${article.headline.main}</a></h2>
					<p>${article.snippet}</p>
				</li>`
				).join('') + '</ul>');
	}

    });


})();
