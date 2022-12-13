import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
export default function App() {
  const [imagen, setImagen] = useState("")
  const [datos, setDatos] = useState("")
  const get = async () => {
    const tabla = "image"
    await axios.get(`http://localhost:5000/images/${tabla}`).then(function (response) {
      setDatos(response.data)
      //console.log(typeof response.data)
    })
      .catch(function (error) {

      })
  }
  useEffect(() => {
    get()
  }, [])
  const upload = async () => {
    try {
      const formdata = new FormData()
      formdata.append("image", imagen)
      const tabla = "image"
      let res = await axios.post(`http://localhost:5000/images/${tabla}`, formdata)
      Swal.fire({
        //position: 'top-end',
        icon: res.err ? "error" : "success",
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500
      })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <div className="grid  grid-cols-4 gap-4 shadow-xl p-4">
        <div className="col-span-3">
          <input type="file"
            id="input" placeholder="Cargar imagen" className="input w-full" onChange={
              (e) => {
                setImagen(e.target.files[0])
              }
            } />
        </div>
        <div className="col-span-1">
          <button className="btn btn-primary" onClick={upload}>Enviar</button>
        </div>
      </div>          
{/*       {datos.map((dato,key) => {
        return (
           <p key={dato.id}>
            {dato.nombre}
          </p>
          <img src={`${dato.nombre}`} alt="" key={dato.id}/>
        )
      })} */}
    </div>
  );
}


