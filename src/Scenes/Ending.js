class Ending extends Phaser.Scene {
    constructor() {
        super("endingScene");
    }

    preload(){
        this.load.image('back', './assets/final_back.png');
    }
    create()
    {
        // display mennu
        let menuConfig = {
            fontFamily: 'fantasy',
            fontSize: '16px',
           
            color: '#7b348c',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        // show menu text
        let centerX = game.config.width/2;
        let centerY = game.config.height/2;
        let textSpacer = 54;

        this.add.image(0, 0, 'back').setOrigin(0,0).setScale(.2,.3);
        this.add.text(centerX, centerY- textSpacer, 'Congratulations', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + 0 * textSpacer, 'You fixed the clock', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + 1 * textSpacer, 'Or did you? Time Master will return', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + 2 * textSpacer, 'Press N to return and continue', menuConfig).setOrigin(0.5);

        this.swap = this.input.keyboard.addKey('N');
        cursors = this.input.keyboard.createCursorKeys();
        //keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Down);
    }

    update()
    {
        if (Phaser.Input.Keyboard.JustDown(this.swap))
        {
            music.stop(config);
            this.scene.start('creditsScene');
        }
    } 
}

