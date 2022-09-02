import React from 'react'
import selectedStar from '../../elements/star.gif' 
import notSelectedStar from '../../elements/uncheckStar.png'
import '../Form.css'

const Rating = ({rating,setRating}) => {
    return(
        <>
            <div className='rating'>
            <div>   
            <label htmlFor="ratingLabel" className='ratingLabel'>Rate the quote:</label>

            </div>
            <div className='ratingStar'>
                    <img className='star' src={rating > 0 ? selectedStar : notSelectedStar} draggable='false'  alt="star" onClick={(e) => {if(rating === 1) setRating(rating-1); else setRating(1);}} />
                    <img className='star' src={rating > 1 ? selectedStar : notSelectedStar} draggable='false'  alt="star" onClick={(e) => {if(rating === 2) setRating(rating-1); else setRating(2);}} />
                    <img className='star' src={rating > 2 ? selectedStar : notSelectedStar} draggable='false'  alt="star" onClick={(e) => {if(rating === 3) setRating(rating-1); else setRating(3);}} />
                    <img className='star' src={rating > 3 ? selectedStar : notSelectedStar} draggable='false'  alt="star" onClick={(e) => {if(rating === 4) setRating(rating-1); else setRating(4);}} />
                    <img className='star' src={rating > 4 ? selectedStar : notSelectedStar} draggable='false'  alt="star" onClick={(e) => {if(rating === 5) setRating(rating-1); else setRating(5);}} />
            </div>
            </div>
        </>
    )
}

export default Rating