import { useState } from 'react'
import Header from './components/Header'
import './App.css'

function App() {

  return (
    <>
      <Header />
      <main>
        <div className="layout">
          {/* IZQUIERDA */}
          <div className="left">
            <div className="floating-box">
              <input type="file" />
              <input type="file" />

              <div className="actions">
                <button>Procesar</button>
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
