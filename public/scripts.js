// If you would like to see some examples of similar code to make an interface interact with an API, 
// check out the coin-server example from a previous COMP 426 semester.
// https://github.com/jdmar3/coinserver

// Changes visibility of form depending on options chosen in form
function showHideShots() {
    let checkbox = document.getElementById('opponent');
    let radiorps = document.getElementsByClassName('rps');
    let radiorpsls = document.getElementsByClassName('rpsls');

    if (checkbox.checked == true) {
        $('.shots').show()
    } else {
        $('.shots').hide()
    }
}

// Reset the form
function reset() {
    document.getElementById('game_settings').reset();
    showHideShots();
}

// Play game based on values of form
async function playGame() {
    // Get game type
    let game = $('input[type=radio][name=game_choice]:checked').val();

    // Set up url for playing without an opponent
    let baseurl = window.location.href + 'app/';
    console.log(baseurl);
    let url = baseurl + game + '/play/';

    // Append a shot if playing against an opponent
    let checkbox = document.getElementById('opponent');
    if(checkbox.checked == true) {
        let shot = $('input[type=radio][name=shot]:checked').val();
        url = url + shot
    }
    console.log(url);

    let response = await fetch(url);
    let result = await response.json();
    console.log(result);
}