import {MathHelper} from '../../../helpers/math-helper';
import {WorldSimSettings} from './world-sim-settings';
import {WorldModel} from './world-model';

export class WorldGenom {
  commands: number[];

  constructor() {
    this.commands = [];
  }


  copy(): WorldGenom {
    var c = new WorldGenom();
    c.commands = [...this.commands];
    return c;
  }


  mutation(world: WorldModel) {
    var cellCount = MathHelper.getRandomInt(0, this.commands.length * world.settings.mutantCellPercent);
    for (var j = 0; j < cellCount; j++) {
      var cmdIndex = MathHelper.getRandomInt(0, this.commands.length);
      this.commands[cmdIndex] = MathHelper.getRandomInt(0, world.commands[world.commands.length - 1].index);
    }
  }

  createChild(world: WorldModel) {
    var c = this.copy();
    if (MathHelper.getRandomInt(0, 100) < world.settings.mutantPercent * 100) {
      c.mutation(world);
    }
    return c;
  }


  compare(g2: WorldGenom): number {
    var len = Math.min(this.commands.length, g2.commands.length);
    var dif = Math.max(this.commands.length, g2.commands.length) - len;
    for (var i = 0; i < len; i++) {
      if (this.commands[i] != g2.commands[i]) {
        dif++;
      }
    }
    return dif / len;
  }


}
