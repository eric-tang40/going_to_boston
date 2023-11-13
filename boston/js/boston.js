let totalRounds, currentRound, score1, score2, rounds1, rounds2, currentPlayer, numDice;

function startGame() {
    // other stuff that needs to be reset
    // document.getElementById('dice-result').style.display = 'none';
    document.getElementById('rounds1').textContent = rounds1;
    document.getElementById('rounds2').textContent = rounds2;

    // gets number of rounds 
    const roundsInput = parseInt(document.getElementById('rounds').value); 
    document.getElementById('rounds').value = ' ';
    document.getElementById('round-data').textContent = 'n/a';
    
    // check if the input is a valid number
    if (roundsInput % 2 === 0) {
        alert("Please enter an odd number of rounds.");
        resetPage();
        return;
    }
    
    if (isNaN(roundsInput) && document.getElementById('dice').style.display === 'none') {
        alert("Please enter a valid number of rounds.");
        resetPage();
        return; 
    }

    // initializing my variables 
    totalRounds = roundsInput;
    currentRound = 0;
    score1 = 0;
    score2 = 0;
    rounds1 = 0;
    rounds2 = 0;
    numDice = 3;
    currentPlayer = null;

    // displaying the variables values to the screen
    document.getElementById('total-rounds').textContent = totalRounds;
    document.getElementById('current-round').textContent = currentRound;
    document.getElementById('score1').textContent = score1;
    document.getElementById('score2').textContent = score2;

    // toggling the text input box to allow user to write
    if(document.getElementById('rounds').disabled) {
        document.getElementById('rounds').disabled = false;
    } 
    else {
        document.getElementById('rounds').disabled = true;
    }

    // display the dice 
    if(document.getElementById('dice').style.display == 'none') {
        document.getElementById('dice').style.display = 'block';
    }
    else {
        document.getElementById('dice').style.display = 'none';
    }

    // dealing with the button
    const diceButton = document.getElementById('dice-button');
    if(diceButton.textContent = "Roll Dice") {
        diceButton.textContent = "Roll to Decide First Player";
        diceButton.onclick = rollToDecideFirstPlayer;
    }
}

function rollToDecideFirstPlayer() {
    document.getElementById('dice-result').style.display = 'block';
    const player1_score = Math.floor(Math.random() * 6) + 1;
    const player2_score = Math.floor(Math.random() * 6) + 1;

    // display the result of the dice
    document.getElementById('dice-result').innerHTML = `Player 1: <strong>${player1_score}</strong><br>Player 2: <strong>${player2_score}</strong>`;

    // decide who won
    if (player1_score > player2_score) {
        currentPlayer = 'Player 1';
    } 
    else if (player1_score < player2_score) {
        currentPlayer = 'Player 2';
    } 
    else {
        // if tied 
        document.getElementById('dice-result').innerHTML = `Tie. Both Players scored a <strong>${player1_score}</strong>. Roll Again.`;
        rollToDecideFirstPlayer();
        return;
    }

    // declare the winner 
    document.getElementById('round-data').textContent = `${currentPlayer} goes first!`;

    // change the button to begin the game
    const diceButton = document.getElementById('dice-button');
    if(diceButton.textContent = "Roll to Decide First Player") {
        diceButton.textContent = "Roll Dice";
        diceButton.onclick = rollDice;
    }
}

