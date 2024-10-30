import React, {useState, useRef} from "react";
import axios from "axios";
import "../styles/paramsForm.css"

export const ParamsForm = () => {
    const [params, setParams] = useState({backgroundImage: "fondo.png", executionTime: "", emails: ""});
    const backgroundImageRef = useRef<HTMLInputElement>(null)

    const handleUpdate = async() => {
        await axios.post("http://localhost:3000/api/parameters", params);
        alert("Parametros actualizados")
    };

    return (
        <form 
        className="formContainer"
            onSubmit={(e) => {
                e.preventDefault();
                handleUpdate()
                setParams({backgroundImage: "", executionTime: "", emails: ""})

                backgroundImageRef.current?.focus()
            }}
        >
            <h1 className="headerForm">Configuracion de Parametros</h1>

            <label htmlFor="backgroundImage">Seleccione la imagen de fondo</label>
            <select name="backgroundImage" id="backgroundImage"
            value={params.backgroundImage}
            // defaultValue={"fondo.png"}
            onChange={(e) => 
                setParams({...params, backgroundImage: e.target.value})
            }
            className="formInput"
            >

                <option value="fondo.png">Julio</option>
                <option value="Error.png">Error</option>
            </select>


            <label htmlFor="executionTime">Seleccione el horario de envio</label>
            <input type="time"
            className="formInput" 
            name="executionTime"
                value={params.executionTime}
            onChange={(e) => 
                setParams({...params, executionTime: e.target.value})
            }
            placeholder="Horario de envio de correo"
            />

            <label htmlFor="emails">Emails de los destinatarios (separados por comas ',')</label>
            <input type="text" 
            className="formInput"
                name="emails"
            value={params.emails}
            onChange={(e) => 
                setParams({...params, emails: e.target.value})
            }
            placeholder="Correos de los destinatarios"
            />
            
            <button className="formButton">Enviar</button>
        </form>
    )
}