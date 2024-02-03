import React from 'react'

function RestaurantItem(props) {

    const { restaurant } = props;
    return (
        <div className='RestaurantItem'>
            <h1>{restaurant.restaurantName}</h1>
        </div>
    )
}

export default RestaurantItem