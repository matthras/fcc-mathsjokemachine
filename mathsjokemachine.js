/* Links
Joke List Spreadsheet: https://docs.google.com/spreadsheets/d/1rulgef2EIt_2wLpuPTuLvLgP-ZzEmebRIKOzmMqiKHg/edit#gid=0

API: https://console.developers.google.com/apis/credentials?project=plenary-beach-138712
Quickstart for quickstart.html: https://developers.google.com/sheets/quickstart/js
API Client Library: https://developers.google.com/api-client-library/javascript/
APi Reference: https://developers.google.com/sheets/reference/rest/
*/

var CLIENT_ID = '773297392043-vb3i8okt2fhrl805rmeqe1q5ggjakrt8.apps.googleusercontent.com';

var SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];

/**
 * Check if current user has authorized this application.
 */
function checkAuth() {
  gapi.auth.authorize(
    {
      'client_id': CLIENT_ID,
      'scope': SCOPES.join(' '),
      'immediate': true
    }, handleAuthResult);
}

/**
 * Handle response from authorization server.
 *
 * @param {Object} authResult Authorization result.
 */
function handleAuthResult(authResult) {
  var authorizeDiv = document.getElementById('authorize-div');
  if (authResult && !authResult.error) {
    // Hide auth UI, then load client library.
    authorizeDiv.style.display = 'none';
    loadSheetsApi();
  } else {
    // Show auth UI, allowing the user to initiate authorization by
    // clicking authorize button.
    authorizeDiv.style.display = 'inline';
  }
}

/**
 * Initiate auth flow in response to user clicking authorize button.
 *
 * @param {Event} event Button click event.
 */
function handleAuthClick(event) {
  gapi.auth.authorize(
    {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
    handleAuthResult);
  return false;
}

/**
 * Load Sheets API client library.
 */
function loadSheetsApi() {
  var discoveryUrl =
      'https://sheets.googleapis.com/$discovery/rest?version=v4';
  gapi.client.load(discoveryUrl).then(listMajors);
}

/**
 * Print the names and majors of students in a sample spreadsheet:
 * https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 */
function listMajors() {
  gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: '1rulgef2EIt_2wLpuPTuLvLgP-ZzEmebRIKOzmMqiKHg',
    range: 'Class Data!A:A', // Tells which rows/columns to grab from the spreadsheet
  }).then(function(response) {
    console.log(response)
    var range = response.result;
    if (range.values.length > 0) { // If the values in the result callback is non-empty, then
      document.getElementById('jokequote').innerHTML = range.values[Math.floor(Math.random()*range.values.length)];      }
    } else {
      document.getElementById('jokequote').innerHTML = 'No data found.';
    }
  }, function(response) {
    document.getElementById('jokequote').innerHTML = 'Error: ' + response.result.error.message;
  });
}
