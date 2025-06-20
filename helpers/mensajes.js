const { resolve } = require('path');

require('colors');


const mostrarMenu = ( opt ) =>{
    console.clear();

    return new Promise( resolve =>{
        console.log('======================'.green );
        console.log(' Seleccione un opcion: '.green );
        console.log('======================\n'.green );

        console.log(` ${'1'.green }. Crear tarea`);
        console.log(` ${'2'.green }. Listar tarea`);
        console.log(` ${'3'.green }. Listar tareas completadas`);
        console.log(` ${'4'.green }. Listar tareas pendientes`);
        console.log(` ${'5'.green }. Completar tareas`);
        console.log(` ${'6'.green }. Borrar tareas`);
        console.log(` ${'0'.green }. Salir\n`);

        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        readline.question('Seleccione una opcion: ', ( opt ) =>{
            readline.close();
            resolve( opt )
        });

    } );

}

const pausa = () =>{
    return new Promise( resolve => {
         const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
        });

        readline.question(`\nPresione ${ 'ENTER'.green } para continuar`, (opt) =>{
            readline.close();
            resolve();
        });

    });
   
}

module.exports ={
    mostrarMenu,
    pausa
};




