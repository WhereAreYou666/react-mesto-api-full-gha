import React, { useState } from 'react';

const Login = ({ handleLogin, isLoading }) => {
  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
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
    if (!formValue.email || !formValue.password) {
      return;
    }
    handleLogin(formValue.email, formValue.password);
  }

  return (
    <section className="authentication">
      <h2 className="authentication__title">Вход</h2>
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
          value={formValue.password}
          required={true}
          onChange={handleChange} />
        <button className="authentication__form-submit-btn" type="submit">{isLoading ? "Вход..." : "Войти"}</button>
      </form>
    </section>
  );
}

export default Login;