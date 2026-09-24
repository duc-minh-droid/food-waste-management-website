import React from "react";
import { INGREDIENT_IMG } from "../services";

// Ingredient picture: Spoonacular CDN image in live mode, emoji in demo mode.
export function IngredientThumb({ item, size = 36 }) {
  const style = { width: size, height: size, fontSize: size * 0.62 };
  if (item.image) {
    const src = /^https?:/.test(item.image) ? item.image : INGREDIENT_IMG + item.image;
    return <img className="thumb" src={src} alt="" style={style} />;
  }
  return <span className="thumb thumb-emoji" style={style} aria-hidden>{item.emoji || "🥫"}</span>;
}

// Recipe picture: real photo when there is one, otherwise a tinted emoji tile.
export function RecipeThumb({ recipe, className = "" }) {
  if (recipe.image) {
    return <img className={`recipe-img ${className}`} src={recipe.image} alt={recipe.title} />;
  }
  const hue = recipe.hue ?? 120;
  return (
    <div
      className={`recipe-img recipe-emoji ${className}`}
      style={{ background: `linear-gradient(135deg, hsl(${hue} 85% 88%), hsl(${(hue + 40) % 360} 75% 72%))` }}
      role="img"
      aria-label={recipe.title}
    >
      <span>{recipe.emoji}</span>
    </div>
  );
}
