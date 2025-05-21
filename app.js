require('colors');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { 
    inquirerMenu, 
    pausa, 
    leerInput, 
    listadoTareaBorrar, 
    confirmar, 
    mostrarListadoCheckList 
    } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');

console.clear();

const main = async() =>{
    
    let opt = '';
    const tareas = new Tareas();
    const tareasDB = leerDB();

    if( tareasDB ){
        tareas.cargarTareaFromArr( tareasDB );
    }

    do {
        opt = await inquirerMenu();
        
        switch ( opt ) {
            case '1':
                const desc = await leerInput('Descripcion: ');
                tareas.crearTarea(desc);
                console.log(desc);

                break;
            case '2':
                tareas.listadoCompleto();
                break;
            case '3':
                tareas.listarPendientesCompletadas(true);
                break;
            case '4':
                tareas.listarPendientesCompletadas(false);
                break;
            case '5':
                const ids = await mostrarListadoCheckList( tareas.listadoArr );
                tareas.toggleCompletadas( ids );
                break;
            case '6':
                const id = await listadoTareaBorrar( tareas.listadoArr );
                //preguntar si esta seguro de borrar
                if(id !== '0'){
                    const ok = await confirmar('Estas seguro?');
                    if( ok ){
                        tareas.borrarTarea( id );
                        console.log('Tarea eliminada con exito');
                    }
                }
                break;
        }
        guardarDB( tareas.listadoArr );

        await pausa();
        
    } while (opt !== '0');
};

main();