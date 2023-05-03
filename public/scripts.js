// If you would like to see some examples of similar code to make an interface interact with an API, 
// check out the coin-server example from a previous COMP 426 semester.
// https://github.com/jdmar3/coinserver

var formVisible = true;
var resultVisible = false;

// Changes visibility of form depending on options chosen in form
function showHideShots() {
    let checkbox = document.getElementById('opponent');
    let game = $('input[type=radio][name=game_choice]:checked').val();

    if (checkbox.checked == true) {
        $('.shots').show();
        if (game == 'rps') {
            $('.rpsls').hide();
        }
    } else {
        $('.shots').hide();
    }
}

// Reset the form
function reset() {
    document.getElementById('game_settings').reset();
    showHideShots();
    if (resultVisible) {
        showHideForm();
        showHideResult();
    }
}

// Play game based on values of form
async function playGame() {
    // Get game type
    let game = $('input[type=radio][name=game_choice]:checked').val();

    // Set up url for playing without an opponent
    let baseurl = window.location.href + 'app/';
    let url = baseurl + game + '/play/';

    // Append a shot if playing against an opponent
    let checkbox = document.getElementById('opponent');
    if(checkbox.checked == true) {
        let shot = $('input[type=radio][name=shot]:checked').val();
        url = url + shot
    }

    let response = await fetch(url);
    let result = await response.json();
    console.log(result);

    if (result.opponent) {
        $('#opponent_img').attr('src', 'img/' + result.opponent + '.jpg');
        $('.opponent_result').show();
    }
    $('#player_img').attr('src', 'img/' + result.player + '.jpg');
    if (result.result) {
        let game_result = document.getElementById('game_result');
        game_result.innerHTML = result.result.toUpperCase();
        $('#game_result').show();
    }

    $('#play').hide();
    $('#button_space').hide();
    showHideForm();
    showHideResult();
}

// Toggles visibility of form
function showHideForm() {
    if (formVisible) {
        $('#game_settings').hide();
        formVisible = false;
    } else {
        $('#game_settings').show();
        $('#play').show();
        $('#button_space').show();
        formVisible = true;
    }
}

// Toggles visibility of result
function showHideResult() {
    if (resultVisible) {
        $('#results').hide();
        $('#opponent_img').attr('src', '');
        $('.opponent_result').hide();
        $('#player_img').attr('src', '');
        let game_result = document.getElementById('game_result');
        game_result.innerHTML = "";
        $('#game_result').hide();
        resultVisible = false;
    } else {
        $('#results').show();
        resultVisible = true;
    }
}