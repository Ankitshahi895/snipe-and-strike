export class Powerup {
  constructor(x, y, type, game) {
    this.x = x;
    this.y = y;
    this.width = 30;
    this.height = 30;
    this.type = type;
    this.game = game;
  }

  applyEffect() {
    if (this.type === 'health') {
      this.game.player.health = Math.min(
        this.game.player.health + this.game.difficultySettings[this.game.difficulty].ammoBonus,
        150
      );
    } else if (this.type === 'ammo') {
      this.game.player.ammo += this.game.difficultySettings[this.game.difficulty].ammoBonus;
    }
  }

  update(deltaTime) {
    // Move down
    this.y += this.speed * (deltaTime / 1000);

    // Rotate
    this.rotation += deltaTime * 0.003;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
    ctx.rotate(this.rotation);

    // Draw powerup
    ctx.fillStyle = this.color;
    ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);

    // Draw icon based on type
    ctx.fillStyle = '#fff';
    if (this.type === 'health') {
      // Draw plus sign
      ctx.fillRect(-this.width / 4, -this.height / 2 + 4, this.width / 2, this.height - 8);
      ctx.fillRect(-this.width / 2 + 4, -this.height / 4, this.width - 8, this.height / 2);
    } else {
      // Draw ammo icon
      ctx.fillRect(-this.width / 4, -this.height / 3, this.width / 2, this.height * 2/3);
    }

    ctx.restore();
  }
}