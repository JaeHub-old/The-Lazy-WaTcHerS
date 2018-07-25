var Game = {};

Game.Boot = function(game){
    
};

Game.Boot.prototype = {
    init: function(){
        
        this.input.maxPointers = 1;
        
        this.stage.disableVisibilityChange = true;
    },
    
    preload: function(){
        
        //Preloads Things for the Loading Screen
        this.load.image('Team-logo', 'media/lazywatcherslogo.png');
    },
    
    create: function(){
        
        //Goes to the Preload Bar
        this.state.start('Preloader');
    },
    
    
}

