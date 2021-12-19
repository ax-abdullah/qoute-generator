'use strict';
const quote = document.querySelector('.qoute');
const autherText = document.querySelector('.auther');
const newQuote = document.querySelector('.new-qoute');
const twitter = document.querySelector('.twitter-btn');
const load = document.querySelector('.load');
const container = document.querySelector('.qoute-container');

// Hide the container and show the loading sign 
function loading(){
    load.hidden = false;
    container.hidden = true;
}

// show the container and hide the loading sign after the data is received
function complete(){
    if(!load.hidden){
        container.hidden = false;
        load.hidden = true;
    }
}
/**
 * an async funtion that produces quotes from author
 * @returns {Object} an object contians data about author's name,quote text and quote link
 */
async function getQuote(){
    // start loading 
    loading();
    const proxy = 'https://whispering-tor-04671.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try{
        const respone = await fetch(proxy+apiUrl);
        if(!respone.ok) return;
        const data = await respone.json();

        // if no author just write unknown
        if(!data.quoteAuthor) autherText.innerText = 'Unknown';
        else autherText.innerText = data.quoteAuthor;

        // if the text is too much then reduce the font size
        (quote.innerText.length > 120) ? quote.classList.add('long-quote') :
         quote.classList.remove('long-quote');

        quote.innerText = data.quoteText;

        // end loading and show the container
        complete();
    }
    catch(error) {
        console.log(error.message)
        getQuote();
    }
}
getQuote();


/**
 * tweet the quote via tweeter by the twitter/intent API
 */
function tweet(){
    const textt = quote.innerText;
    const writer = autherText.innerText;
    const url = `https://twitter.com/intent/tweet?text=${textt} - ${writer}`;
    window.open(url, '_blank');
}
newQuote.addEventListener('click', getQuote);
twitter.addEventListener('click', tweet);



