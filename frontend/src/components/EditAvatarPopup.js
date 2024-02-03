import PopupWithForm from "./PopupWithForm";
import React from "react";

function EditAvatarPopup(props) {

  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar(avatarRef.current.value);
  }

  React.useEffect(() => {
    avatarRef.current.value = "";
  }, [props.isOpen])

  return (
    <PopupWithForm name='avatar' title='Обновить аватар' isOpen={props.isOpen}
      onClose={props.onClose} buttonText={props.isLoading ? "Сохранение..." : "Сохранить"}
      buttonClass="popup__submit-btn btnPopup-avatar"
      onSubmit={handleSubmit}>
      <input
        type="url"
        placeholder="Ссылка на картинку"
        className="popup__text popup__text_type_link-avatar"
        name="linkPopupAvatar"
        required={true}
        ref={avatarRef}
      />
      <span className="popup__error" id="linkPopupAvatar-error" />
    </PopupWithForm>
  )
}

export default EditAvatarPopup;