let isJumping = 1000;
let platformHeight = 580;
let jetpackVelocity = -75;

const gameState = {
     score: 0 
    }

function preload() {

    //Loading all the sprites for the game
    this.load.image('player', 'src/player.png')
    this.load.image('hill', 'src/hill.png')
    this.load.image('platform', 'src/platform.png')
    this.load.image('background', 'src/background.png')
    this.load.image('coin', 'src/coin.png')
    this.load.audio('music', 'src/music/loopMe.mp3')
    this.load.image('rock', 'src/rock.png')
}

function create() {
    this.add.sprite(400,300, 'background')
    //this.physics.add.sprite(50, 0, 'rock')
    gameState.scoreText = this.add.text(0, 40, 'Score: 0', { fontSize: '15px', fill: '#ffffff' });
    gameState.jumpText = this.add.text(0, 0, 'Jetpack: 1000', { fontSize: '15px', fill: '#ffffff' });

    //Player character
    
    gameState.player = this.physics.add.sprite(100, 100, 'player');
    
    //PlatformGroup
    const platforms = this.physics.add.staticGroup();
    //coin group
    const coins = this.physics.add.staticGroup();
    //left-most platforms
    platforms.create(40, platformHeight, 'platform')
    platforms.create(120, platformHeight, 'platform')
    //mid-right platforms
    platforms.create(300, platformHeight, 'platform')
    platforms.create(380, platformHeight, 'platform')
    //upper platforms
    platforms.create(210, 500, 'platform')
    platforms.create(290, 420, 'platform')
    platforms.create(370, 420, 'platform')
    //coins to collect
    coins.create(390, 370, 'coin')
    coins.create(30, 500, 'coin')
    coins.create (380, 470, 'coin')


    // THERES A BUG WHERE THE HILL ISNT COLLIDING CORRECTLY -- platforms.create(560, 465, 'hill')

    //playerWorld bounds
    gameState.player.setCollideWorldBounds(true)
    //collision for platforms
    this.physics.add.collider(gameState.player, platforms, () => {
        if (isJumping < 1000){
            isJumping += 5;
            gameState.jumpText.setText(`Jetpack: ${isJumping}`);
        }
        //gameState.jumpText.setText(`Jetpack: ${isJumping}`);
    })

    /*TODO: Add hazards
    this.physics.add.collider(rock, platforms, () => {
        rock.destroy()
    })
    */

    this.physics.add.overlap(gameState.player, coins, function (player, coin) {
        coin.destroy()
        gameState.score += 1;
        gameState.scoreText.setText(`Score: ${gameState.score}`);

    }, null, this)
    
    //Arrow key input variable
    gameState.cursors = this.input.keyboard.createCursorKeys()

    //music?
    //this.sound.play('music')


    //TODO: ADD A GOAL
}

function update() {

    //Keyboard input
    if (gameState.cursors.left.isDown){

        gameState.player.setVelocityX(-100)
        gameState.player.flipX = false;

    }
    else if (gameState.cursors.right.isDown) {

        gameState.player.setVelocityX(100)
        gameState.player.flipX = true;

    }
    else if (gameState.cursors.up.isDown && isJumping > 0)
    {
        gameState.player.setVelocityY(jetpackVelocity);
        isJumping -= 5;
        gameState.jumpText.setText(`Jetpack: ${isJumping}`);
    }

    else {
        gameState.player.setVelocityX(0)
    }



}
//TODO: change over to multiple scenes and create a start scene
const config = {
    width: 800,
    height: 600,
    backgroundColor: 0x808080,
    scene: {
        preload,
        create,
        update
    },
    physics: { 
        default: 'arcade',
        arcade: {
            gravity: {y: 200},
            enableBody: true,
        }

    
    },

}

const game = new Phaser.Game(config)