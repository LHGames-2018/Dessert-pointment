import { AIHelper } from "../helper/aiHelper";
import { Player, TileContent, PurchasableItem } from "../helper/interfaces";
import { Map } from "../helper/map";
import { Point } from "../helper/point";

export class Bot {
  protected playerInfo: Player;
  goHome = false;
  ennemyLocked = false;
  goShop = false;
  findR = true;
  goal: Point;
  /**
   * Gets called before ExecuteTurn. This is where you get your bot's state.
   * @param  {Player} playerInfo Your bot's current state.
   * @returns void
   */
  public beforeTurn(playerInfo: Player): void {
    this.playerInfo = playerInfo;
  }
  /**
   * This is where you decide what action to take.
   * @param  {Map} map The gamemap.
   * @param  {Player[]} visiblePlayers The list of visible players.
   * @returns string The action to take(instanciate them with AIHelper)
   */
  public executeTurn(map: Map, visiblePlayers: Player[]): string {
    let direction: number = Math.floor(Math.random() * 4) + 1;
    let playerPos = this.playerInfo.Position;

    if (
      this.playerInfo.CarriedResources / this.playerInfo.CarryingCapacity >
      0.8
    ) {
      this.goHome = true;
      this.findR = false;
    } else {
      this.goHome = false;
      this.findR = true;
    }
    if(this.playerInfo.TotalResources >= 3000){
      this.goShop = true;
    }
    if (map.getTileAt(playerPos) === TileContent.House) {
      this.goHome = false;
      this.findR = true;
    }
    if(this.checkAdjacentTile(map, TileContent.Shop)){
      return AIHelper.createPurchaseAction(PurchasableItem.Sword)
    }
    if (this.goHome) {
      let homePos = this.playerInfo.HouseLocation;
      if (playerPos.x > homePos.x) {
        return AIHelper.createMoveAction(this.right());
      }
      if (playerPos.x < homePos.x) {
        return AIHelper.createMoveAction(this.left());
      }
      if (playerPos.y > homePos.y) {
        return AIHelper.createMoveAction(this.up());
      }
      if (playerPos.y < homePos.y) {
        return AIHelper.createMoveAction(this.down());
      }
    }

    if (this.playerInfo.Health / this.playerInfo.MaxHealth < 0.5) {
      return AIHelper.createHealAction();
    }
    if (this.findR) {
      // this.goal = this.findRessources(map);
      // if (playerPos.x > this.goal.x) {
      //   return AIHelper.createMoveAction(this.right());
      // }
      // if (playerPos.x < this.goal.x) {
      //   return AIHelper.createMoveAction(this.left());
      // }
      // if (playerPos.y > this.goal.y) {
      //   return AIHelper.createMoveAction(this.up());
      // }
      // if (playerPos.y < this.goal.y) {
      //   return AIHelper.createMoveAction(this.down());
      // }

      if (direction === 1) {
        // for (let i = 0; i < 4; i++) {
        const position = new Point(0, -1);
        let tile = map.getTileAt(position);
        if (tile === TileContent.Lava || tile === TileContent.Wall) {
          return AIHelper.createEmptyAction();
        }
        if (tile === TileContent.Resource) {
          return AIHelper.createCollectAction(position);
        }
        if (
          tile === TileContent.Empty ||
          tile === TileContent.House ||
          tile === TileContent.Shop
        ) {
          return AIHelper.createMoveAction(position);
        }
        if (tile === TileContent.Player) {
          return AIHelper.createAttackAction(position);
        }
      }

      if (direction === 2) {
        // for (let i = 0; i < 4; i++) {
        const position = new Point(-1, 0);
        let tile = map.getTileAt(position);
        if (tile === TileContent.Lava || tile === TileContent.Wall) {
          return AIHelper.createEmptyAction();
        }
        if (tile === TileContent.Resource) {
          return AIHelper.createCollectAction(position);
        }
        if (
          tile === TileContent.Empty ||
          tile === TileContent.House ||
          tile === TileContent.Shop
        ) {
          return AIHelper.createMoveAction(position);
        }
        if (tile === TileContent.Player) {
          return AIHelper.createAttackAction(position);
        }
      }

      if (direction === 3) {
        // for (let i = 0; i < 4; i++) {
        const position = new Point(0, 1);
        let tile = map.getTileAt(position);
        if (tile === TileContent.Lava || tile === TileContent.Wall) {
          return AIHelper.createEmptyAction();
        }
        if (tile === TileContent.Resource) {
          return AIHelper.createCollectAction(position);
        }
        if (
          tile === TileContent.Empty ||
          tile === TileContent.House ||
          tile === TileContent.Shop
        ) {
          return AIHelper.createMoveAction(position);
        }
        if (tile === TileContent.Player) {
          return AIHelper.createAttackAction(position);
        }
      }

      if (direction === 4) {
        // for (let i = 0; i < 4; i++) {
        const position = new Point(1, 0);
        let tile = map.getTileAt(position);
        if (tile === TileContent.Lava || tile === TileContent.Wall) {
          return AIHelper.createEmptyAction();
        }
        if (tile === TileContent.Resource) {
          return AIHelper.createCollectAction(position);
        }
        if (
          tile === TileContent.Empty ||
          tile === TileContent.House ||
          tile === TileContent.Shop
        ) {
          return AIHelper.createMoveAction(position);
        }
        if (tile === TileContent.Player) {
          return AIHelper.createAttackAction(position);
        }
      }
    }

    // if(visiblePlayers.length > 0)
    // Determine what action you want to take.
    // return AIHelper.createMoveAction(new Point(0, 1));
  }

