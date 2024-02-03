const Card = require('../models/card');

const NotFoundError = require('../errors/NotFoundError');
const InputError = require('../errors/InputError');
const AuthNotFoundError = require('../errors/AuthNotFoundError');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new InputError('Данные введены некорректно'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        next(new NotFoundError('Карточка с таким id не найдена'));
      } else if (req.user._id !== card.owner.toString()) {
        return next(new AuthNotFoundError('Не допустимо удаление карточки другого пользователя'));
      }
      return Card.deleteOne(card)
        .then(() => res.send({ data: card }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new InputError('Формат ID карточки не корректен'));
      } else {
        next(err);
      }
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.send({ data: card });
      } else {
        next(new NotFoundError('Карточка с таким id не найдена'));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new InputError('Формат ID карточки не корректен'));
      } else {
        next(err);
      }
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.send({ data: card });
      } else {
        next(new NotFoundError('Карточка с таким id не найдена'));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new InputError('Формат ID карточки не корректен'));
      } else {
        next(err);
      }
    });
};
