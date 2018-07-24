var Game = {};

Game.Boot = function(game){
    
};

Game.Boot.prototype = {
    init:function(){
        
        this.input.maxPointers = 1;
        
        this.stage.disableVisibilityChange = true;
    },   
    
    preload: function(){
        
        this.load.image('preloaderBar', 'media/');
    },
    
    create: function(){
        
        //Goes to the Preload Bar
        this.state.start('Preloader');
    }
}