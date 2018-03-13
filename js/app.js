var Game = require('./game.js');

//Calling methods on new object 'game' of constructor 'Game'
var game = new Game();

game.showFurry();
game.showCoin();
game.startGame();

//change direction on keydown
document.addEventListener('keydown', function(event) {
    game.turnFurry(event);
});