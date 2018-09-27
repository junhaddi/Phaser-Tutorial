var game = new Phaser.Game(800, 600, Phaser.AUTO);

var TEST = {
    preload: function() {
        game.load.image('player', '/assets/bloon.png');
        game.load.image('bullet', '/assets/bullet.png');
        game.load.image('background', '/assets/background.png');
    },
    create: function() {
        //  배경
        this.background1 = game.add.image(0, 0, 'background');
        this.background2 = game.add.image(800, 0, 'background');

        //  키 저장
        this.aKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.sKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.dKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
        this.wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
        //  공격
        this.spaceKey.onDown.add(this.shoot);

        //  플레이어
        this.player = game.add.image(0, 0, 'player');
        this.player.speed = 3;
        this.player.anchor.setTo(0.5, 0.5);

        this.bulletList=[];

        
    },
    update: function() {
        //  무한 배경
        this.background1.x-=10;
        this.background2.x-=10;
        if (this.background2.x <= 0) {
            this.background1.x = 0;
            this.background2.x = 800;
        }

        //  플레이어 움직임
        if (this.aKey.isDown) {
            this.player.x-=this.player.speed;
        }
        if (this.dKey.isDown) {
            this.player.x+=this.player.speed;
        }
        if (this.sKey.isDown) {
            this.player.y+=this.player.speed;
        }
        if (this.wKey.isDown) {
            this.player.y-=this.player.speed;
        }

        //  총알 움직임
        for (let i = 0; i < this.bulletList.length; i++) {
            TEST.bulletList[i].x+=4; 
        }
    },
    shoot: function() {
        //  총알 생성
        let b = game.add.image(TEST.player.x, TEST.player.y, 'bullet');
        b.anchor.setTo(0.5);
        TEST.bulletList.push(b);
    }
};

game.state.add('TEST', TEST);

game.state.start('TEST');