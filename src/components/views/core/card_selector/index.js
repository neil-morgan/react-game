import { useEffect } from "react";
import Exchange from "./Exchange";

const CardSelector = ({ G, ctx, playerID, moves }) => {
  //   console.log("pid " + playerID);
  //   console.log("curr " + ctx.currentPlayer);
  //   useEffect(() => {
  //     if (G.turnLog.action === "exchange" && playerID === ctx.currentPlayer) {

  //     }
  //   }, [G.turnLog.action, ctx.currentPlayer, playerID]);

  const componentProps = { G, ctx, playerID, moves };

  return <Exchange {...componentProps} />;
};

export default CardSelector;
