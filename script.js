const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function complete() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

let apiQuotes = [];

// Show New Quotes
function newQuotes() {
    loading();
    //Pick a random quote from apiQuote array
    const quote=apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    //Check if the auther field is blank and replace it with 'Unknown'
    if(!quote.author){
        authorText.textContent = 'Unknown';
    }
    else {
        authorText.textContent = '~'+quote.author;
    }
    quoteText.textContent = quote.text;

    //Check Quote length to determine styling
    if(quote.text.length>120){
        quoteText.classList.add('long-quote');
    }
    else{
        quoteText.classList.remove('long-quote');
    }
    complete();
}
// Get quotes from API

async function getQuotes() {
    loading();
    const apiURL='https://type.fit/api/quotes';
    try {
        const response = await fetch(apiURL);
        apiQuotes = await response.json();
        newQuotes();
    }
    catch (error) {
    // Catch error here
    }
}

//Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} ~ ${authorText.textContent}`;
    window.open(twitterUrl,'_blank');
}

//Event Listeners
newQuoteBtn.addEventListener('click', newQuotes);
twitterBtn.addEventListener('click', tweetQuote);

// on load

getQuotes();