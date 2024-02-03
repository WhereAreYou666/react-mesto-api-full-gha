import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onDeleteClick, onLikeClick }) {
  const currentUser = useContext(CurrentUserContext);

  function handleClick() {
    onCardClick(card);
  }

  function handleDeleteClick() {
    onDeleteClick(card._id);
  }

  function handleCardLike() {
    onLikeClick(card);
  }

  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some(i => i === currentUser._id);
  const cardLikeButtonClassName = (
    `element__like-btn ${isLiked && 'element__like-btn_active'}`
  );

  return (
    <article className="element">
      <img className="element__image" src={card.link}
        alt={card.title} onClick={handleClick} />
      <div className="element__info">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like">
          <button className= {cardLikeButtonClassName} onClick = {handleCardLike} />
          {card.likes.length > 0
            ? <h3 className='element__like-count element__like-count_opened'>{card.likes.length}</h3>
            : null
          }
        </div>
      </div>
      { isOwn && <button className='element__trash-btn' onClick={handleDeleteClick} /> }
    </article>
  )
}

export default Card;