"use client";

import type React from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Game } from "../../types/game";
import { useCart } from "../../contexts/CartContext";
import { gameCardClasses } from "./classes";

interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const { addToCart, removeFromCart, state } = useCart();
  // const [showFullDescription, setShowFullDescription] = useState(false);

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

  // const toggleDescription = (e: React.MouseEvent) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   setShowFullDescription(!showFullDescription);
  // };

  const truncatedText = (text: string) => {

  return text.length > 100
    ? text.substring(0, 100) + "..."
    : text;
  }

  return (
    <div className="block group">
      <div className="w-[380px] h-[436px] rounded-2xl border border-gray-400 opacity-100 p-4 pb-2 bg-white hover:shadow-lg transition-shadow duration-300">
        {/* Game Image */}
        <div className="relative w-full h-[280px] mb-5 overflow-hidden rounded-lg">
          <Image
            src={game.image || "/placeholder.svg"}
            alt={game.name}
            fill
            className="object-cover"
            sizes="380px"
          />
          {game.isNew && (
            <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
              New
            </div>
          )}
        </div>

        {/* Content */}
        <div className="px-2">
          {/* Genre */}
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
            GENRE
          </p>

          {/* Title and Price Row */}
          <div className="flex justify-between items-start mb-5">
            <h3 className="text-base font-medium text-gray-900 flex-1 pr-2">
              {truncatedText(game.name)}
            </h3>
            <span className="text-base font-semibold text-gray-900 whitespace-nowrap">
              {game.price === 0 ? "Free" : `$${Math.round(game.price)}`}
            </span>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleToggleCart}
            className="w-full py-3 px-4 border border-gray-400 rounded-lg text-sm font-medium text-gray-900 bg-white hover:bg-gray-50 transition-colors duration-200"
          >
            {isInCart ? "REMOVE FROM CART" : "ADD TO CART"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
