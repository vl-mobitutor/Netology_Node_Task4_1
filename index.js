//Курс Node.js - Урок 4 ДЗ - задача 4.1 - игра "Орел и решка"
const readline = require('readline')
const fs = require('fs');

const input = readline.createInterface(process.stdin);
const myArgv = process.argv;
const logFileName = myArgv[1].slice(0,-8) + myArgv[2];

main();

function main() {
  logGame(`Game started at ${Date()}`);
  console.log("Игра 'Орел и решка':");
  console.log("Вам нужно угадать случайно сгенерированное число - 1 или 2");
  console.log("Введите '1' или '2', или нажите 'Q' для выхода из игры:");
  input.on('line', (data) => predictNumber(data)); 
}

//Игра - угадывание случайно загаданного числа
function predictNumber(data) {
  let userFigure = Number(data);
  let myFigure = Math.round(1 + Math.random());
  
  if (isNaN(userFigure)) { //Проверка если пользователь ввел не число
    if (data == "Q" || data == "q") {
      console.log("Спасибо, игра завершена!");
      fs.appendFileSync(logFileName, `Game finished by User at ${Date()} \n`);
      fs.appendFileSync(logFileName, "-----------------------------------------------------------\n");
      process.exit(0);
    } else {
      console.log("Введите '1' или '2', или нажите 'Q' для выхода из игры:");
    }
    
  } else {
    if (userFigure == myFigure) {
      console.log("Вы угадали!");
      logGame(`Game result: User won! - ${Date()}`);
    } else {
      console.log("Вы не угадали!");
      logGame(`Game result: User lost! - ${Date()}`);
    }
  }
}

//Логирование результатов игры
function logGame(logString) {
  logString += "\n"; 
  fs.appendFile(logFileName, logString, (err) => {
    if (err) throw new Error(err);
  });
}