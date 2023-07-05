const game = new Phaser.Game({
    type: Phaser.AUTO,
    width: 1600,
    height: 960,
    scene: [
        Main, 
        Main2, 
        Main3,
        Main4
    ],
    
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        parent: 'core'
    },

    physics: {
        default: 'arcade',
        arcade: {
            // gravity: { y: 0 },
            gravity: { y: 1000 },
            debug: false
        }
    },

    audio: { disableWebAudio: true },

    fps: {//   '120' FPS
        target: 120,
        forceSetTimeOut: false
    },
})