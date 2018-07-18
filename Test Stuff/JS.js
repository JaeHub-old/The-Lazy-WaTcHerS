var game = new Phaser.Game(2048, 900);

var mainState = {
    preload: function() {
        game.load.image('player','assets/');
        game.load.image('mountains-back','assets/mountains-back.png');
        game.load.image('mountains-mid1','assets/mountains-mid1.png');
        game.load.image('mountains-mid2','assets/mountains-mid2.png');
    },
    
    create: function() {
        //Arcade Physics
        this.game.physics.startSystem(Phaser.Physics.ARCADE),
        
        //The Test's Background Color
        this.game.stage.backgroundColor = '#697e96';
        
        this.mountainsBack = this.game.add.tileSprite(0,
            this.game.height - this.game.cache.getImage('mountains-back').height,
            this.game.width,
            this.game.cache.getImage('mountains-back').height,
            'mountains-back'
        ),
        
        this.mountainsMid1 = this.game.add.tileSprite(0,
            this.game.height - this.game.cache.getImage('mountains-mid1').height,
            this.game.width,
            this.game.cache.getImage('mountains-mid1').height,
            'mountains-mid1'
        ),
            
        this.mountainsMid2 = this.game.add.tileSprite(0,
            this.game.height - this.game.cache.getImage('mountains-mid2').height,
            this.game.width,
            this.game.cache.getImage('mountains-mid2').height,
            'mountains-mid2'
        )
    },
    
    update: function() {
        this.mountainsBack.tilePosition.x -= 0.05;
        this.mountainsMid1.tilePosition.x -= 0.3;
        this.mountainsMid2.tilePosition.x -=0.75;
    },     
}
    
game.state.add('main', mainState);
game.state.start('main');