  /**
   * Gets called after executeTurn
   * @returns void
   */
  public afterTurn(): void {}

  private detectPositionSurroundingEnnemy(players: Player[]) {
    let closestPlayer = players[0];
    let shortestDistance = Point.distanceSquared(
      this.playerInfo.Position,
      closestPlayer.Position
    );
    for (const player of players) {
      if (player.AttackPower > this.playerInfo.AttackPower) {
        return;
      }
      const distanceToEnnemy = Point.distanceSquared(
        this.playerInfo.Position,
        player.Position
      );
      if (distanceToEnnemy < shortestDistance) {
        closestPlayer = player;
      }
    }
    return closestPlayer;
  }

  private up() {
    return new Point(0, -1);
  }

  private down() {
    return new Point(0, 1);
  }

  private left() {
    return new Point(1, 0);
  }

  private right() {
    return new Point(-1, 0);
  }

  private findRessources(map: Map) {
    let closestRsrcDistance = 9999;
    let closestRsrc = null;
    for (let i = 0; i < map.visibleDistance; i++) {
      for (let j = 0; j < map.visibleDistance; j++) {
        if (map.getTileAt(new Point(i, j)) === TileContent.Resource) {
          const distanceTile = Point.distanceSquared(
            this.playerInfo.Position,
            new Point(i, j)
          );
          if (distanceTile < closestRsrcDistance) {
            closestRsrcDistance = distanceTile;
            closestRsrc = new Point(i, j);
          }
        }
      }
    }
    return closestRsrc;
  }

  checkAdjacentTile(map:Map, tileWanted: TileContent):Point{
    let playerPos = this.playerInfo.Position;
    if(map.getTileAt(new Point (playerPos.x,playerPos.y -1))=== tileWanted){
      return this.up();
    }
    if(map.getTileAt(new Point (playerPos.x,playerPos.y + 1))=== tileWanted){
      return this.down();
    }
    if(map.getTileAt(new Point (playerPos.x + 1,playerPos.y))=== tileWanted){
      return this.left();
    }
    if(map.getTileAt(new Point (playerPos.x -1,playerPos.y))=== tileWanted){
      return this.right ();
    }
    return null
  }
}
