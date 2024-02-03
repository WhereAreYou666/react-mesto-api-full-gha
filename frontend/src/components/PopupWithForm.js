import React from "react";

function PopupWithForm(props) {

  return (
    <div className={`popup ${props.isOpen ? 'popup_opened' : ''}`} id={`popup-${props.name}`}>
      <div className="popup__container">
        <form className="popup__form" 
        name={`formPopup${props.name.charAt(0).toUpperCase() + props.name.slice(1)}`}
        onSubmit={props.onSubmit}>
          <h2 className="popup__title">{props.title}</h2>
          {props.children}
          <button
            type="submit"
            className={`popup__submit-btn ${props.buttonClass}`}
          >
            {props.buttonText}
          </button>
        </form>
        <button className="popup__close-btn" type="button" onClick={props.onClose} />
      </div>
    </div>
  )
}

export default PopupWithForm;