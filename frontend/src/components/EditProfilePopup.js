import PopupWithForm from "./PopupWithForm";
import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  function handleChangeName(e) {
    setName(e.target.value);
  }

  const [description, setDescription] = React.useState('');
  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm name='profile' title='Редактировать профиль'
      isOpen={props.isOpen} onClose={props.onClose} buttonText={props.isLoading ? "Сохранение..." : "Сохранить"}
      buttonClass="btnPopup-profile popup__submit-btn"
      onSubmit={handleSubmit}>
      <input
        minLength={2}
        maxLength={40}
        type="text"
        placeholder="Имя"
        className="popup__text popup__text_type_name"
        name="namePopup"
        required={true}
        value={name}
        onChange={handleChangeName}
      />
      <span className="popup__error" id="namePopup-error" />
      <input
        minLength={2}
        maxLength={200}
        type="text"
        placeholder="О вас"
        className="popup__text popup__text_type_caption"
        name="captionPopup"
        required={true}
        value={description}
        onChange={handleChangeDescription}
      />
      <span className="popup__error" id="captionPopup-error" />
    </PopupWithForm>
  );
}

export default EditProfilePopup;