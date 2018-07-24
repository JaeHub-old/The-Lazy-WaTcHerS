var game = new Phaser.Game(1000, 550);
var mainState = {
    preload: function () {
        
        game.load.image('spikes-top', 'media/backgrounds/Back Spikes.png');
        game.load.image('spikes-mid', 'media/backgrounds/Mid Spikes.png');
        game.load.image('spikes-front', 'media/backgrounds/Front Spikes.png');
        game.load.image('background', 'media/backgrounds/background.png');
        game.load.spritesheet('spirit-player', 'media/sprites/characters/christopher/chris-spiritmode/idle-chrispirit.png', 38, 38);
        
    },
    
    create: function() { 
        
        //Background Image
        this.backgroundImage = game.add.tileSprite(0, 0, 1000, 550, 'background');
        this.backgroundImage.fixedToCamera = true; 
        
        //Spikes on the Top
        this.spikesTop = game.add.tileSprite(0, 
            game.height - game.cache.getImage('spikes-top').height,
            game.width,
            game.cache.getImage('spikes-top').height,
            'spikes-top'
        ); 
        this.spikesTop.fixedToCamera = true; 
        
        //Spikes in the Middle
        this.spikesMid = game.add.tileSprite(0, 
            game.height - game.cache.getImage('spikes-mid').height,
            game.width,
            game.cache.getImage('spikes-mid').height,
            'spikes-mid'
        );
        this.spikesMid.fixedToCamera = true; 
        
        //Spikes in the Front
        this.spikesFront = game.add.tileSprite(0,
            game.height - game.cache.getImage('spikes-front').height,
            game.width,
            game.cache.getImage('spikes-front').height,
            'spikes-front'
        );
        
        //Arcade Physics
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        game.world.enableBody = true;
        
        //Binds Keys to Control Character 
        this.cursors = game.input.keyboard.createCursorKeys();
        //Adds Player Sprite and Things
        this.player = game.add.sprite(0,400,'spirit-player');
        this.player.anchor.setTo(0.5, 0.5);
        this.player.scale.setTo(2);
        this.playerOldPos = 0;
        
        //Adds Animations To the Character
        this.player.animations.add('idle', [0, 1, 2, 3, 4, 5, 6, 7], 10, true); 
        this.player.animations.add('right', [20, 21, 22, 23, 24, 25], 10, true);
        this.player.animations.add('jump', [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19], 10, true);
        
    },
    
    update: function() {
        
        game.physics.arcade.collide(this.player, this.wallsLayer);
        
        if(!(this.cursors.left.isDown || this.cursors.right.isDown || this.cursors.up.isDown)){
            this.player.body.velocity.x = 0;
            this.player.animations.stop();
            this.player.animations.play('idle');
        }else{
            if(this.cursors.left.isDown){
                if(this.playerOldPos != this.player.body.x){
                    this.spikesTop.tilePosition.x += 0.5;
                    this.spikesMid.tilePositions.x += 0.9;
                    this.spikesFront.tilePositions.x += 0.5;
                }
                this.player.body.velocity.x = -150;
                this.player.animations.play('right');
            }else if(this.cursors.right.isDown){
                if(this.playerOldPos != this.player.body.x){
                    this.spikesTop.tilePosition.x -= 0.5;
                    this.spikesMid.tilePosition.x -= 0.9;
                    this.spieksFront.tilePosition.x -= 0.5;
                }
                this.player.body.velocity.x = +150;
                this.player.animations.play('right');
            }else{
                this.player.body.velocity.x = 0;
            }
            
            if(this.cursors.up.isDown){
                this.player.body.velocity.y = -400;
                this.player.animations.play('jump');
            }else{
                this.player.body.velocity.y = 0;
            }
        }
    }
}

game.state.add('main', mainState); 
game.state.start('main');