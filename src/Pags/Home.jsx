import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { db } from '../BD/firebase-config';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const categorias = ["Todas", "Arquitectura", "Medicina", "Programación"];

function Home() {

  const [categoria, setCategoria] = useState('Todas');
  const [loading, setLoading] = useState(false);
  const [resultados, setResultados] = useState([]);



  const handleBuscar = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const q = query(collection(db, "Material"),
        categoria === "Todas"
          ? undefined
          : where("Categoria", "==", categoria)
      );
      const querySnapshot = await getDocs(q);

      // Transforma los documentos a un array de objetos
      const docs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setResultados(docs);
    } catch (error) {
      alert('Error al buscar ' + error.message);
    }
    setLoading(false);
  };

const handleDescargar = async (ruta) => {
  const storage = getStorage();
  try {
    const url = await getDownloadURL(ref(storage, ruta));
    window.open(url, '_blank');
  } catch (error) {
    alert('No se pudo descargar el archivo');
  }
};
  return (
    <div className='container-fluid bg-dark text-white' style={{ minHeight: '100vh' }}>
      <div className="container py-5">
        <h1 className="mb-4">Biblioteca de Alumnos</h1>
        <form >
          <div className="row mb-4">

            <div className="col-md-4 mb-2">
              <select
                className="form-select"
                value={categoria}
                onChange={e => setCategoria(e.target.value)}
              >
                {categorias.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="col-md-2 mb-2 d-grid">
              <button type="submit" className="btn btn-info" onClick={handleBuscar}>
                Buscar
              </button>
            </div>
          </div>
        </form>
        <div className='d-flex flex-row flex-wrap justify-content-around'>
          {resultados.map((mat, index) => (
            <div key={index} className="card m-2" >
              <div className="card-body bg-light">
                <div className="d-flex flex-row">
                  <p className="card-text"><strong>Titulo: </strong></p>
                  <p className="card-text mx-2">{mat.Titulo}</p>
                </div>
                <div className="d-flex flex-row">
                  <p className="card-text "><strong>Autor: </strong></p>
                  <p className="card-text  mx-2">{mat.Autor}</p>
                </div>
                <div className="d-flex flex-row">
                  <p className="card-text "><strong>Año: </strong></p>
                  <p className="card-text mx-2">{mat.Year}</p>
                </div>

                <button className='btn btn-success' onClick={() => handleDescargar(mat.Ruta)}>Descargar</button>

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;