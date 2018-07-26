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
        
        //LOADS MAIN MENU ASSETS
        this.load.image("gametitle", "assets/sprites/gametitle.png");
          this.load.image("playbutton", "assets/sprites/playbutton.png");
          this.load.image("menubutton", "assets/sprites/menubutton.png");
          this.load.image("resetgame", "assets/sprites/resetgame.png");
          this.load.image("thankyou", "assets/sprites/thankyou.png");
        
        //LOADING OTHER STUFF
        this.load.image('spikes-top', 'media/backgrounds/Back Spikes.png');
        this.load.image('spikes-mid', 'media/backgrounds/Mid Spikes.png');
        this.load.image('spikes-front', 'media/backgrounds/Front Spikes.png');
        this.load.image('background', 'media/backgrounds/background.png');
        this.load.spritesheet('spirit-player', 'media/sprites/characters/christopher/chris-spiritmode/idle-chrispirit.png', 38, 38);
        this.load.spritesheet('spirit-player-attacking', 'media/sprites/characters/christopher/chris-spiritmode/attack-chrispirit.png');
        this.load.tilemap('level_1', 'media/leveldesigns/Hell AWOL Map 1.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('mapTile1', 'media/leveldesigns/Map1.png');
        this.load.spritesheet('redDemon', 'media/sprites/enemies/Demon.png', 32, 32);
        this.load.spritesheet('bossDemon1', 'media/sprites/enemies/');
        
    },
    
    create: function(){
        
        //Goes to the Game
        this.state.start('MainMenu');
        
    }
};