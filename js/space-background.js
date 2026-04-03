class SpaceBackground extends Phaser.Scene
{
    preload()
    {
        this.load.image('star', 'images/space/star.png');
        this.load.image('nebula', 'images/space/nebula.png');
        this.load.image('big_planet', 'images/space/ansimuz/bg-planet.png');
        this.load.image('medium_planet', 'images/space/ansimuz/parallax-space-big-planet.png');
    }
    
    create() 
    {
        var width = window.innerWidth;
        
        var nebula = this.add.sprite(width * 0.5, 800, 'nebula');
        nebula.setScrollFactor(0.1).setAlpha(0.5);
        nebula.displayWidth = width;
        nebula.displayHeight = width;
        
        var starCount = Math.max(100, width * 0.2);
        var group = this.add.group({ key: 'star', frameQuantity: starCount });
        var rect = new Phaser.Geom.Rectangle(0, 0, width, document.documentElement.scrollHeight);
        Phaser.Actions.RandomRectangle(group.getChildren(), rect);
        group.children.iterate(function (child, index)
            {
                var rnd = Math.random();
                child.setScrollFactor(rnd * 0.3 + 0.1);
                child.setScale(0.5 + rnd * 0.5);
            }, this);
        
        var big_planet = this.add.sprite(200, 700, 'big_planet')
        big_planet.setAngle(90).setScale(3).setScrollFactor(0.6);

        var med_planet = this.add.sprite(width * 0.8, 1200, 'medium_planet')
        med_planet.setAngle(90).setScale(1.5).setScrollFactor(0.3);
        
        this.cameras.main.setBounds(rect.x, rect.y, rect.width, rect.height);
    }

    update() 
    {
        this.cameras.main.scrollY = window.scrollY;
    }
}


const config = {
    type: Phaser.AUTO,
    parent: 'space-background',
    width: window.innerWidth,
    height: window.innerHeight,
    transparent: false,
    render:
        {
            pixelArt: true,
        },
    scene: SpaceBackground
};

const game = new Phaser.Game(config);

window.addEventListener('resize', () => {
    game.scale.resize(window.innerWidth, window.innerHeight);
});