function ImagePopup({ card, onClose }) {
  return (<div className={`popup ${card.name ? 'popup_opened' : ''} popup_imaged`} id="popup-image">
    < div className="popup__image-container" >
      <img
        className="popup__image-element"
        src={card.link}
        alt={card.name}
      />
      <h2 className="popup__image-title">{card.name}</h2>
      <button className="popup__close-btn" type="button" onClick={onClose} />
    </div >
  </div >)
}

export default ImagePopup;