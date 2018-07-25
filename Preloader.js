Game.Preloader = function(game){
    
    this.preloadBar = null;
};

Game.Preloader.prototype = {
    preload: function(){
        
        //Initialize the Team Logo
        this.teamLogo = this.add.sprite(this.world.centerX, this.world.centerY, 'Team-logo');
        
        this.teamLogo.anchor.setTo(0.5, 0.5);
        
        //Takes Care of Timing Stuff
        this.time.advancedTiming = true;
        
        this.load.setPreloadSprite(this.teamLogo);
        
        
        //LOADING ALL THE ASSETS
        
        this.load.image('spikes-top', 'media/backgrounds/Back Spikes.png');
        this.load.image('spikes-mid', 'media/backgrounds/Mid Spikes.png');
        this.load.image('spikes-front', 'media/backgrounds/Front Spikes.png');
        this.load.image('background', 'media/backgrounds/background.png');
        this.load.spritesheet('spirit-player', 'media/sprites/characters/christopher/chris-spiritmode/idle-chrispirit.png', 38, 38);
        this.load.tilemap('level_1', 'media/leveldesigns/Hell AWOL Map 1.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('mapTile1', 'media/leveldesigns/Map1.png');
        this.load.image('reddemon', 'media/sprites/enemies/Demon.png');
        
    },
    
    create: function(){
        
        //Goes to the Game
        this.state.start('main');
        
    }
};