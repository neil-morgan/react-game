import Exchange from "./Exchange";

const CardSelector = ({ ctx, G, moves, playerID }) => {
  const componentProps = { ctx, G, moves, playerID };
  const component = {
    exchange: <Exchange {...componentProps} />,
  };

  //move modal opening logic and card selection state up to here
  //might not even need individual components for each scenario
  //reuse the same card components and instead render the cards you need
  //and change the final function

  return component["exchange"];
};

export default CardSelector;
