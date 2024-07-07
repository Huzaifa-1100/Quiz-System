#! /usr/bin/env node

// import inquirer from npm
import inquirer from "inquirer";
// import chalk from npm
import chalk from "chalk";

// storing api in a variable
const api: string =
  "https://opentdb.com/api.php?amount=6&category=18&difficulty=easy&type=multiple";

// fetch data from open travia DB
let fetchData = async (data: string) => {
  let fetchQuiz = await fetch(data);
  let response = await fetchQuiz.json();
  return response.results;
};
let computerQuiz = await fetchData(api);

// Greetings
console.log("-".repeat(60));
console.log(chalk.bgWhite.red("\t\tWELCOME TO QUIZ APP"));
console.log("-".repeat(60));

// quiz function
let startQuiz = async () => {
  // define initial quiz score
  let score = 0;
  //   for user name
  let userName = await inquirer.prompt({
    name: "name",
    type: "input",
    message: "Please Enter Your Name Here:",
  });
  for (let i = 1; i <= 5; i++) {
    // merge correct and incorrect answers
    let answers = [
      ...computerQuiz[i].incorrect_answers,
      computerQuiz[i].correct_answer,
    ];
    let askQuiz = await inquirer.prompt({
      name: "quiz",
      type: "list",
      message: computerQuiz[i].question,
      choices: answers.map((val) => val),
    });
    if (askQuiz.quiz == computerQuiz[i].correct_answer) {
      ++score;
      console.log("-".repeat(15));
      console.log(chalk.bgWhite.green("Correct Answer"));
      console.log("-".repeat(15));
    } else {
      console.log("-".repeat(40));
      console.log(
        chalk.bgRed.white(
          `Wrong, Correct Ans is ${computerQuiz[i].correct_answer}`
        )
      );
      console.log("-".repeat(40));
    }
  }
  console.log("-".repeat(60));

  console.log(
    chalk.bgWhite.red(
      `\tDear ${chalk.green(userName.name)}, your score is ${chalk.green(
        score
      )} out of ${chalk.green("5")}`
    )
  );
  if (score >= 3 && score < 5) {
    console.log(
      chalk.bgYellow.red(
        `Dear ${userName.name} Congratulations You Got Passing Marks`
      )
    );
  } else if (score == 5) {
    console.log(
      chalk.bgWhite.red(
        `\tDear ${userName.name}, Congratulations on a Perfect Score`
      )
    );
  } else {
    console.log(chalk.bgRed.white("\t\tBetter Luck Next Time"));
  }
  console.log("-".repeat(60));
};
startQuiz();
