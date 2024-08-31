const displayInput = document.querySelector(".display-input");
const btnReset = document.querySelector(".btn-reset");
const btnEqual = document.querySelector(".btn-equal");
const btnDelete = document.querySelector(".btn-delete");
const buttons = document.querySelectorAll(".button");

const buttonsArray = Array.from(buttons);

let lastKeyOperatorFlag = false;
let decimalAdded = false;

const keyClickHandler = (event) => {
  const value = event.target.innerText;

  if (value === "." && decimalAdded) {
    return;
  }

  if ("+-x/".includes(value)) {
    if (lastKeyOperatorFlag) {
      let initialValue = displayInput.value;
      let updatedValue = initialValue.substring(0, initialValue.length - 1) + value;
      displayInput.value = updatedValue;
      return;
    }

    lastKeyOperatorFlag = true;
    decimalAdded = false;
  } else {
    lastKeyOperatorFlag = false;
    if (value === ".") {
      decimalAdded = true;
    }
  }

  displayInput.value += value;
  displayInput.scrollLeft = displayInput.scrollWidth;
};

const resetHandler = () => {
  displayInput.value = "";
  decimalAdded = false;
};

const deleteHandler = () => {
  let initialValue = displayInput.value;
  let updatedValue = initialValue.substring(0, initialValue.length - 1);
  displayInput.value = updatedValue;
};

const expressionHandler = (expression) => {
  const finalExpression = expression.replace(/x/g, "*");
  const result = eval(finalExpression);

  if (Number.isInteger(result)) {
    return result.toString();
  } else {
    return parseFloat(result).toFixed(3);
  }
};

const answerHandler = () => {
  const expression = displayInput.value;
  const result = expressionHandler(expression);
  displayInput.value = result;
};

buttonsArray.forEach((button) => button.addEventListener("click", keyClickHandler));
btnReset.addEventListener("click", resetHandler);
btnDelete.addEventListener("click", deleteHandler);
btnEqual.addEventListener("click", answerHandler);
