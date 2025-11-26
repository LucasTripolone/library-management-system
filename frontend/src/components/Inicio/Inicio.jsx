import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import loginService from '../../services/login.service.js';
import { useUser } from '../Contexto/UserContext';

export const Inicio = () => {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [errorMessage, setErrorMessage] = useState('')
  const { user, setUser } = useUser()

  useEffect(() => {
    const logedUser = window.localStorage.getItem("bibliotecaLogedUser")
    if (logedUser) {
      setUser(JSON.parse(logedUser))
    }
  }, [])

  useEffect(() => {
    if (user) {
      navigate('/menu');
    }
  }, [user, navigate]);

  const onSubmit = async (data) => {
    try {
      if (!data.username || !data.password) {
        setErrorMessage('Por favor, ingrese un nombre de usuario y una contraseña');
        return;
      }

      const login = {
        userName: data.username,
        password: data.password
      };
      const response = await loginService.doLogin(login);

      if (response && typeof response === 'object') {
        window.localStorage.setItem('bibliotecaLogedUser', JSON.stringify(response))
        setUser(response)
      } 
      else {
        setErrorMessage('Error desconocido al iniciar sesión')
        setTimeout(() => {
          setErrorMessage('')
        }, 5000)
      }
    } catch (error) {
      setErrorMessage('Error al iniciar sesión: ' + error.message)
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
    }
  };

  const loginForm = () => (<div className="d-flex justify-content-center align-items-center h-75">
  <div className="mx-auto">
    <div className="card">
      <div className="card-header text-left">
        <i className="bi"></i> Iniciar sesión
      </div>
      <div className="card-body">
        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}
        <div className="row justify-content-center">
          <div className="col-md-8">
            <form className="mt-3" onSubmit={handleSubmit(onSubmit)} id="login">
              <div className="form-group mb-3">
                <label htmlFor="username">Nombre de usuario</label>
                <input type="text" name="username" id="username" className={`form-control ${errors.username ? 'is-invalid' : ''}`} placeholder="Nombre de usuario" autoComplete="username" {...register("username", { required: true })} />
                {errors.username && <div className="invalid-feedback">Por favor, ingrese un nombre de usuario</div>}
              </div>

              <div className="form-group mb-3">
                <label htmlFor="password">Contraseña</label>
                <input type="password" name="password" id="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`} placeholder="Contraseña" autoComplete="current-password" {...register("password", { required: true })} />
                {errors.password && <div className="invalid-feedback">Por favor, ingrese una contraseña</div>}
              </div>
              
              <div className="d-flex justify-content-end">
                <button type="submit" className="btn btn-primary">Acceder</button>
              </div>
              <div className="d-flex justify-content-start mt-2">
                <Link to="/registro">Si no tienes un usuario, regístrate aquí</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
)

  return (
    <>
    { user 
      ? null
      : loginForm()
    }
    </>
  );
};