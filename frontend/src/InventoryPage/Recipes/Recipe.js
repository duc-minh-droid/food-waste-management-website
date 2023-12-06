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

    const cardStyle = {
        display: 'flex',
        alignItems: 'center',
        padding: '15px',
        margin: '10px',
        borderRadius: '16px',
        backgroundColor: 'white',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        transition: 'box-shadow 0.3s ease',
        width: 'fit-content', // Adjust the width as needed
      };
      
      const imageStyle = {
        width: '100px',
        height: '100px',
        marginRight: '15px',
        borderRadius: '16px', // Border for the image
      };
      
      const textStyle = {
        flex: '1',
        color: 'black',
      };

    return (
        <Link to={`/inventory/${item.id}`} style={{ textDecoration: 'none' }}>
        <div style={cardStyle}>
          <img src={item.image} alt={item.title} style={imageStyle} />
          <div style={textStyle}>
            <div>{item.title}</div>
            <div>{item.usedIngredients.length ? `You have ${mapIngredientsToString(item.usedIngredients)}` : ''}</div>
            <div>You are missing {mapIngredientsToString(item.missedIngredients)}</div>
          </div>
        </div>
      </Link>
  )
}

export default Recipe