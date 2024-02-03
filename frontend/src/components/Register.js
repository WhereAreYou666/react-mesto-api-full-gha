import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = ({ onRegister, isLoading }) => {
  const [formValue, setFormValue] = useState({
    username: '',
    email: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(formValue.email, formValue.password)
  }

  return (<>
    <section className="authentication">
      <h2 className="authentication__title">Регистрация</h2>
      <form className="authentication__form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          className="authentication__form-input"
          name="email"
          value={formValue.email}
          required={true}
          onChange={handleChange} />
        <input
          type="password"
          placeholder="Пароль"
          className="authentication__form-input"
          name="password"
          minLength={6}
          value={formValue.password}
          required={true}
          onChange={handleChange} />
        <button className="authentication__form-submit-btn authentication__form-submit-btn_registered" type="submit">{isLoading ? "Регистрация..." : "Зарегистрироваться"}</button>
      </form>
      <div className="authentication__register">
        <p className="authentication__register-subtitle">Уже зарегистрированы?&nbsp;</p>
        <Link to="/sign-in" className="authentication__register-link">Войти</Link>
      </div>
    </section>
  </>
  );
}

export default Register;