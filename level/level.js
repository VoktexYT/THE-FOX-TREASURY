class MakeLevel {
    constructor(obj, properties) {
        this.obj = obj;
        this.properties = properties;
    }

    create() {
        const this_ = this.obj;

        this_.cameras.main.fadeIn(200, 87, 51, 55);
        const map = this_.make.tilemap({key: this.properties["tile_json"]});
        const tileset = map.addTilesetImage(this.properties["tile_name"], this.properties["tile_image"]);
        this.deathSound = this_.sound.add("death", {loop: false, volume: 1});
        this.endSound = this_.sound.add("endSound", {loop: false, volume: 1});


        // Layers
        map.createLayer("background", tileset);
        map.createLayer("deco", tileset);
        this.layer_floor = map.createLayer("floor", tileset);
        this.layer_floor.setCollisionByExclusion([-1]);
        this.layer_damage = map.createLayer("damage", tileset);
        this.layer_damage.setCollisionByExclusion([-1]);

        // player
        this.playerIsDead = false;
        this.player = this_.physics.add.sprite(this.properties["playerPos"][0], this.properties["playerPos"][1], "player", 0).setOrigin(0, 0).setScale(0.5);
        this.player.setCollideWorldBounds(true);

        this.player.setSize(this.player.width-100, this.player.height-160);
        this.player.setOffset(50, 160);

        this.playerIsOnFloor = false;
        this.playerY = this.player.y;
        this.switchY = true;
        this.gameIsFinished = false;

        this.player.anims.create({
            key: "iddle",
            frames: this_.anims.generateFrameNumbers("player", {start: 0, end: 4}),
            frameRate: 12,
            repeat: -1
        });

        this.player.anims.create({
            key: "run",
            frames: this_.anims.generateFrameNumbers("player", {start: 28, end: 35}),
            frameRate: 12,
            repeat: -1
        });

        this.player.anims.create({
            key: "fall",
            frames: this_.anims.generateFrameNumbers("player", {start: 59, end: 60}),
            frameRate: 12,
            repeat: -1
        });
        
        // collide
        this_.physics.add.collider(this.layer_floor, this.player, (player, tile) => {
            if (tile.faceTop) {
                this.playerIsOnFloor = true;
            }
        });

        // end game
        let endGame = this_.add.rectangle(this.properties["end"]["pos"][0], 
        this.properties["end"]["pos"][1], this.properties["end"]["size"][0], this.properties["end"]["size"][1], 0xff0000);

        if (!this.properties["end"]["visible"]) {
            endGame.setVisible(false);
        }


        this_.physics.world.enableBody(endGame, Phaser.Physics.Arcade.STATIC_BODY);

        this_.physics.add.overlap(this.player, endGame, () => {
            if (!this.gameIsFinished) {
                this.gameIsFinished = true;
                this_.cameras.main.fadeOut(200, 87, 51, 55);
                this.endSound.play();
                this_.cameras.main.on('camerafadeoutcomplete', () => {
                    this_.scene.start(this.properties["end"]["nextScene"]);
                });
            }
        })

        this_.physics.add.collider(this.layer_damage, this.player, (player, tile) => {
            if (!this.playerIsDead) {
                tile.tint = 0xff0000;
                this.playerIsDead = true
                setTimeout(() => {
                    this.deathSound.play();
                    tile.tint = 0xffffff;
                    this_.cameras.main.fadeOut(200, 87, 51, 55);
                    this_.cameras.main.on('camerafadeoutcomplete', () => {
                        this_.cameras.main.fadeIn(200, 0, 0, 0);
                        this.player.setPosition(this.properties["playerPos"][0], this.properties["playerPos"][1]);
                        this.playerIsDead = false;
                        this.playerIsOnFloor = false;
                    })
                }, 200)
                
            }
        })

        this_.input.keyboard.on("keydown", (e) => {
            if (!this.playerIsDead) {
                if (e.key === " " && this.playerIsOnFloor) {
                    this.player.setVelocityY(-700);
                    this.playerIsOnFloor = false;
                }
            }
        });

        // cursor
        this.cursor = this_.input.keyboard.createCursorKeys();
    }

    update() {
        if (!this.playerIsDead) {
            if (this.cursor.left.isDown) {
                this.player.setVelocityX(-200);
                this.player.anims.play("run", true);
                this.player.setFlipX(true);
            } else if (this.cursor.right.isDown) {
                this.player.setVelocityX(200);
                this.player.anims.play("run", true);
                this.player.setFlipX(false);
            } else {
                this.player.setVelocityX(0);
                if (this.playerIsOnFloor) {
                    this.player.anims.play("iddle", true);
                    this.playerY = this.player.y
                } else {
                    if (this.player.y > this.playerY) {
                        this.player.anims.play("fall");
                    }
                }
            }
        }
        else {
            this.player.setVelocityX(0);
        }

        if (this.switchY) {
            this.switchY = false;
            this.playerY = this.player.y;
        } else {
            this.switchY = true;
        }
    }
}