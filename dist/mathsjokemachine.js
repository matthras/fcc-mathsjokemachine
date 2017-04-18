var mathsjokeList;
var nJokes;
// // Download the Joke List from the Google Sheets Doc using AJAX and saves it to memory.
var request = new XMLHttpRequest();
request.open('GET', 'https://sheets.googleapis.com/v4/spreadsheets/1rulgef2EIt_2wLpuPTuLvLgP-ZzEmebRIKOzmMqiKHg/values/MathsJokeList!B2:D?key=AIzaSyAmkpGHGVyMvl2M7trzqNh8SlmsXO21zfU', true);

request.onload = function() {
  if (request.status >= 200 && request.status < 400) {
    // Success!
    var data = JSON.parse(request.responseText);
    mathsjokeList = data.values;
    nJokes = data.values.length;
    if(nJokes > 0){
        document.getElementById('nJokes').innerText=nJokes;
    } else {
        document.getElementById('nJokesParagraph').innerText="This Maths Joke Machine is currently busted!";
    }
        // Delays 'generate joke' button until all joke data is loaded, otherwise clicking the button then will generate an error
        document.getElementById('initialButton').style.display = 'inline';
  } else {
    // We reached our target server, but it returned an error
    console.log('Reached target server, but it returned and error. It probably broke /s');
  }
};
request.onerror = function() {
    console.log('There was a connection error of some sort. Derp.')
  // There was a connection error of some sort
};
request.send();

var jokeNumber;
function generateJoke() {
    // Clearing out initial divs
    document.getElementById('intro').style.display = 'none';
    document.getElementById('mathsJoke').style.display = 'block';
    document.getElementById('initialButton').style.display = 'none';
    // Clearing out cantTweet
    document.getElementById('cantTweet').style.display = 'none';
    jokeNumber = Math.floor(Math.random()*nJokes);
    console.log(typeof mathsjokeList);
    console.log(mathsjokeList[jokeNumber]);
    document.getElementById('jokeQuestion').innerText=mathsjokeList[jokeNumber][0];
    if(typeof mathsjokeList[jokeNumber][1] != 'undefined') {
        document.getElementById('jokeAnswer').innerText=mathsjokeList[jokeNumber][1];
    } else {
        document.getElementById('jokeAnswer').innerText='';
    }
    if(typeof mathsjokeList[jokeNumber][2] != 'undefined') {
        document.getElementById('jokeExplanationText').innerText=mathsjokeList[jokeNumber][2];
    } else {
        document.getElementById('jokeExplanation').innerText='';
    }
}

function tweetJoke() {
    var jokeString = mathsjokeList[jokeNumber][0] + ' ' + mathsjokeList[jokeNumber][1];
    if(jokeString.length > 140) {
        document.getElementById('cantTweet').style.display = 'block';
    } else {
        var shareURL = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(jokeString);
        window.open(shareURL,'_blank');   
    }
}