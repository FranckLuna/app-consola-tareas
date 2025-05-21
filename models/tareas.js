const Tarea = require('./tarea');
const colors = require('colors');

/*
_listado:
        { 'uuid: 42342342342324' }:{id: 34, desc: lakjdf, completado: true } }
*/

class Tareas {

    _listado = {};

    get listadoArr(){
        const listado = [];
        //extrae todas las llaves de un objeto
        Object.keys( this._listado ).forEach( key =>{
            const tarea = this._listado[key];
            listado.push( tarea );
        }) ;

        return listado;
    }
    constructor(){
        this._listado = {};
    }

    borrarTarea(id = ''){
        if( this._listado[id] ){
            delete this._listado[id];
        }
    }

    cargarTareaFromArr( tareas = [] ){
        //const listado = [];
        tareas.forEach( tarea =>{
            this._listado[tarea.id] = tarea;
        } );
    };

    listadoCompleto(){
        //hecho por mi
        // const listado = Object.values(this._listado);

        // listado.forEach((element, index) => {
        //     if(element.completado != null){
        //         console.log( colors.green(index + 1), colors.green( element.desc), 'Completado' );
        //     }else{
        //         console.log( colors.green(index + 1), colors.red( element.desc), 'Pendiente' );
        //     }
        // });

        //hechoo por el profe
        this.listadoArr.forEach( (tarea, i) => {
            const idx = `${i + 1}`.green;
            const { desc, completado } = tarea;
            const estado = ( completado )
                            ? colors.green('completado')
                            : colors.red('Pendiente');
            console.log(`${idx} ${desc} :: ${estado} `);
        });
    };

    listarPendientesCompletadas( completadas = true){
        //hecho por mi
        let contador1 = 0;
        const listado = Object.values(this._listado);
        listado.forEach((element) => {
            if (completadas && element.completado != null) {
                contador1 += 1;
                console.log(colors.green(contador1 + '.'), element.desc, colors.green(element.completado) );
            }
            if (!completadas && element.completado === null) {
                contador1 += 1;
                console.log(colors.green(contador1 + '.' ), element.desc, 'Pendiente'.red);
            }
        });


        //hecho por el profe
        // let contador = 0;
        // this.listadoArr.forEach( tarea => {
        //     const { desc, completado } = tarea;
        //     const estado = ( completado )
        //                     ? colors.green('completado')
        //                     : colors.red('Pendiente');
            
        //     if( completadas ){
        //         //mostrar completadas
        //         if( completado ){
        //             contador+=1;
        //             console.log(`${ contador.toString().green } ${desc} :: ${estado} `);
        //         } 
        //     } else {
        //             if( !completado ){
        //                 contador+=1;
        //                 console.log(`${ contador.toString().green } ${desc} :: ${estado} `);
        //             }
        //         }
        // });

    };

    crearTarea( desc = '' ){
        const tarea = new Tarea( desc );
        this._listado[tarea.id] = tarea;    
    };

    toggleCompletadas ( ids = [] ) {
        ids.forEach( id => {
            const tarea = this._listado[id];
            if( !tarea.completado ){
                tarea.completado = new Date().toISOString();
            }
        });

        this.listadoArr.forEach( tarea =>{
            if( !ids.includes( tarea.id) ){
                this._listado[tarea.id].completado = null;
            }
        })

    };

};

module.exports = Tareas;