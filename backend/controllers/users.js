const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const InputError = require('../errors/InputError');
const DuplicateError = require('../errors/DuplicateError');
const { getSecret } = require('../utils/secrets');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  User.find({ _id: req.params.id })
    .then((user) => {
      if (user[0]) {
        res.send({ data: user[0] });
      } else {
        next(new NotFoundError('Пользователь с таким id не найден'));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new InputError('Формат ID пользователя не корректен'));
      } else {
        next(err);
      }
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => {
      const { _id } = user;
      res.status(201).send({
        email,
        name,
        about,
        avatar,
        _id,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new DuplicateError('Пользователь с таким адресом электронной почты уже существует'));
      } else if (err.name === 'ValidationError') {
        next(new InputError('Данные введены некорректно'));
      } else {
        next(err);
      }
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        next(new NotFoundError('Пользователь с таким id не найден'));
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new InputError('Данные введены некорректно'));
      } else {
        next(err);
      }
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const avatar = req.body;
  User.findByIdAndUpdate(req.user._id, avatar, { new: true, runValidators: true })
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        next(new NotFoundError('Пользователь с таким id не найден'));
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new InputError('Данные введены некорректно'));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        getSecret(),
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
  const { _id } = req.user;
  User.find({ _id })
    .then((user) => res.send({ data: user[0] }))
    .catch(next);
};
