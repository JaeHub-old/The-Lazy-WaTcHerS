Game.MainMenu = function(game){
    
};

var game;
var menuGroup;

Game.MainMenu.prototype = {

     preload: function(game){
//          game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
//		game.scale.setScreenSize = true;
//          game.scale.pageAlignHorizontally = true;
//		game.scale.pageAlignVertically = true;
          game.stage.backgroundColor = "#131313";
     },
    
    create: function(game){
          var title = game.add.sprite(game.width / 2, 120, "gametitle");
          title.anchor.set(0.5, 0.5);
          title.scale.setTo(0.4);
          var playButton = game.add.button(game.width / 2, game.height / 2 + 100, "playbutton", function(){
             game.state.start('main'); 
          }, this, 2, 1, 0);
          playButton.anchor.set(0.5, 0.5);
          playButton.scale.setTo(0.5);
          menuGroup = game.add.group();
          var menuButton = game.add.button(game.width / 2, game.height - 20, "menubutton", toggleMenu);
          menuButton.anchor.set(0.5, 0.5);
          menuButton.scale.set(0.5);
          menuGroup.add(menuButton);
          var resetGame = game.add.button(game.width / 2, game.height + 100, "resetgame", function(){});
          resetGame.anchor.set(0.5, 0.5);
          resetGame.scale.setTo(0.5);
          menuGroup.add(resetGame);
          var thankYou = game.add.button(game.width / 2, game.height + 130, "thankyou", function(){});
          thankYou.anchor.set(0.5);
          thankYou.scale.setTo(0.5);
          menuGroup.add(thankYou);  
        
     },
    
    update: function(game){
        
    }
    
}

function toggleMenu(){
     if(menuGroup.y == 0){
          var menuTween = game.add.tween(menuGroup).to({
               y: -180     
          }, 300, Phaser.Easing.Bounce.Out, true);
     }
     if(menuGroup.y == -180){
          var menuTween = game.add.tween(menuGroup).to({
               y: 0    
          }, 500, Phaser.Easing.Bounce.Out, true);     
     }
}
    

    

