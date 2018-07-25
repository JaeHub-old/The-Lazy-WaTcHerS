

Game.main = function(game){};

var player;
var controls ;
var playerSpeed = 600;
var jumpTimer = 0;

Game.main.prototype = {
    
    create: function() {
        
        //Background Image
        this.backgroundImage = this.add.tileSprite(0, 0, 1000, 550, 'background');
        this.backgroundImage.fixedToCamera = true; 
        
        //Spikes on the Top
        this.spikesTop = this.add.tileSprite(0, 
            this.height - this.cache.getImage('spikes-top').height,
            this.width,
            this.cache.getImage('spikes-top').height,
            'spikes-top'
        ); 
        this.spikesTop.fixedToCamera = true; 
        
        //Spikes in the Middle
        this.spikesMid = this.add.tileSprite(0, 
            this.height - this.cache.getImage('spikes-mid').height,
            this.width,
            this.cache.getImage('spikes-mid').height,
            'spikes-mid'
        );
        this.spikesMid.fixedToCamera = true; 
        
        //Spikes in the Front
        this.spikesFront = this.add.tileSprite(0,
            this.height - this.cache.getImage('spikes-front').height,
            this.width,
            this.cache.getImage('spikes-front').height,
            'spikes-front'
        );
        this.spikesFront.fixedToCamera = true;
        
        //ARCADE Physics
        this.physics.startSystem(Phaser.Physics.ARCADE);
        
        //Enables Body
        this.world.enableBody = true;
        
        //Effective Map Objects for Tilemap
        this.level_1 = this.game.add.tilemap('level_1');
        this.level_1.addTilesetImage('Map1', 'mapTile1');
        
        //Layers for Background and Foreground Tilemap
        this.lavaLayer = this.level_1.createLayer('Lava');
        this.wallsLayer = this.level_1.createLayer('Walls');
        
        //Collision Tiles By Exclusion
        this.level_1.setCollisionByExclusion([9, 10, 11, 22, 23, 24], true, this.wallsLayer);
        
        //Adds Gravity to the Game
        this.physics.arcade.gravity.y = 1400;
        
        //Adds Player Sprite and Things
        this.player = this.add.sprite(736, 1472, 'spirit-player');
        //Sets the Player's Anchor Point to the Center
        this.player.anchor.setTo(0.5, 0.5);
        this.player.scale.setTo(0.7);
        this.playerOldPos = 0;
        
        //Sets Boundaries for The World
        this.world.setBounds(0, 0, 10000, 7000);
        this.camera.follow(this.player);
        
        //Adds Animations To the Character
        this.player.animations.add('idle', [0, 1, 2, 3, 4, 5, 6, 7], 10, true); 
        this.player.animations.add('right', [20, 21, 22, 23, 24, 25], 10, true);
        this.player.animations.add('jump', [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19], 10, true);
        this.physics.arcade.enable(this.player);
        this.player.body.collideWorldBounds = true;
        
        
        //CONTROLLLLLS
        controls = {
            right: this.input.keyboard.addKey(Phaser.Keyboard.D),
            left: this.input.keyboard.addKey(Phaser.Keyboard.A),
            up: this.input.keyboard.addKey(Phaser.Keyboard.W),
        }
        
        //Adds a group to the Walls
        this.walls = this.add.group();
        
    },
    
        update: function() {
        
        this.physics.arcade.collide(this.player, this.wallsLayer);
            
        this.player.body.velocity.x = 0;
            
        if(controls.right.isDown){
            if(this.playerOldPos != this.player.body.x){
                this.spikesFront -= 0.5;
                this.spikesMid -= 0.9;
                this.spikesTop -= 1.2;
            }
            this.player.animations.play('right');
            this.player.scale.setTo(0.7,0.7);
            this.player.body.velocity.x += playerSpeed;
        }
        
        if(controls.left.isDown){
            if(this.playerOldPos != this.player.body.x){
                this.spikesFront += 0.5;
                this.spikesMid += 0.9;
                this.spikesTop += 1.2;
            }
            this.player.animations.play('right');
            this.player.scale.setTo(-0.7,0.7);
            this.player.body.velocity.x -= playerSpeed;
        }
            
        if(controls.up.isDown && (this.player.body.onFloor() || this.player.body.touching.down) && this.time.now > jumpTimer){
            //Jump!
            this.player.body.velocity.y = -700;
            
            //Resets the "Jump Timer"
            jumpTimer = this.time.now + 750;
        
            this.player.animations.play('jump');
        }
            
        if(this.player.body.velocity.x === 0 && this.player.body.velocity.y === 0){
            this.player.animations.play('idle');
        }
        
    }
    
}
