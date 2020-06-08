class Ending extends Phaser.Scene {
    constructor() {
        super("endingScene");
    }

    create()
    {
        // display mennu
        let menuConfig = {
            fontFamily: 'fantasy',
            fontSize: '16px',
            backgroundColor: '#7aa1a0',
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

        this.add.text(centerX, centerY- textSpacer, 'Congratulations', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + 0 * textSpacer, 'You fixed the clock', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + 1 * textSpacer, 'For now', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + 1 * textSpacer, 'Press N to return to continue', menuConfig).setOrigin(0.5);

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

