import kiiex from "../../assets/Logos/kiiex.png";
import './header.css';

const Header = () => {
  return (
    <section className="header">
      <img src={kiiex} alt="Descripción" className="logo__kiiex" />
      <h1 className="title__header">Información de la empresa solicitante</h1>
      <h2 className="subtitle__header">
        Diligencia todos los campos del formulario marcados como requeridos* para poder enviar una solicitud
      </h2>
    </section>
  );
};

export default Header;