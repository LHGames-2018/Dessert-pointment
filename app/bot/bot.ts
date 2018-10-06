import { AIHelper } from "../helper/aiHelper";
import { Player, TileContent } from "../helper/interfaces";
import { Map } from "../helper/map";
import { Point } from "../helper/point";

export class Bot {
  protected playerInfo: Player;

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
    if(direction === 1){
      // for (let i = 0; i < 4; i++) {
        const position = new Point( this.playerInfo.Position.x,this.playerInfo.Position.y + 1);
        let tile = map.getTileAt(position);
        if(tile === TileContent.Lava || tile === TileContent.Wall){
          return AIHelper.createEmptyAction();
        }
        if(tile === TileContent.Resource){
          return AIHelper.createCollectAction(position)

        }
        if(tile === TileContent.Empty){
          return AIHelper.createMoveAction(position);
        }
      
    }
    if(direction === 2){
      // for (let i = 0; i < 4; i++) {
        const position = new Point( this.playerInfo.Position.x + 1,this.playerInfo.Position.y );
        let tile = map.getTileAt(position);
        if(tile === TileContent.Lava || tile === TileContent.Wall){
          return AIHelper.createEmptyAction();
        }
        if(tile === TileContent.Resource){
          return AIHelper.createCollectAction(position)

        }
        if(tile === TileContent.Empty){
          return AIHelper.createMoveAction(position);
        }
      
    }

    if(direction === 3){
      // for (let i = 0; i < 4; i++) {
        const position = new Point( this.playerInfo.Position.x,this.playerInfo.Position.y - 1);
        let tile = map.getTileAt(position);
        if(tile === TileContent.Lava || tile === TileContent.Wall){
          return AIHelper.createEmptyAction();
        }
        if(tile === TileContent.Resource){
          return AIHelper.createCollectAction(position)

        }
        if(tile === TileContent.Empty){
          return AIHelper.createMoveAction(position);
        }
      
    }

    if(direction === 4){
      // for (let i = 0; i < 4; i++) {
        const position = new Point( this.playerInfo.Position.x -1 ,this.playerInfo.Position.y );
        let tile = map.getTileAt(position);
        if(tile === TileContent.Lava || tile === TileContent.Wall){
          return AIHelper.createEmptyAction();
        }
        if(tile === TileContent.Resource){
          return AIHelper.createCollectAction(position)

        }
        if(tile === TileContent.Empty){
          return AIHelper.createMoveAction(position);
        }
      
    }


    // Determine what action you want to take.
    return AIHelper.createMoveAction(new Point(0, 1));
  }

  /**
   * Gets called after executeTurn
   * @returns void
   */
  public afterTurn(): void {
    // let direction: number = Math.floor(Math.random() * 4) + 1;


  }
}
