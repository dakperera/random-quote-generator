import React, { useState, useEffect} from 'react'
import './style.css'
import twitter_logo from './assets/twitter_logo2.png'
/* note: used the Photopea tool, photopea.com, to make the background
of the twitter icon transparent. */

export default function App() {
  const [rawData, setRawData] = React.useState([])
  const [getNewQuote, setGetNewQuote] = React.useState(false)
  const [randomColor, setRandomColor] = React.useState('#000000')

  /* this useEffect runs when getNewQuote is toggled, which happens when the
     button with id="new-quote" is clicked.  It will fetch the quote data from
     an api, and store it in rawData. It will also run createColor() to 
     get a new color for the app, and assign it to the <body> background */
  React.useEffect(()=>{
    fetch("https://api.quotable.io/quotes/random")
      .then(res=>res.json())
      .then(data=>{
        setRawData(data)
        const newRandomColor=createColor()
        setRandomColor(newRandomColor)
        document.body.style.backgroundColor = newRandomColor
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [getNewQuote])
  
  function getQuote(){
    setGetNewQuote(value=>!value)
  }

  //creates and returns a random color
  function createColor(){
    const letters = '0123456789ABCDEF'
    let color = '#'
    for(let i = 0; i<6; i++){
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  }

  //uses the quote text and quote author name to create a twitter post
  function tweetQuote(){
    const tweetText = rawData.length > 0 ? '"'+rawData[0].content+'" ' +rawData[0].author+' #quotes' : '';
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    window.open(tweetUrl, '_blank');
  }

  return (
    
    <main id="quote-box" className="quote">
      {rawData.length > 0 && (
        <> 
      <div id="text" style={{color: randomColor}}>{rawData[0].content} </div>
      <div id="author" style={{color: randomColor}}>- {rawData[0].author}</div>        
        </>
      )}
      <div className="buttons">
        
          <div id="twitter" onClick={tweetQuote} className="buttonsStyle" 
            style={{backgroundColor: randomColor}}>
            <img src={twitter_logo} alt="Twitter Logo" style={{width: '90%', height: '90%', objectFit:'contain'}}/>
          </div>
        
        <div id="new-quote" className="buttonsStyle" onClick={getQuote} style={{backgroundColor: randomColor}}>New Quote</div>
      </div>
    </main>
  )
}

 
