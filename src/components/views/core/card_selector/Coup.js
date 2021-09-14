import { useEffect } from "react";

const Coup = () => {
  useEffect(() => {
    if (G.turnLog.action === "coup" && isYourTurn) {
      !isObjectEmpty(G.turnLog.target) && setIsOpen(true);
      // image loading optimization (with hidden)
      cards.forEach((card) => {
        temp.push(
          <Card
            src={card.front}
            alt={card.character}
            hidden={Object.keys(G.turnLog.target).length === 0}
            onClick={() => {
              coup(card.character);
              handleClose();
            }}
          />
        );
      });
    }
  }, []);

  return <></>;
};

export default Coup;
