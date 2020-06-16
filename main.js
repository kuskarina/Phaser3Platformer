let isJumping = false;
let platformHeight = 580;

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
}

function create() {

    gameState.scoreText = this.add.text(0, 40, 'Score: 0', { fontSize: '15px', fill: '#000000' });

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

    coins.create(390, 370, 'coin')


    // THERES A BUG WHERE THE HILL ISNT COLLIDING CORRECTLY -- platforms.create(560, 465, 'hill')

    //playerWorld bounds
    gameState.player.setCollideWorldBounds(true)
    //collision for platforms
    this.physics.add.collider(gameState.player, platforms, () => {
        isJumping = false;
    })

    //bug where coin isn't being destroyed when touched, also crashes game
    this.physics.add.overlap(gameState.player, coins, function (coin) {
        coin.destroy()
        gameState.score += 1;
        gameState.scoreText.setText(`Score: ${gameState.score}`);

    }, null, this)
    //Arrow key input variable
    gameState.cursors = this.input.keyboard.createCursorKeys()

    //music?
    //this.sound.play('music')
}

function update() {

    //Keyboard input
    if (gameState.cursors.left.isDown){

        gameState.player.setVelocityX(-100)

    }
    else if (gameState.cursors.right.isDown) {

        gameState.player.setVelocityX(100)

    }
    else if (gameState.cursors.up.isDown && isJumping === false)
    {
        gameState.player.setVelocityY(-200);
        isJumping = true;
    }

    else {
        gameState.player.setVelocityX(0)
    }



}

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