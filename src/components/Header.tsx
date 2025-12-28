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
        <p>
            Primero debes cargar los archivos JSON exportados desde Instagram que contienen la lista de tus seguidores y seguidos. Luego, la aplicación procesará estos archivos y te mostrará un listado de las personas que seguis pero que no te siguen de vuelta.
            Si lo deseas, podés descargar este listado en un archivo de texto para futuras referencias.
        </p>
        </Panel>
        <Panel header="¿Como generar los json?" key="3">
        <p>
            Sí, encontrarás guías rápidas y videos de ayuda dentro de la sección “Ayuda” o “Tutorial” en la app.
        </p>
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