var Coin = require('./coin.js');
var Furry = require('./furry.js');

module.exports = function Game() {
    this.board = document.querySelectorAll('#board div');
    this.furry = new Furry();
    this.coin = new Coin();
    this.score = 0;
    this.index = function(x,y) {
        return x + (y * 10);
    };

    this.showFurry = function() {
        this.hideVisibleFurry();
        this.board[this.index(this.furry.x, this.furry.y)].classList.add('furry');
    };

    this.showCoin = function() {
        this.board[this.index(this.coin.x, this.coin.y)].classList.add('coin');
    };

    this.startGame = function() {
        var self = this;
        this.idSetInterval = setInterval(function() {self.moveFurry()}, 250);
    };

    this.moveFurry = function() {
        if (this.furry.direction === 'left') {
            this.furry.x -= 1;
        } else if (this.furry.direction === 'right') {
            this.furry.x += 1;
        } else if (this.furry.direction === 'up') {
            this.furry.y += 1;
        } else if (this.furry.direction === 'down') {
            this.furry.y -= 1;
        }
        this.gameOver();
        this.showFurry();
        this.checkCoinCollision();
    };

    this.hideVisibleFurry = function() {
        if (document.querySelector('.furry') !== null) {
            document.querySelector('.furry').classList.remove('furry');
        }
    };

    this.turnFurry = function(event) {
        switch (event.which) {
            case 37:
                this.furry.direction = 'left';
                break;
            case 38:
                this.furry.direction = 'down';
                break;
            case 39:
                this.furry.direction = 'right';
                break;
            case 40:
                this.furry.direction = 'up';
                break;
        }
    };

    this.checkCoinCollision = function() {
        if (this.furry.x === this.coin.x && this.furry.y === this.coin.y) {
            document.querySelector('.coin').classList.remove('coin');
            this.score += 1;
            document.querySelector('#score strong').innerText = this.score;
            this.coin = new Coin();
            this.showCoin();
        }
    };

    this.endGameMessage = function() {
        var gameOverScreen = document.querySelector('#over');
        gameOverScreen.classList.remove('invisible');
        if (this.score < 3) {
            gameOverScreen.querySelector('pre').innerText = 'Oops! Game over, try again';
        } else {
            gameOverScreen.querySelector('pre').innerText = 'Congratulations, you scored: ' + this.score + ' points!';
        }
    };

    this.gameOver = function() {
        var outOfBounds = (this.furry.x < 0) || (this.furry.x > 9) || (this.furry.y < 0) || (this.furry.y > 9);
        if (outOfBounds) {
            clearInterval(this.idSetInterval);
            this.hideVisibleFurry();
            this.endGameMessage();
        }
    };
};







