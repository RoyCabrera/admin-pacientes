import React,{Fragment,useState} from "react";
import { v4 as uuidv4 } from 'uuid';

const Formulario = ({crearCita}) => {

    /****************** HOOKS ************************* */  

    const [cita,actualizarCita] = useState({
        mascota:'',
        propietario:'',
        fecha:'',
        hora:'',
        sintomas:''
    });

    const [error,actualizarError] = useState(false);

    /****************** EXTRAER VALORES ************************* */  

    const {mascota,propietario,fecha,hora,sintomas} = cita; // ARRAY DESTRUCTURING

    /****************** FUNCIONES ************************* */  

    const actualizarState = (e) => {
        
        actualizarCita({
            ...cita, // SPREED OPERATOR 
            [e.target.name]:e.target.value // ARRAY DESTRUCTURING
        })
        
    }

    const submitCita = (e) =>{
        
        e.preventDefault();
        
        if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === ''){
            actualizarError(true);
            return;
        }

        actualizarError(false);
        cita.id = uuidv4();


        //crear cita

        crearCita(cita);
        actualizarCita({
            mascota:'',
            propietario:'',
            fecha:'',
            hora:'',
            sintomas:''
        })
        
    }

    

    /****************** COMPONENTE ************************* */  
    
    return(
        <Fragment>
            <h2>Crear Cita</h2>

            {error ? <p className='alerta-error'>Todos los campos son obligatorios</p>: null }

            <form onSubmit={submitCita} >
                <label>Nombre Mascota</label>
                <input type="text" name="mascota" className='u-full-width' placeholder='Nombre Mascota' onChange={actualizarState} value={mascota} />

                <label>Propietario Mascota</label>
                <input type="text" name="propietario" className='u-full-width' placeholder='Nombre dueño de la mascota' onChange={actualizarState} value={propietario} />

                <label>Fecha</label>
                <input type="date" name="fecha" id="" className='u-full-width' onChange={actualizarState} value={fecha}/>

                <label>Hora</label>
                <input type="time" name="hora" id="" className='u-full-width' onChange={actualizarState} value={hora} />

                <label>Sintomas</label>
                <textarea name="sintomas" className='u-full-width' onChange={actualizarState}value={sintomas} ></textarea>

                <button type="submit" className='u-full-width button-primary' >Agregar Cita</button>
            </form>
        </Fragment>
    );
};

export default Formulario;
