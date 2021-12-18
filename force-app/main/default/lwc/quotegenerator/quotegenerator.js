import { LightningElement } from 'lwc';
import{loadStyle} from 'lightning/platformResourceLoader';
const proxyUrl = 'https://whispering-tor-04671.herokuapp.com/'
const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
export default class Quotegenerator extends LightningElement {
    _isRender = false;

quoteContainer= this.template.getElementById('quote-container');
quoteText= this.template.getElementById('quote');
authorText= this.template.getElementById('author');
twitterBtn= this.template.getElementById('twitter');
newQuoteBtn= this.template.getElementById('new-quote');
loader =this.template.getElementById('loader');
//show loading
 showLoadingSpinner(){
    loader.hidden=false;
    quoteContainer.hidden =true;
}
//Hide loading
 removeLoadingSpinner(){
    if(!loader.hidden){
        loader.hidden=true;
        quoteContainer.hidden=false;
    }
}
// Get quote from API
async  getQuote() {
    this.showLoadingSpinner();
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        console.log(data);
        // if Author is blank ,add 'Unknow'
        if(data.quoteAuthor ===''){
            this.authorText.innerText ='Unknown';
        }else{
            this.authorText.innerText = data.quoteAuthor;
        }
      
        // reduce font size for long quote
        if(data.quoteText.length > 120){
            this.quoteText.classList.add('long-quote');
        }else{
            this.quoteText.classList.remove('long-quote');
        }
        this.quoteText.innerText = data.quoteText;
        this.removeLoadingSpinner();
    } catch (error) {
        this.getQuote();
      
    }
}

// Tweet Quote
 tweetQuote(){
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl,'_blank');
}

//Event Listeners
// newQuoteBtn.addEventListener('click',getQuote);
// twitterBtn.addEventListener('click',tweetQuote);
// On Load
// getQuote(){}


    // renderedCallback(){
    //     if(!this._isRender){
    //         this._isRender = true;
    //         loadStyle(this, 'quotegenerator.css').then(()=>{
    //             console.log('loaded');
    //         }).catch(error => {
    //             console.log('error '+error);
    //         });
    //     }
    // }

}

