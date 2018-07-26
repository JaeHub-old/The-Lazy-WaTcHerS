RedDemon = function(index, game, x, y){
    
    this.demon = game.add.sprite(x, y, 'redDemon');
    this.demon.frame = 0; 
    this.demon.anchor.setTo(0.5, 0.5);
    this.demon.name = index.toString();
    game.physics.enable(this.demon, Phaser.Physics.ARCADE);
    this.demon.body.immovable = true; 
    this.demon.body.collideWorldBounds = true;
    this.demon.body.allowGravity = false;
    
    this.demonTween = game.add.tween(this.demon).to({
        y: this.demon.y + 25
    }, 2000, 'Linear', true, 0, 100, true);
    this.enemy1 = this.demon;
}

var enemy1;

Game.main = function(game){};

var player;
var controls ;
var playerSpeed = 600;
var jumpTimer = 0;

Game.main.prototype = {
    
    create: function(game) {
        
        //Background Image
        this.backgroundImage = this.add.tileSprite(0, 0, 1000, 550, 'background');
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
//        this.enemy1 = game.add.group();
        
        RedDemon.bind(this)(0, game, this.player.x + 400, this.player.y -200);
        
        this.map = this.game.add.tilemap('level_1');
        this.map.setTileIndexCallback([15, 16, 17, 18, 19, 20, 21], die, this.game);
        
    },
    
    
    
    update: function(game) {
        
        this.physics.arcade.collide(this.player, this.wallsLayer);
            
        this.player.body.velocity.x = 0;
            
        if(controls.right.isDown){
            if(this.playerOldPos != this.player.body.x){
                this.spikesFront.tilePosition.x -= 0.5;
                this.spikesMid.tilePosition.x -= 0.9;
                this.spikesTop.tilePosition.x -= 1.2;
            }
            this.player.animations.play('right');
            this.player.scale.setTo(0.7,0.7);
            this.player.body.velocity.x += playerSpeed;
        }
        
        if(controls.left.isDown){
            if(this.playerOldPos != this.player.body.x){
                this.spikesFront.tilePosition.x += 0.5;
                this.spikesMid.tilePosition.x += 0.9;
                this.spikesTop.tilePosition.x += 1.2;
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
        
        //Plays Idle Animation
        if(this.player.body.velocity.x === 0 && this.player.body.velocity.y === 0){
            this.player.animations.play('idle');
        }
        
        //Checks if Player Runs Into Enemy
        game.physics.arcade.overlap(this.player, this.enemy1, this.restart, null, this);
        },
        
    
    restart : function (game) {
        game.game.state.start('main');
    },
    

    
}

function die(sprite, tile, game){
    console.log('hi', game);
    game.game.state.start('main');
}

//function checkOverlap(spriteA, spriteB){
//        
//        var boundsA = spriteA.getBounds();
//        var boundsB = spriteB.getBounds();
//        
//        return Phaser.Rectangle.intersects(boundsA, boundsB);
//    }

