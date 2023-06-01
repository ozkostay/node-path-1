const fs = require('fs');
const path = require('path');
const readline = require('readline');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const argv = yargs(hideBin(process.argv))
        .options('logfile', {
          alias: 'l',
          type: 'string',
          description: 'file for log of game',
        }).argv;

if ( !("logfile" in argv) || (!argv.logfile.trim()) ) {
  console.log('Необходимо задать имя лог-файла --logfile=XXX ');
  return;
}

const logFile = path.join(__dirname, './logs', argv.logfile);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let answerText = 'Введите число 1 или 2 \n';

function checkNumber() {
  const num = Math.floor( Math.random() * 2) + 1;
  console.log('Для отладки - Загадано: ', num);
  rl.question(answerText, (answer) => {
    if ( +answer === num) {
      console.log('Угадали!!!');
      fs.appendFile(logFile, `Число угадано!!! Загадано число ${num} Введено число ${answer}\n`, (err) => {
        if (err) throw Error(err);
      });
      rl.close();
    } else {
      console.log('Не угадали \n');
      fs.appendFile(logFile, `Не угадали :-( Загадано число ${num} Введено число ${answer}\n`, (err) => {
        if (err) throw Error(err);
      });
      checkNumber();
    }
  });
}

checkNumber();
