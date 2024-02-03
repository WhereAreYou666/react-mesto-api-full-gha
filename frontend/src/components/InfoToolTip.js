import successIcon from '../images/success.svg';
import failIcon from '../images/fail.svg'

export default function InfoTooltip(props) {

  return (
    <div className={`popup ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <img
          className="popup__icon"
          src={props.isSuccess ? successIcon : failIcon}
          alt={'Иконка, демонстрирующая результат регистрации на сайте'}
        />
        <h3 className="popup__title popup__title_type_info">
          {props.isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
        </h3>
        <button
          className="popup__close-btn"
          type="button"
          onClick={props.onClose}
        />
      </div>
    </div>
  );
};