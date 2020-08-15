// STEP 3: Create article cards.
// -----------------------
// Send an HTTP GET request to the following address: https://lambda-times-api.herokuapp.com/articles
// Study the response data you get back, closely.
// You will be creating a card for each article in the response.
// This won't be as easy as just iterating over an array though.
//
// Write a function that takes a single article object and returns the following markup:
//
// <div class="card">
//   <div class="headline">{Headline of article}</div>
//   <div class="author">
//     <div class="img-container">
//       <img src={url of authors image} />
//     </div>
//     <span>By {author's name}</span>
//   </div>
// </div>
//
// Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
//
// Use your function to create a card for each of the articles, and append each card to the DOM.

axios.get('https://lambda-times-api.herokuapp.com/articles')
    .then(res=> {
        const articles = res.data.articles;
        for(key in articles){
            articles[key].forEach(article => {
                const card = newArticle(article);
                cardsContainer.appendChild(card);
            });
        }
    })
        .catch(error =>{
            console.log(error);
    });

const cardsContainer = document.querySelector('.cards-container');

function newArticle(articleObject) {
    const card = document.createElement('div');
    const headline = document.createElement('div');
    const authorInfo = document.createElement('div');
    const authorImageContainer = document.createElement('div');
    const authorImage = document.createElement('img');
    const authorBy = document.createElement('span');

    card.classList.add('card');
    headline.classList.add('headline');
    authorInfo.classList.add('author');
    authorImageContainer.classList.add('img-container');
    authorImage.src = articleObject.authorPhoto;
    headline.textContent = articleObject.headline;
    authorBy.textContent = `By ${articleObject.authorName}`;
    
    cardsContainer.appendChild(card);
    card.appendChild(headline);
    card.appendChild(authorInfo);
    authorInfo.appendChild(authorImage);
    authorImageContainer.appendChild(authorImage);
    authorInfo.appendChild(authorBy);

    card.addEventListener('click', (e) => {
        console.log(`${articleObject.headline}`);
    });

    return card;
}
