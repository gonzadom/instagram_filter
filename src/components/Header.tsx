import { useState } from "react";
import { Modal, Button } from "antd";
import logo from "../assets/logo.png";
import "./Header.css";

import { Collapse } from "antd";

const { Panel } = Collapse;

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => setIsModalOpen(true);
  const handleOk = () => setIsModalOpen(false);
  const handleCancel = () => setIsModalOpen(false);

  return (
    <>
      <header className="app-header">
        <img src={logo} alt="Logo" className="app-logo" />
        <Button type="primary" className="faq-button" onClick={showModal}>
          Preguntas Frecuentes
        </Button>
      </header>

      <Modal
        title="Preguntas Frecuentes"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Collapse accordion>
        <Panel header="¿Qué es esta aplicación?" key="1">
        <p>
            Es una aplicación web que te permite pasandole los archivos json correspondientes ver el listado de personas que seguis en instagram pero que no te siguen a vos.
        </p>
        </Panel>
        <Panel header="¿Como se usa?" key="2">
        <ul>
          <li>
            Debés cargar los archivos <strong>JSON</strong> exportados desde Instagram.
          </li>

          <li>
            Tomá el archivo <strong>ZIP</strong> que descargaste y <strong>descomprimilo</strong>.
          </li>

          <li>
            Dentro vas a encontrar una carpeta llamada{" "}
            <strong>followers_and_following</strong>.
          </li>

          <li>
            Dentro de esa carpeta vas a encontrar dos archivos:
            <ul>
              <li>
                <strong>followers_1.json</strong>
              </li>
              <li>
                <strong>following.json</strong>
              </li>
            </ul>
          </li>

          <li>
            Cargá ambos archivos en la página para procesarlos.
          </li>
        </ul>

        </Panel>
        <Panel header="¿Como generar los json?" key="3">
        <ul>
          <li>
            Andá a tu perfil de Instagram y abrí el menú de{" "}
            <strong>Configuración</strong>.
          </li>

          <li>
            Seleccioná <strong>Centro de cuentas</strong> y luego{" "}
            <strong>Tu información y permisos</strong>. Allí elegí{" "}
            <strong>Exportar tu información</strong>.
          </li>

          <li>
            En la sección tocá el botón <strong>Crear exportación</strong> y luego{" "}
            <strong>Exportar al dispositivo</strong>.
          </li>

          <li>
            Elegí formato <strong>JSON</strong>. En intervalo de fechas seleccioná{" "}
            <strong>Desde el inicio</strong>. En <strong>Personalizar información</strong>{" "}
            desmarcá todo y elegí solo <strong>Seguidores</strong> y{" "}
            <strong>Seguidos</strong>.
          </li>

          <li>
            Tocá <strong>Iniciar exportación</strong> y esperá a que Instagram genere los
            archivos. Te va a notificar por mail.
          </li>
        </ul>
        </Panel>
        <Panel header="¿Puedo usar la app en mi celular?" key="4">
        <p>
            Todavia no esta probado en celulares, pero deberia funcionar sin problemas en la mayoria de los navegadores moviles modernos.
        </p>
        </Panel>
        <Panel header="¿Cómo puedo reportar un error o dar feedback?" key="5">
        <p>
            Hablen con gonza :)
        </p>
        </Panel>
    </Collapse>
      </Modal>
    </>
  );
}