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

function playGame() {

}