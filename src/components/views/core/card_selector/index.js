import Exchange from "./Exchange";

const CardSelector = ({ ctx, G, moves, playerID }) => {
  const componentProps = { ctx, G, moves, playerID };
  const component = {
    exchange: <Exchange {...componentProps} />,
  };

  return component["exchange"];
};

export default CardSelector;
