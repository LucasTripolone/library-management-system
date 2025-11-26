import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../Contexto/UserContext';
import { useNavigate } from "react-router-dom"

export const Navbar = () => {
  const navigate = useNavigate()
  const { user, setUser } = useUser();

  // Verificar si existe el usuario en el localStorage
  const checkUser = () => {
    const userFromStorage = localStorage.getItem('bibliotecaLogedUser');
    if (userFromStorage) {
      setUser(JSON.parse(userFromStorage));
    }
  };

  // Llamar a checkUser al cargar el componente
  useEffect(() => {
    checkUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handler para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('bibliotecaLogedUser');
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
      <div className="container-fluid">
        <Link to={'/'}>
          <div className="navbar-brand text-light">
            <i className="bi bi-book logo-in-nav"> Biblioteca</i>
          </div>
        </Link>
        <div>
          <Link to={"/menu"} className="text-light">
            Menu
          </Link>
        </div>
        <div className="d-flex">
          <div className="flex-grow"></div>
          {user ? (
            <div id="usuarioLogeado" className="d-flex align-items-center position-relative">
              <div className="dropdown ml-2">
                <div
                  className="dropdown-toggle"
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ cursor: 'pointer' }}
                >
                </div>
                  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <li>
                      <button onClick={handleLogout} className="dropdown-item">
                        Cerrar sesión
                      </button>
                    </li>
                  </ul>
              </div>
              <i className="bi bi-person-fill text-light" style={{ marginRight: '8px' }}></i>
              <div className="text-light">{user.nombre}</div>
            </div>
          ) : (
            <div>
              <Link to={"/"} className="btn btn-primary">Iniciar sesión</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
