//! variable process
// console.log(process);

//! lista de propiedades de la variable process
// console.log(Object.keys(process));

//! ejemplo STDIN y STDOUT
// // Output un prompt
// process.stdout.write('prompt > ');
// // El evento stdin 'data' se dispara cuando el user escribe una línea
// process.stdin.on('data', function (data) {
//     var cmd = data.toString().trim(); // remueve la nueva línea
//     process.stdout.write('You typed: ' + cmd);
//     process.stdout.write('\nprompt > ');
// });

// //! creando comandos
const commands = require('./commands');

// Output un prompt
// process.stdout.write('prompt > ');
// // El evento stdin 'data' se dispara cuando el user escribe una línea
// process.stdin.on('data', function (data) {
//   var arg = data.toString().trim().split(' '); // remueve la nueva línea
//   var cmd = arg.shift();
//     if(commands.hasOwnProperty(cmd)) {
//         // process.stdout.write(Date());
//         commands[cmd](arg); 
        
//     }//si crashea el if se ejecuta el promp de abajo
//     else{
//         process.stdout.write('command not found');
//     }

//     // if(cmd === "pwd") {
//     //     // process.stdout.write(process.cwd());
//     // }
//     process.stdout.write('\nprompt > ');
// });

function done(output){
    process.stdout.write(output);
    process.stdout.write("\nprompt > ");
}

process.stdout.write("prompt > ");
process.stdin.on("data", function (data){
    const userInput = data.toString().trim().split(" ");
    const cmd = userInput.shift();
    const args = userInput.join(" ");

    if(commands[cmd]) commands[cmd](done, args);
    else done("You typed: " + cdm);
})


