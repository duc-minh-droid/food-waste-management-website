import React from 'react'
import { Link, Navigate } from 'react-router-dom';

function Recipe({item}) {

    const mapIngredientsToString = arr => {
        const lastIndex = arr.length - 1;
        return arr.map((item, index) => {
            if (index === 0) {
                return item.name;
            } else if (index === lastIndex) {
                return " and " + item.name;
            }
            return ", " + item.name;
        }).join('');
    };

    return (
    <Link to={`/inventory/${item.id}`}>
        <div>{item.title}</div>
        <img src={item.image}/>
        <div>You have {mapIngredientsToString(item.usedIngredients)}</div>
        <div>You are missing {mapIngredientsToString(item.missedIngredients)}</div>
    </Link>
  )
}

export default Recipe