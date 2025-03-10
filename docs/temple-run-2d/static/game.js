let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 400,
    physics: {
        default: 'arcade',
        arcade: { gravity: { y: 500 }, debug: false }
    },
    scene: { preload: preload, create: create, update: update }
};

let player, cursors, score = 0, scoreText, obstacles;
let game = new Phaser.Game(config);

function preload() {
    this.load.image('background', 'static/assets/background.png');
    this.load.spritesheet('player', 'static/assets/player_run.png', { frameWidth: 50, frameHeight: 50 });
    this.load.image('obstacle', 'static/assets/obstacle.png');
}

function create() {
    this.add.image(400, 200, 'background').setScale(1.5);
    
    player = this.physics.add.sprite(100, 300, 'player').setScale(1);
    player.setCollideWorldBounds(true);
    
    this.anims.create({
        key: 'run',
        frames: this.anims.generateFrameNumbers('player', { start: 0, end: 5 }),
        frameRate: 10,
        repeat: -1
    });
    
    player.play('run');

    obstacles = this.physics.add.group();
    this.time.addEvent({ delay: 1500, callback: addObstacle, callbackScope: this, loop: true });

    cursors = this.input.keyboard.createCursorKeys();

    scoreText = this.add.text(10, 10, 'Score: 0', { fontSize: '20px', fill: '#fff' });

    this.physics.add.collider(player, obstacles, gameOver, null, this);
}

function update() {
    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-350);
    }
    score++;
    scoreText.setText('Score: ' + score);
}

function addObstacle() {
    let obstacle = obstacles.create(800, 350, 'obstacle').setScale(0.5);
    obstacle.setVelocityX(-200);
    obstacle.setCollideWorldBounds(true);
}

function gameOver() {
    this.physics.pause();
    player.setTint(0xff0000);
    alert('Game Over! Your Score: ' + score);
    location.reload();
}