function rollDice() {
    initialPlayer = currentPlayer;
    if (currentPlayer) {
        // display the current round number
        currentRound++;
        document.getElementById('current-round').textContent = currentRound;
        currentRound--;

        if (numDice === 3) {
            // roll 3 dice and get their sum
            const diceResult1 = Math.floor(Math.random() * 6) + 1;
            const diceResult2 = Math.floor(Math.random() * 6) + 1;
            const diceResult3 = Math.floor(Math.random() * 6) + 1;
            const result = diceResult1 + diceResult2 + diceResult3
            
            // diaply the dice result and current action
            document.getElementById('dice-result').innerHTML = `Dice Result: <strong>${result}</strong>`;
            document.getElementById('round-data').textContent = `${currentPlayer} just rolled ${numDice} dice for a score of ${result}`;
            
            // update scores
            if(currentPlayer === 'Player 1') {
                score1 += result;
                document.getElementById('score1').textContent = score1;
            }
            else {
                score2 += result;
                document.getElementById('score2').textContent = score2;
            }
            numDice--;
        } 
        else if(numDice === 2) {
            // roll 2 dice and get their sum
            const diceResult1 = Math.floor(Math.random() * 6) + 1;
            const diceResult2 = Math.floor(Math.random() * 6) + 1;
            const result = diceResult1 + diceResult2 
            
            // diaply the dice result and current action
            document.getElementById('dice-result').innerHTML = `Dice Result: <strong>${result}</strong>`;
            document.getElementById('round-data').textContent = `${currentPlayer} just rolled ${numDice} dice for a score of ${result}`;

            // update scores
            if(currentPlayer === 'Player 1') {
                score1 += result;
                document.getElementById('score1').textContent = score1;
            }
            else {
                score2 += result;
                document.getElementById('score2').textContent = score2;
            }
            numDice--;
        }
        else if(numDice === 1) {
            // roll 1 dice and get their sum
            const diceResult1 = Math.floor(Math.random() * 6) + 1;
            const result = diceResult1 
            
            // display the dice result and current action
            document.getElementById('dice-result').innerHTML = `Dice Result: <strong>${result}</strong>`;
            document.getElementById('round-data').textContent = `${currentPlayer} just rolled ${numDice} dice for a score of ${result}`;

            // update scores
            if(currentPlayer === 'Player 1') {
                score1 += result;
                document.getElementById('score1').textContent = score1;
            }
            else {
                score2 += result;
                document.getElementById('score2').textContent = score2;
            }
            numDice--;

            // check if game over
            if(score1 == 0 || score2 == 0) {
                currentPlayer = currentPlayer === 'Player 1' ? 'Player 2' : 'Player 1';
                numDice = 3;
            }
            else {
                currentRound++;
                if (currentRound === totalRounds) {
                    numDice = 3;
                    endGame();
                    return;
                }
                else {
                    numDice = 3;
                    checkRoundWinner();
                }
            }
        }
    }
}

function checkRoundWinner() {
    let winner = '';
    if (score1 > score2) {
        winner = 'Player 1';
        rounds1++; 
        document.getElementById('rounds1').textContent = rounds1;
        document.getElementById('round-data').textContent += `. ${winner} wins the round ${score1} to ${score2}!`;
    } else if (score1 < score2) {
        winner = 'Player 2';
        rounds2++; 
        document.getElementById('rounds2').textContent = rounds2;
        document.getElementById('round-data').textContent += `.  ${winner} wins the round ${score2} to ${score1}!`;
    } else {
        winner = 'It\'s a tie!';
    }

    // resetting variables and the screen 
    score1 = 0;
    score2 = 0;
    document.getElementById('score1').textContent = score1;
    document.getElementById('score2').textContent = score2;
}

function endGame() {
    if(rounds1 === 0 && rounds2 === 0) {
        let winner = '';
        if(score1 > score2) {
            winner = 'Player 1';
            document.getElementById('rounds1').textContent = '1';
            document.getElementById('rounds2').textContent = '0';
            document.getElementById('round-data').textContent += `. ${winner} wins the match 1 round to 0!`;
        }
        else if (score1 < score2) {
            winner = 'Player 2';
            document.getElementById('rounds1').textContent = '0';
            document.getElementById('rounds2').textContent = '1';
            document.getElementById('round-data').textContent += `. ${winner} wins the match 1 round to 0!`;
        }
        else {
            document.getElementById('round-data').textContent = `It's a tie!`;
        }
    }
    else {
        let winner = '';
        if (score1 > score2) {
            winner = 'Player 1';
            rounds1++; 
            document.getElementById('rounds1').textContent = rounds1;
            document.getElementById('round-data').textContent += `. ${winner} wins the round ${score1} to ${score2}!`;
        } else if (score1 < score2) {
            winner = 'Player 2';
            rounds2++; 
            document.getElementById('rounds2').textContent = rounds2;
            document.getElementById('round-data').textContent += `.  ${winner} wins the round ${score2} to ${score1}!`;
        } else {
            winner = 'It\'s a tie!';
        }
    }

    if (rounds1 > rounds2) {
        winner = 'Player 1';
        document.getElementById('round-data').textContent += `. ${winner} wins the match ${rounds1} rounds to ${rounds2}!`;
    } 
    else if (rounds1 < rounds2) {
        winner = 'Player 2';
        document.getElementById('round-data').textContent += `. ${winner} wins the match ${rounds2} rounds to ${rounds1}!`;
    } 
    else {
        if(rounds1 === 0 && rounds2 === 0) {
        }
        else {
            document.getElementById('round-data').textContent += `. It's a tie! No one wins the match!`;
        }
    }

    // resetting variables
    currentRound = 0;
    score1 = 0;
    score2 = 0;
    rounds1 = 0;
    rounds2 = 0;
    numDice = 3;
    currentPlayer = null;
}
