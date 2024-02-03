import React from "react";
import Card from "./Card";
import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__avatar-container">
          <img className="profile__avatar" src={currentUser.avatar} alt="Аватарка профиля" />
          <button className="profile__avatar-edit-btn" type="button" onClick={props.onEditAvatar} />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button className="profile__edit-btn" type="button" onClick={props.onEditProfile} />
          <p className="profile__caption">{currentUser.about}</p>
        </div>
        <button className="profile__add-btn" type="button" onClick={props.onAddPlace} />
      </section>
      <section className="elements">
        {props.cards.map((cardItem, i) => (
          <Card card={cardItem} key={cardItem._id} onCardClick={props.onCardClick} 
          onLikeClick={props.onLikeClick} onDeleteClick={props.onDeleteClick}/>))}
      </section>
    </main>
  );

}

export default Main;