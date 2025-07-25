"use client";

import type React from "react";
import Image from "next/image";
import type { Game } from "../../types/game";
import { useCart } from "../../contexts/CartContext";
import Badge from "../Badge/Badge";
import { gameCardClasses } from "./classes";

interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const { addToCart, removeFromCart, state } = useCart();

  const isInCart = state.items.some((item: any) => item.id === game.id);

  const handleToggleCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isInCart) {
      removeFromCart(game.id);
    } else {
      addToCart(game);
    }
  };

  const truncatedText = (text: string) => {
    return text.length > 30 ? text.substring(0, 30) + "..." : text;
  };

  return (
    <div className={gameCardClasses.container}>
      {/* Game Image */}
      <div className={gameCardClasses.imageWrapper}>
        <Image
          src={game.image || "/placeholder.svg"}
          alt={game.name}
          fill
          className={gameCardClasses.image}
        />
        {game.isNew && <Badge size="md">New</Badge>}
      </div>

      {/* Content */}
      <div className={gameCardClasses.contentWrapper}>
        {/* Genre */}
        <p className={gameCardClasses.genreText}>GENRE</p>

        {/* Title and Price Row */}
        <div className={gameCardClasses.titlePriceRow}>
          <h3 className={gameCardClasses.title}>{truncatedText(game.name)}</h3>
          <span className={gameCardClasses.price}>
            {game.price === 0 ? "Free" : `$${Math.round(game.price)}`}
          </span>
        </div>

        {/* Add to Cart Button */}
        <button onClick={handleToggleCart} className={gameCardClasses.button}>
          {isInCart ? "REMOVE FROM CART" : "ADD TO CART"}
        </button>
      </div>
    </div>
  );
};

export default GameCard;
