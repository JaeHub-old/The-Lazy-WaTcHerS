var game = new Phaser.Game(1000, 540);
var mainState = {
    preload: function() {
        game.load.spritesheet('player','assets/characters_7.png', 32, 35);
        game.load.tilemap('level1', 'assets/Chris Test Map.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('mapTiles', 'assets/Platform_tilesets.png');
    },
    
    create: function() {
        
        //Starts physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        //Adds the Physics Engine to All Objects
        game.world.enableBody = true;
        
        //Other Objects, etc
        this.level1 = this.game.add.tilemap('level1');
        this.level1.addTilesetImage('Platform_tilesets', 'mapTiles');
        
        //Background and ForeGround
       this.bgLayer = this.level1.createLayer('Background');
       this.wallsLayer = this.level1.createLayer('Walls');
        
        //Collision Tiles
        this.level1.setCollision([5, 6, 7, 8, 90, 91, 92], true, this.wallsLayer);
        
        this.cursors = game.input.keyboard.createCursorKeys();
        
        this.player = game.add.sprite(0, 400,'player');
        //sets the player's anchor to the center
        this.player.anchor.setTo(0.5, 0.5);
        this.player.scale.setTo(2);
        this.player.frame = 24;
        
        //sets the gravity of the player
        this.player.body.gravity.y = 700; 
        
        this.player.animations.add('right', [23, 24, 25, 26], 10, true);
        this.player.animations.add('jump', [28, 29, 30, 31], 10, true);
        
        this.walls = game.add.group();
        

    },
    
    update: function() {
        
    game.physics.arcade.collide(this.player, this.wallsLayer); 
    
    if(!(this.cursors.left.isDown || this.cursors.right.isDown || this.cursors.up.isDown || this.cursors.down.isDown)){
        this.player.body.velocity.x = 0;
        this.player.body.velocity.y = 0;
        this.player.animations.stop();
        this.player.frame = 24;
           
    }else{
        if(this.cursors.left.isDown){
        this.player.body.velocity.x = -150;
        this.player.animations.play('right');
    }else if (this.cursors.right.isDown) {
        this.player.body.velocity.x = +150;
        this.player.animations.play('right');
    }else{
        this.player.body.velocity.x = 0;
    }
    
    if(this.cursors.up.isDown){
        this.player.body.velocity.y = -200;
        this.player.animations.play('jump');
    }else if(this.cursors.down.isDown){
        this.player.body.velocity.y = +200;
    }else{
            this.player.body.velocity.y = 0;
         }
        
    }  
       
    }
}
    
game.state.add('main', mainState);
game.state.start('main');