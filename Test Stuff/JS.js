var game = new Phaser.Game(1000, 550);
var mainState = {
    preload: function() {
        game.load.spritesheet('player','assets/characters_7.png', 32, 32);
        game.load.image('mountains-back','assets/mountains-back.png');
        game.load.image('mountains-mid1','assets/mountains-mid1.png');
        game.load.image('mountains-mid2','assets/mountains-mid2.png');
    },
    
    create: function() {
        //Arcade Physics
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        game.world.enableBody = true;
        
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
            
        this.cursors = game.input.keyboard.createCursorKeys();
        
        this.player = game.add.sprite(0, 400,'player');
        //sets the player's anchor to the center
        this.player.anchor.setTo(0.5, 0.5);
        this.player.scale.setTo(2);
        this.player.frame = 0;

        this.playerOldPos = 0

    },
    
    update: function() {
        
    if(this.cursors.left.isDown){
        if(this.playerOldPos != this.player.body.x){
            this.mountainsBack.tilePosition.x += 0.3;
            this.mountainsMid1.tilePosition.x += 0.7;
            this.mountainsMid2.tilePosition.x += 1.2;
        }
        this.player.body.velocity.x = -150;
    }else if (this.cursors.right.isDown) {
        if(this.playerOldPos != this.player.body.x) {
            this.mountainsBack.tilePosition.x -= 0.3;
            this.mountainsMid1.tilePosition.x -= 0.7;
            this.mountainsMid2.tilePosition.x -= 1.2;
        }
        this.player.body.velocity.x = +150;
    }else{
        this.player.body.velocity.x = 0;
    }
    
    if(this.cursors.up.isDown){
        if(this.playerOldPos != this.player.body.y){
            this.mountainsBack.tilePosition.y -= 0.3;
            this.mountainsMid1.tilePosition.y -= 0.7;
            this.mountainsMid2.tilePosition.y -= 1.2;
        }
        this.player.body.velocity.y = -200;
    }else if(this.cursors.down.isDown){
        if(this.playerOldPos != this.player.body.y) {
            this.mountainsBack.tilePosition.y += 0.3;
            this.mountainsMid1.tilePosition.y += 0.7;
            this.mountainsMid2.tilePosition.y += 1.2;
        }
        this.player.body.velocity.y = +200;
    }else{
        this.player.body.velocity.y = 0;
    }
       
    }
}
    
game.state.add('main', mainState);
game.state.start('main');