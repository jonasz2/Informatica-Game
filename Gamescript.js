let player = null;
let playerSpeed = 10;
let explosions = [];
let shootTimer = 0;
let explosionLife = 100;
let shotsPerSecond = 2;
let friendlyMissiles = [];
let enemyMissiles = null;
let gun = null;
let enemyShootTimer = 0;
let enemyShotsPerSecond = 1;


function setup() {
    createCanvas(600, 400);

    player = createSprite(width / 2, height / 2, 20, 20);
    player.draw = DrawPlayer;

    gun = createSprite(width / 2, height - 50, 25, 25);

    angleMode(DEGREES);

}

function draw() {
    background(0, 0, 0);

    MovePlayer();

    drawSprites();

    RemoveDeadExplosions();

    Shoot();

    EnemyShootMissile();

}

function EnemyShootMissile() {
    function Shoot() {
        enemyShootTimer += deltaTime;
        if (keyIsDown(32) && enemyShootTimer >= 1000 / shotsPerSecond) {
            CreateEnemyMissiles();
            enemyShootTimer = 0;
        }
    }
}

function CreateFriendlyMissiles() {
    let startPosition = gun.position.copy();
    let endPosition = player.position.copy();
    let direction = p5.Vector.sub(endPosition, startPosition);

    let missile = createSprite(startPosition.x, startPosition.y, 5, 5);
    missile.setSpeed(5, direction.heading());
    missile.draw = DrawFriendlyMissile;
    missile["goal"] = endPosition;

}

function CreateEnemyMissiles() {
    let startX = random(0, width);
    let startPosition = createVector(startX, 0);
    let endX = random(0, width);
    let endPosition = createVector(endX, height);
    let direction = p5.Vector.sub(endPosition, startPosition);

    let missile = createSprite(startPosition.x, startPosition.y, 5, 5);
    missile.setSpeed(5, direction.heading());
    missile["goal"] = endPosition;

    missile.draw = DrawEnemyMissile;

}

function DrawFriendlyMissile() {
    circle(0, 0, this.width);

    let distance = p5.Vector.dist(this.position, this.goal);
    if (distance < 5) {
        this.remove();
        CreateExplosion(this.position.x, this.position.y);
    }

}

function DrawEnemyMissile() {
    circle(0, 0, this.width);

    let distance = p5.Vector.dist(this.position, this.goal);
    if (distance < 5) {
        this.remove();
        CreateExplosion(this.position.x, this.position.y);
    }

}

function RemoveDeadExplosions() {
    if (explosions.length > 0 && explosions[0].life == 0) {
        explosions.shift();
    }
}

function Shoot() {
    shootTimer += deltaTime;
    if (keyIsDown(32) && shootTimer >= 1000 / shotsPerSecond) {
        CreateFriendlyMissiles();
        shootTimer = 0;
    }
}

function CreateExplosion(x, y) {
    let explosion = createSprite(x, y, 5, 5);
    explosion.life = explosionLife;
    explosion.draw = DrawExplosion;
    explosions.push(explosion);
}

function DrawExplosion() {
    circle(0, 0, this.width);
    this.width++;
    this.height++;
}

function DrawPlayer() {
    fill(0, 0, 0);
    stroke(255, 255, 255);
    strokeWeight(3);
    circle(0, 0, this.width);

    line(0, 5, 0, 20);
    line(0, -5, 0, -20);
    line(5, 0, 20, 0);
    line(-5, 0, -20, 0)


    /* line(0, 0, 0, 50);
     line(0, 50, -10, 70);
     line(0, 50, 10, 70);
     line(0, 25, -20, 0);
     line(0, 25, 20, 40);
 
     rect(30, 50, 30, 20, 5) */
}

function MovePlayer() {
    let playerSpeed = 5;
    if (keyIsDown(DOWN_ARROW)) {
        player.position.y += playerSpeed;
    }

    if (keyIsDown(UP_ARROW)) {
        player.position.y -= playerSpeed;
    }

    if (keyIsDown(LEFT_ARROW)) {
        player.position.x -= playerSpeed;
    }

    if (keyIsDown(RIGHT_ARROW)) {
        player.position.x += playerSpeed;
    }

}