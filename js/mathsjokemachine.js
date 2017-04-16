// Client ID and API key from the Developer Console
var CLIENT_ID = '751459220695-q93iap2b4hbn0j08jv3pb7h1lms4mkel.apps.googleusercontent.com';
// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";
var authorizeButton = document.getElementById('authorize-button');
var signoutButton = document.getElementById('signout-button');
/* On load, called to load the auth2 library and API client library. */
function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}
/* Initializes the API client library and sets up sign-in state listeners. */
function initClient() {
    gapi.client.init({
        discoveryDocs: DISCOVERY_DOCS,
        clientId: CLIENT_ID,
        scope: SCOPES
    }).then(function () {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        authorizeButton.onclick = handleAuthClick;
        signoutButton.onclick = handleSignoutClick;
    });
}
/*  Called when the signed in status changes, to update the UI appropriately. 
    After a sign-in, the API is called. */
function updateSigninStatus(isSignedIn) {
if (isSignedIn) {
    //authorizeButton.style.display = 'none';
    //signoutButton.style.display = 'block';
    loadJokesIntoMemory();
    //listMajors();
} else {
    authorizeButton.style.display = 'block';
    signoutButton.style.display = 'none';
}
}

/* Sign in the user upon button click. */
function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}
/* Sign out the user upon button click. */
function handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
}

// Initial setup 

// Download the Joke List from the Google Sheets Doc and saves it to memory.
var mathsjokeList;
var nJokes;
function loadJokesIntoMemory() {
    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: '1rulgef2EIt_2wLpuPTuLvLgP-ZzEmebRIKOzmMqiKHg',
        range: 'MathsJokeList!B2:D',
    }).then(function(res) {
        mathsjokeList = res.result.values;
        nJokes = res.result.values.length;
        if(nJokes > 0){
            document.getElementById('nJokes').innerText=nJokes;
        } else {
            document.getElementById('nJokesParagraph').innerText="This Maths Joke Machine is currently busted!";
        }
        document.getElementById('initialButton').style.display = 'inline';
    }, function(response) {
        document.getElementById('nJokesParagraph').innerText="This Maths Joke Machine is currently busted!";
        console.log('Error: ' + response.result.error.message);
    });
}

var jokeNumber;
function generateJoke() {
    document.getElementById('intro').style.display = 'none';
    document.getElementById('mathsJoke').style.display = 'block';
    document.getElementById('initialButton').style.display = 'none';
    jokeNumber = Math.floor(Math.random()*nJokes);
    document.getElementById('jokeQuestion').innerText=mathsjokeList[jokeNumber][0];
    if(typeof mathsjokeList[jokeNumber][1] != 'undefined') {
        document.getElementById('jokeAnswer').innerText=mathsjokeList[jokeNumber][1];
    }
    if(typeof mathsjokeList[jokeNumber][2] != 'undefined') {
        document.getElementById('jokeExplanation').innerText=mathsjokeList[jokeNumber][2];
    }
}