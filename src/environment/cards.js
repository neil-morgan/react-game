// Create character cards
export const Card = (character, front, id) => ({
  character,
  front,
  id,
});

export const cards = [
  Card("Duke", "/images/duke.PNG", 0),
  Card("Assassin", "/images/assassin.PNG", 1),
  Card("Captain", "/images/captain.PNG", 2),
  Card("Ambassador", "/images/ambassador.PNG", 3),
  Card("Contessa", "/images/contessa.PNG", 4),
];
