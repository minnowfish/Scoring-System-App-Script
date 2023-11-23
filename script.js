function checkAnswer(question,answer){
  const ss = SpreadsheetApp.getActive();
  const answerSheet = ss.getSheetByName('Answers');
  let range = answerSheet.getRange(2,1,10);
  const sheetQuestions = range.getValues();
  for (let i = 0; i < 10; i++) {
    if (sheetQuestions[i][0] === question){
      var index = i;
      break;
    }
  }
  range = answerSheet.getRange(index+2,2);
  const correctAnswer = range.getValue();
  
  if (answer === correctAnswer){
    return true
  } else {
    return false
  }
}

function findEmail(email){
  const ss = SpreadsheetApp.getActive();
  const scoreSheet = ss.getSheetByName('Scores');
  let range = scoreSheet.getRange(4,1,200);
  const sheetEmail = range.getValues();
  for (let i = 0; i < 200; i++){
    if (sheetEmail[i][0] == email){
      var index = i;
      break;
    }
  }

  return index + 4

}

function colourCell(row, correct, tier, questionNumber){
  const ss = SpreadsheetApp.getActive();
  const scoreSheet = ss.getSheetByName('Scores');
  let total = parseInt(scoreSheet.getRange(row,12).getValue())

  if (correct){
    var backgroundColor = "green";
  } else{
    var backgroundColor = "red";
  }

  if(tier === "Beginner"){
    if(questionNumber === "1"){
      scoreSheet.getRange(row, 2).setBackground(backgroundColor)
    }else if (questionNumber === "2"){
      scoreSheet.getRange(row, 3).setBackground(backgroundColor)
    }else if (questionNumber === "3"){
      scoreSheet.getRange(row, 4).setBackground(backgroundColor)
    }else{
      scoreSheet.getRange(row, 5).setBackground(backgroundColor)
    }
    if (correct){
      scoreSheet.getRange(row,12).setValue(total + 1)
    }

  }else if(tier === "Intermediate"){
    if(questionNumber === "1"){
      scoreSheet.getRange(row, 6).setBackground(backgroundColor)
    }else if (questionNumber === "2"){
      scoreSheet.getRange(row, 7).setBackground(backgroundColor)
    }else{
      scoreSheet.getRange(row, 8).setBackground(backgroundColor)
    }
    if (correct){
      scoreSheet.getRange(row,12).setValue(total + 3)
    }

  }else if(tier ==="Challenging"){
    if(questionNumber === "1"){
      scoreSheet.getRange(row, 9).setBackground(backgroundColor)
    }else{
      scoreSheet.getRange(row, 10).setBackground(backgroundColor)
    }
    if (correct){
      scoreSheet.getRange(row,12).setValue(total + 5)
    }

  }else{
    scoreSheet.getRange(row, 11).setBackground(backgroundColor)

    if (correct){
      scoreSheet.getRange(row,12).setValue(total + 10)
    }
  }
}

function onFormSubmit(e) {
  const values = e.values;
  const email = values[2];
  const tier = values[3];
  const questionNumber = values[4];
  const answer = values[5];

  question = tier+questionNumber;
  let correct = checkAnswer(question,answer);

  emailRow = findEmail(email);
  colourCell(emailRow, correct, tier, questionNumber)
}
