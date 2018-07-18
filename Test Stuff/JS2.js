var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'parallax'
);

game.state.add('main', mainState);
game.state.start('main');

  var cursors;

var player; 
var playerOldPos = {
    x: 0,
    y: 0
};
var parallax1;
var parallax2;
var parallax3;

var mainState = {
  
preload: function() {
    
    game.load.image('background0', 'assets/mountains-back.png');
    
    game.load.image('background1', 'assets/mountains-mid1.png');
    
    game.load.image('background2', 'assets/mountains-mid2.png');
    
    //game.load.spritesheet('player', 'assets/ ')
},

create: function() {
    parallax1 = game.add.tileSprite(0, 0, 800, 600, 'background0');
    parallax1.fixedToCamera = true; 
    
    parallax2 = game.add.tileSprite(0, 0, 800, 600, 'background1');
    parallax2.fixedToCamera = true;
    
    parallax3 = game.add.tileSprite(0, 0, 800, 600, 'background2');
    parallax3.fixedToCamera = true;
    
//    player = game.add.spite(0, 800, 'player', 1);
    
    cursors = game.input.keyboard.createCursorKeys();

},

update: function() {
    if(cursors.left.isDown){
        if(player.OldPos.x != player.body.x){
            parallax1.tilePosition.x += 0.1;
            parallax2.tilePosition.x += 0.3;
            parallax3.tilePosition.x += 0.6;
        }
        player.body.velocity.x = -150;
    }
    
    else if (cursors.right.isDown) {
        if(playerOldPos.x != player.body.x) {
            parallax1.tilePosition.x -= 0.1;
            parallax2.tilePosition.x -= 0.3;
            parallax3.tilePosition.x-= 0.6;
    }
    player.body.velocity.x = +150;
    
}
    
}
    
}
