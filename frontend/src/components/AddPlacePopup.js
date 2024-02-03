import PopupWithForm from "./PopupWithForm";
import React from "react";

function AddPlacePopup(props) {
  const placeLinkRef = React.useRef();
  const placeNameRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddNewPlace({ link: placeLinkRef.current.value, name: placeNameRef.current.value });
  }

  React.useEffect(() => {
    placeLinkRef.current.value = "";
    placeNameRef.current.value = "";
  }, [props.isOpen])

  return (
    <PopupWithForm name='card' title='Новое место' isOpen={props.isOpen} onClose={props.onClose} buttonText={props.isLoading ? "Сохранение..." : "Создать"}
      buttonClass="popup__submit-btn btnPopup-card" onSubmit={handleSubmit}>
      <input
        minLength={2}
        maxLength={30}
        type="text"
        placeholder="Название"
        className="popup__text popup__text_type_title-card"
        name="titlePopup"
        required={true}
        ref={placeNameRef}
      />
      <span className="popup__error" id="titlePopup-error" />
      <input
        type="url"
        placeholder="Ссылка на картинку"
        className="popup__text popup__text_type_link-card"
        name="linkPopup"
        required={true}
        ref={placeLinkRef}
      />
      <span className="popup__error" id="linkPopup-error" />
    </PopupWithForm>
  )
}

export default AddPlacePopup;