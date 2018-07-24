var game = new Phaser.Game(1000, 540);
var mainState = {
    preload: function() {
        game.load.spritesheet('player','assets/characters_7.png', 32, 32.5);
        game.load.image('mountains-back','assets/mountains-back.png');
        game.load.image('mountains-mid1','assets/mountains-mid1.png');
        game.load.image('mountains-mid2','assets/mountains-mid2.png');
        game.load.tilemap('map_01', 'assets/Chris Test Map.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('mapTiles', 'assets/Platform_tilesets.png');
        game.load.image('Birb', 'assets/birb.png');
    },
    
    create: function(game) {
        
        //The Test's Background Color
        game.stage.backgroundColor = '#697e96';
        
        this.mountainsBack = game.add.tileSprite(0,
            game.height - game.cache.getImage('mountains-back').height,
            game.width,
            game.cache.getImage('mountains-back').height,
            'mountains-back'
        );
       this.mountainsBack.fixedToCamera = true;
        
        this.mountainsMid1 = game.add.tileSprite(0,
            game.height - game.cache.getImage('mountains-mid1').height,
            game.width,
            game.cache.getImage('mountains-mid1').height,
            'mountains-mid1'
        );
       this.mountainsMid1.fixedToCamera = true; 
            
        this.mountainsMid2 = game.add.tileSprite(0,
            game.height - game.cache.getImage('mountains-mid2').height,
            game.width,
            game.cache.getImage('mountains-mid2').height,
            'mountains-mid2'
        );
       this.mountainsMid2.fixedToCamera = true;
        
        //Arcade Physics
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        game.world.enableBody = true;
        
        //Effective Map Object
        this.map_01 = this.game.add.tilemap('map_01');
        this.map_01.addTilesetImage('Platform_tilesets', 'mapTiles');
        
        //Background and ForeGround
        this.bgLayer = this.map_01.createLayer('Background');
       this.wallsLayer = this.map_01.createLayer('Walls');
        
        //Collision Tiles
        this.map_01.setCollision([21, 22, 23, 24, 38, 39, 40, 41, 55, 56, 57, 58, 72, 73, 74, 75, 89, 90, 91], true, this.wallsLayer);
        
            
        this.cursors = game.input.keyboard.createCursorKeys();
        
        this.player = game.add.sprite(0, 400,'player');
        //sets the player's anchor to the center
        this.player.anchor.setTo(0.5, 0.5);
        this.player.scale.setTo(2);
        this.player.frame = 24;
        this.playerOldPos = 0;
        
        game.world.setBounds(0, 0, 4000, 800);
        game.camera.follow(this.player); 
        
        this.player.animations.add('right', [23, 24, 25, 26], 10, true);
        this.player.animations.add('jump', [28, 29, 30, 31], 10, true);

        this.player.body.gravity.y = 7000; 

        this.walls = game.add.group();
        
        new EnemyBird(0, game, player.x+400, player.y-200);
        

    },
    
    
    update: function() {
        
    game.physics.arcade.collide(this.player, this.wallsLayer); 
    
    if(!(this.cursors.left.isDown || this.cursors.right.isDown || this.cursors.up.isDown)){
        this.player.body.velocity.x = 0;
        this.player.body.velocity.y = 0;
        this.player.animations.stop();
        this.player.frame = 24;
           
    }else{
        if(this.cursors.left.isDown){
        if(this.playerOldPos != this.player.body.x){
            this.mountainsBack.tilePosition.x += 0.5;
            this.mountainsMid1.tilePosition.x += 0.9;
            this.mountainsMid2.tilePosition.x += 1.4;
        }
        this.player.body.velocity.x = -150;
        this.player.animations.play('right');
    }else if (this.cursors.right.isDown) {
        if(this.playerOldPos != this.player.body.x) {
            this.mountainsBack.tilePosition.x -= 0.5;
            this.mountainsMid1.tilePosition.x -= 0.9;
            this.mountainsMid2.tilePosition.x -= 1.4;
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
       
    },
    
    EnemyBird: function(index, game, x, y){
        this.bird = game.add.sprite(x, y, 'birb');
        this.bird.anchor.setTo(0.5, 0.5);
        this.bird.name = index.toString();
        game.physics.enable(this.bird, Phaser.Physics.ARCADE);
        this.bird.body.immovable = true;
        this.bird.body.collideWorldBounds = true;
        
        this.birdTween = game.add.tween(this.bird) .to({
            y: this.bird.y + 25
        },2000, 'Linear', true, 0, 100, true);
    }
}
    
game.state.add('main', mainState);
game.state.start('main');