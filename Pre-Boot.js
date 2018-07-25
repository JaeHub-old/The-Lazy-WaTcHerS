var Game = {};

Game.PreBoot = function(game){
    
};

Game.PreBoot.prototype = {
    init: function(){
        
        this.input.maxPointers = 1;
        
        this.stage.disableVisibilityChange = false;
    },
    
    preload: function(){
        
        //Preloads Things for The Boot Screen
        this.load.image('Loading-Bar', 'media/loadingscreen/Loading.png');
    },
    
    create: function(){
        
        //Goes to the Boot Screen
        this.state.start('Boot')
    }
}