Game.Preloader = function(game){
    
    this.preloadBar = null;
};

Game.Preloader.prototype = {
    preload: function(){
        
        //Initialize the PreloadBar
        this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY, 'preloaderBar');
        
        this.preloaderBar.anchor.setTo(0.5, 0.5);
        
        //Takes care of Time Stuff
        this.time.advancedTiming = true;
        
        this.load.setPreloadSprite(this.preloadBar);
        
        
        //LOADING ALL THE ASSETS
    },
    
    create: function(){
        
        //Goes to the Game
        this.state.start('main');
        
    }
}