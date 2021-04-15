import React, { useState } from "react";
import MemoryCard from "./MemoryCard";
import StatusBar from "./StatusBar";
import "./index.css";

const colors = [
  "pink",
  "red",
  "orange",
  "yellow",
  "green",
  "teal",
  "blue",
  "purple",
];

function generateCards() {
  const cards = [];
  for (let i = 0; i < colors.length; i++) {
    cards.push({
      key: i * 2,
      color: colors[i],
      isFlipped: false,
    });
    cards.push({
      key: i * 2 + 1,
      color: colors[i],
      isFlipped: false,
    });
  }
  return cards.sort(() => Math.random() - 0.5);
}

function Memory() {
  const [game, setGame] = useState({ cards: generateCards() });
  const status = "Time: 0s";

  function onRestart() {
    setGame(generateCards());
  }

  function onCardClick(card) {
      if (card.isFlipped === true) {
        return
      } else {
        setGame(({ cards, firstCard, secondCard }) => {
          if (firstCard === undefined && secondCard === undefined) {
            flipCard(cards, card);
            firstCard = card;
          } 
          else if (firstCard && secondCard === undefined) {
            flipCard(cards, card);
            secondCard = card;
          } 
          else if (firstCard.color === secondCard.color) {
            flipCard(cards, card);
            firstCard = card;
            secondCard = undefined;
          } else {
            card.isFlipped = true;
            flipCard(cards, firstCard);
            flipCard(cards, secondCard);
            firstCard = card;
            secondCard = undefined;
          }
      
        });
      }  
  }


  function flipCard(cards, cardToFlip) {
    return cards.map((card) => {
      if (card.key === cardToFlip.key) return { ...card, isFlipped: !card.isFlipped };
      return card;
    })
}
  

  return (
    <div>
      <div className="game-container">
        <StatusBar status={status} onRestart={onRestart}></StatusBar>
        <div className="memory-grid">
          {game.cards.map((card) => (
            <MemoryCard
            {...card}
            onClick={() => onCardClick(card)}
            ></MemoryCard>
          ))}
        </div>
      </div>
    </div>
  );
}


export default Memory;