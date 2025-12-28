import { useState } from 'react'
import Header from './components/Header'
import './App.css'

import { InboxOutlined, RightOutlined, DeleteOutlined, DownloadOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';
import type { UploadProps, UploadFile } from 'antd';
import { message, Upload, List, Typography } from 'antd';

const { Dragger } = Upload;

const { Paragraph, Title } = Typography;

function App() {

  const initialData = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
];

  const [data, setData] = useState(initialData);

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const jsonALista = (json: any, esJsonSeguidos: boolean): string[] => {
  const lista: string[] = [];

  if (esJsonSeguidos) {
    // following.json
    const following = json.relationships_following;
    for (const elemento of following) {
      lista.push(elemento.title);
    }
  } else {
    // followers.json
    for (const elemento of json) {
      lista.push(elemento.string_list_data[0].value);
    }
  }

    return lista;
  };

  const downloadTxtFile = () => {
    if (data.length === 0) {
      message.error("No hay datos para descargar");
      return;
    }

    const element = document.createElement("a");
    const file = new Blob([data.join("\n")], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "data.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const clearData = () => {
    if (data.length === 0) {
      message.error("La lista ya está vacía");
      return;
    }
    setData([]); // limpia el array
  };

  const props: UploadProps = {
    multiple: true,
    accept: ".json",
    fileList,

    // ⛔ no POST
    beforeUpload: (file) => {
      if (file.type !== "application/json") {
        message.error("Solo archivos JSON");
        return Upload.LIST_IGNORE;
      }

      if (fileList.length >= 2) {
        message.error("Solo se permiten 2 archivos");
        return Upload.LIST_IGNORE;
      }

      return false;
    },

    onChange({ fileList }) {
      setFileList(fileList);
    },

    onRemove(file) {
      setFileList(prev => prev.filter(f => f.uid !== file.uid));
    },
  };

  // 📖 leer y parsear JSON
  const leerJSON = async (file: File) => {
    const text = await file.text();
    return JSON.parse(text);
  };

  const limpiarArchivos = () => {
    if (fileList.length === 0) {
      message.error("No hay archivos para eliminar");
      return;
    }
    setFileList([]);
    message.success("Archivos eliminados");
  };

  const procesar = async () => {

    if (fileList.length === 1) {
      if (fileList[0].name !== "followers.json") {
        message.warning("Falta el JSON de followers");
        return;
      } else {
        message.warning("Falta el JSON de following");
        return;
      }
    }

    if (fileList.length !== 2) {
      message.error("Tenés que cargar exactamente 2 JSON");
      return;
    }

    try {
    // leer ambos archivos
    const jsonA = await leerJSON(fileList[0].originFileObj as File);
    const jsonB = await leerJSON(fileList[1].originFileObj as File);

    // detectar cuál es cuál
    let seguidoresJSON, seguidosJSON;

    if (jsonA.relationships_following) {
      seguidosJSON = jsonA;
      seguidoresJSON = jsonB;
    } else {
      seguidosJSON = jsonB;
      seguidoresJSON = jsonA;
    }

    const seguidores = jsonALista(seguidoresJSON, false);
    const seguidos = jsonALista(seguidosJSON, true);

    const seguidosNoSiguen: string[] = [];
    for (const seguido of seguidos) {
      if (!seguidores.includes(seguido)) {
        seguidosNoSiguen.push(seguido);
      }
    }

    setData(seguidosNoSiguen);

    message.success(`Listo ✔ ${seguidosNoSiguen.length} personas no te siguen`);
  } catch (e) {
    message.error("Error procesando los JSON, intenta de nuevo");
  }
};

  return (
    <>
      <Header />
      <main>
        <div className="layout">
          {/* IZQUIERDA */}
          <div className="left">
            <div className="floating-box">
              <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Hace click o arrastra los archivos a esta área para subirlos</p>
                <p className="ant-upload-hint">
                  Soporte para uno o múltiples archivos.
                </p>
              </Dragger>

              <div className="actions">
                <Space>
                  <Button type="primary"  icon={<RightOutlined />} onClick={procesar}>Procesar JSONs</Button>
                  <Button type="primary" danger icon={<DeleteOutlined />} onClick={limpiarArchivos}>Eliminar archivos</Button>
                </Space>
              </div>
            </div>
          </div>

          {/* DERECHA */}
          <div className="right">
            
            <div className="floating-box-right list-container">

              <Title level={4}>Personas que seguis pero no te siguen</Title>

              <List
                bordered
                dataSource={data}
                renderItem={(item) => (
                  <List.Item>
                    <Paragraph copyable>{item}</Paragraph>
                  </List.Item>
                )}
              />

              <Space>
                <Button type="primary" icon={<DownloadOutlined />} color="cyan" onClick={downloadTxtFile}>Descargar listado</Button>
                <Button type="primary" danger icon={<DeleteOutlined />} onClick={clearData}>Limpiar lista</Button>
              </Space>
            </div>
          </div>
        </div>
      </main>
  </>
  )
}

export default App
