import Header from './components/Header';
import React from 'react';
import Main from './components/Main';
import Footer from './components/Footer';
import PopupWithForm from './components/PopupWithForm';
import ImagePopup from './components/ImagePopup';
import { CurrentUserContext } from './contexts/CurrentUserContext';
import { Api } from './utils/Api';
import EditProfilePopup from './components/EditProfilePopup';
import EditAvatarPopup from './components/EditAvatarPopup';
import AddPlacePopup from './components/AddPlacePopup';
import Login from './components/Login';
import Register from './components/Register';
import { Route, Routes, useNavigate } from 'react-router-dom';
import InfoTooltip from './components/InfoToolTip';
import * as auth from './utils/auth';
import ProtectedRouteElement from './components/ProtectedRoute';

function App() {
  const [currentUser, setCurrentUser] = React.useState({ name: '', about: '' });
  const [userEmail, setUserEmail] = React.useState('');
  const [loggedIn, setLoggedIn] = React.useState(false);
  const navigate = useNavigate();
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isInfoToolTipOpen, setInfoToolTipOpen] = React.useState(false);
  const [isRegSuccess, setRegSuccess] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoading, setLoading] = React.useState(false);
  const handleTokenCheck = () => {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      auth.checkToken(jwt).then((res) => {
        if (res) {
          setLoggedIn(true);
          navigate('/', { replace: true });
          setUserEmail(res.data.email);
        }
        else {
          setLoggedIn(false);
          navigate('/sign-in', { replace: true })
        }
      });
    }
  }

  React.useEffect(() => {
    handleTokenCheck();
  }, [loggedIn]);

  const api = new Api({
    url: 'http://localhost:3000',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    }
  });

  React.useEffect(() => {
    if (loggedIn) {
      api.getUserInfo()
        .then((res) => {
          setCurrentUser(res);
        })
        .catch((err) =>
          console.log(`Получение информации о пользователе привело к ошибке ${err}`)
        )
    }
  }, [loggedIn]);

  React.useEffect(() => {
    if (loggedIn) {
      api.getInitialCards()
        .then((res) => {
          setCards(res.reverse());
        })
        .catch((err) =>
          console.log(`Получение информации о дефолтных карточках привело к ошибке ${err}`));
    }
  }, [loggedIn]);

  function handleRegister(email, password) {
    setLoading(true);
    auth.register(email, password)
      .then((res) => {
        if (res) {
          navigate('/sign-in', { replace: true });
          setRegSuccess(true);
          setInfoToolTipOpen(true);
        }
      })
      .catch((err) => {
        console.log(`Попытка регистрации привела к ошибке ${err}`);
        setRegSuccess(false);
        setInfoToolTipOpen(true);
      })
      .finally((res) => setLoading(false));
  }

  function handleLogin(email, password) {
    setLoading(true);
    auth.authorize(email, password)
      .then((data) => {
        setRegSuccess(true);
        setLoggedIn(true);
        setUserEmail(email);
        navigate('/', { replace: true });
        localStorage.setItem('jwt', data.token);
      })
      .catch(err => {
        console.log(`Попытка входа привела к ошибке ${err}`);
        setRegSuccess(false);
        setInfoToolTipOpen(true);
      })
      .finally((res) => setLoading(false));
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(`Обновление карточки с поставленным/снятым лайком привело к ошибке ${err}`);
      });
  }

  function handleCardDelete(cardId) {
    api.deleteCard(cardId)
      .then((response) => setCards((state) => state.filter((c) => c._id !== cardId)))
      .catch((err) => {
        console.log(`Удаление карточки привело к ошибке ${err}`);
      });
  }

  function handleUpdateUser(userInfo) {
    setLoading(true);
    api.setUserInfo(userInfo)
      .then((res) => setCurrentUser(res))
      .then((res) => closeAllPopups())
      .catch((err) => {
        console.log(`Обновление данных пользователя привело к ошибке ${err}`);
      })
      .finally((res) => setLoading(false));
  }

  function handleUpdateAvatar(avatar) {
    setLoading(true);
    api.setUserAvatar(avatar)
      .then((res) => setCurrentUser(res))
      .then((res) => closeAllPopups())
      .catch((err) => {
        console.log(`Обновление аватара пользователя привело к ошибке ${err}`);
      })
      .finally((res) => setLoading(false));
  }

  function handleAddPlaceSubmit(card) {
    setLoading(true);
    api.addNewCard(card)
      .then((newCard) => setCards([newCard, ...cards]))
      .then((res) => closeAllPopups())
      .catch((err) => {
        console.log(`Добавление новой карточки привело к ошибке ${err}`);
      })
      .finally((res) => setLoading(false));
  }

  React.useEffect(() => {
    function handleEscClose(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }

    if (isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard || isInfoToolTipOpen) {
      document.addEventListener('keydown', handleEscClose);
      return (() => document.removeEventListener('keydown', handleEscClose));
    }
    return () => { }
  }, [isEditAvatarPopupOpen, isEditProfilePopupOpen, isAddPlacePopupOpen, selectedCard, isInfoToolTipOpen])

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard({});
    setInfoToolTipOpen(false);
  }

  function handleSignOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="author" content="Poluyanov Ruslan" />
          <title>Mesto</title>
          <Header email={userEmail} signOut={handleSignOut} />
          <Routes>
            <Route path="/" element={<ProtectedRouteElement element={Main} cards={cards} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick} onLikeClick={handleCardLike} onDeleteClick={handleCardDelete} loggedIn={loggedIn} />} />
            <Route path="/sign-in" element={<Login handleLogin={handleLogin} isLoading={isLoading} />} />
            <Route path="/sign-up" element={<Register onRegister={handleRegister} isLoading={isLoading} />} />
          </Routes>
          <InfoTooltip isOpen={isInfoToolTipOpen} isSuccess={isRegSuccess} onClose={closeAllPopups} />
          {loggedIn && <Footer />}
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} isLoading={isLoading} />
          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddNewPlace={handleAddPlaceSubmit} isLoading={isLoading} />
          {selectedCard.name && selectedCard.link ? (<ImagePopup card={selectedCard} onClose={closeAllPopups} />) : null}
          <PopupWithForm name='delete-card' title='Вы уверены?' buttonText="Да" buttonClass=" btnPopup-delete-card" />
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar} isLoading={isLoading} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
