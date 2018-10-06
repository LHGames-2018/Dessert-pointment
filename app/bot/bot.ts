import { AIHelper } from "../helper/aiHelper";
import { Player, TileContent } from "../helper/interfaces";
import { Map } from "../helper/map";
import { Point } from "../helper/point";

export class Bot {
  protected playerInfo: Player;
  goHome = false;

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

    if(this.playerInfo.CarriedResources/this.playerInfo.CarryingCapacity > 0.80){
      this.goHome = true;
    }
    else{
      this.goHome = false;
    }

    if(this.goHome){
      let homePos= this.playerInfo.HouseLocation;
      let playerPos = this.playerInfo.Position;
      if(playerPos.x > homePos.x){
        return AIHelper.createMoveAction(this.right());
      }
      if(playerPos.x < homePos.x){
        return AIHelper.createMoveAction(this.left());
      }
      if(playerPos.y > homePos.y){
        return AIHelper.createMoveAction(this.up());
      }
      if(playerPos.y < homePos.y){
        return AIHelper.createMoveAction(this.down());
      }
    }
    
    if(this.playerInfo.Health/this.playerInfo.MaxHealth < 0.5){
      return AIHelper.createHealAction();
    }
    if(direction === 1){
      // for (let i = 0; i < 4; i++) {
        const position = new Point( 0, -1);
        let tile = map.getTileAt(position);
        if(tile === TileContent.Lava || tile === TileContent.Wall){
          return AIHelper.createEmptyAction();
        }
        if(tile === TileContent.Resource){
          return AIHelper.createCollectAction(position)

        }
        if(tile === TileContent.Empty || tile === TileContent.House || tile === TileContent.Shop){
          return AIHelper.createMoveAction(position);
        }
        if(tile === TileContent.Player){
          return AIHelper.createAttackAction(position);
        }
      
    }
    if(direction === 2){
      // for (let i = 0; i < 4; i++) {
        const position = new Point(-1,0 );
        let tile = map.getTileAt(position);
        if(tile === TileContent.Lava || tile === TileContent.Wall){
          return AIHelper.createEmptyAction();
        }
        if(tile === TileContent.Resource){
          return AIHelper.createCollectAction(position)

        }
        if(tile === TileContent.Empty || tile === TileContent.House || tile === TileContent.Shop){
          return AIHelper.createMoveAction(position);
        }
        if(tile === TileContent.Player){
          return AIHelper.createAttackAction(position);
        }
      
    }

    if(direction === 3){
      // for (let i = 0; i < 4; i++) {
        const position = new Point( 0, 1);
        let tile = map.getTileAt(position);
        if(tile === TileContent.Lava || tile === TileContent.Wall){
          return AIHelper.createEmptyAction();
        }
        if(tile === TileContent.Resource){
          return AIHelper.createCollectAction(position)

        }
        if(tile === TileContent.Empty || tile === TileContent.House || tile === TileContent.Shop){
          return AIHelper.createMoveAction(position);
        }
        if(tile === TileContent.Player){
          return AIHelper.createAttackAction(position);
        }
      
    }

    if(direction === 4){
      // for (let i = 0; i < 4; i++) {
        const position = new Point( 1 , 0 );
        let tile = map.getTileAt(position);
        if(tile === TileContent.Lava || tile === TileContent.Wall){
          return AIHelper.createEmptyAction();
        }
        if(tile === TileContent.Resource){
          return AIHelper.createCollectAction(position)

        }
        if(tile === TileContent.Empty || tile === TileContent.House || tile === TileContent.Shop){
          return AIHelper.createMoveAction(position);
        }
        if(tile === TileContent.Player){
          return AIHelper.createAttackAction(position);
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
  public afterTurn(): void {


  }

private detectPositionSurroundingEnnemy(players:Player[]){
  let closestPlayer = players[0];
  let shortestDistance = Point.distanceSquared(this.playerInfo.Position, closestPlayer.Position);
  for (const player of players) {
    if(player.AttackPower > this.playerInfo.AttackPower){
      return;
    }
   const distanceToEnnemy = Point.distanceSquared(this.playerInfo.Position, player.Position);
    if(distanceToEnnemy < shortestDistance){
      closestPlayer = player;
    }
  }
  return closestPlayer;
}

private up(){
  return new Point(0,-1);
}

private down(){
  return new Point(0,1);
}

private left(){
  return new Point(1, 0);
}

private right(){
  return new Point(-1,0)
}
}


