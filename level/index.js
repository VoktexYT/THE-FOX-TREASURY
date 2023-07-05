class Main extends Phaser.Scene {
    constructor() {
        super("main")
    }

    preload() {
        this.load.image("tile_image", "tiled/PR_TileSet 80x80.png");
        this.load.tilemapTiledJSON("tile_json", "tiled/base_tiles.json")
        this.load.spritesheet("player", "assets/Fox Sprite Sheet.png", {
            frameWidth: 320, frameHeight: 320
        });
        this.load.audio("music", "assets/egyptian-hip-hop-5757.mp3");
        this.load.audio("death", "assets/pixel-death-66829.mp3");
        this.load.audio("endSound", "assets/page-turn-100277.mp3");
    }

    create() {
        this.music = this.sound.add("music", {loop: true, volume: 0.50});
        this.music.play()

        this.level = new MakeLevel(this, {
            "tile_json": "tile_json",
            "tile_name": "standard_tiles",
            "tile_image": "tile_image",

            "playerPos": [140, 500],
            "end": {
                "pos": [1400, 300],
                "size": [500, 200],
                "nextScene": "main2",
                "visible": false
            }
        });

        this.level.create();
    }

    update() {
        this.level.update();
    }
}