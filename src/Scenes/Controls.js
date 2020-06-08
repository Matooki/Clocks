class Controls extends Phaser.Scene {
    constructor() {
        super("controlsScene");
    }

    preload()
    {
        this.load.image('control', './assets/Controls.png');
        
    }

    create()
    {
        
        this.add.image(0, 0, 'control').setOrigin(0,0);
        

        cursors = this.input.keyboard.createCursorKeys();
        this.swap = this.input.keyboard.addKey('N');
        this.controls = this.input.keyboard.addKey('I');
        //keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Down);

        music = this.sound.add('song');

        let musicconfig=
        {
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0   
        }

        music.play(musicconfig);
    }

    update()
    {
    
        if (Phaser.Input.Keyboard.JustDown(this.controls))
        {
            this.scene.start('menuScene');
        }
    } 
}

