import { useState } from 'react'
import Header from './components/Header'
import './App.css'

import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps, UploadFile } from 'antd';
import { message, Upload } from 'antd';

const { Dragger } = Upload;

function App() {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

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

  const procesar = async () => {
    if (fileList.length !== 2) {
      message.error("Tenés que cargar exactamente 2 JSON");
      return;
    }

    try {
      const json1 = await leerJSON(fileList[0].originFileObj as File);
      const json2 = await leerJSON(fileList[1].originFileObj as File);

      console.log("JSON 1:", json1);
      console.log("JSON 2:", json2);

      message.success("JSONs cargados correctamente");
    } catch (e) {
      message.error("Error leyendo los JSON");
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
                <button onClick={procesar} style={{ marginTop: 16 }}>
              Procesar JSON
            </button>
                <button>Cancelar</button>
              </div>
            </div>
          </div>

          {/* DERECHA */}
          <div className="right">
            <ul className="floating-box">
              <li>pepe</li>
            </ul>
          </div>
        </div>
      </main>
  </>
  )
}

export default App
