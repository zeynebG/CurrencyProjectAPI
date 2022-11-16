let buttonTopL = document.querySelectorAll("li .leftButtons");
let buttonTopR = document.querySelectorAll("li .rightButtons");

let buttonBottomL = document.querySelector(".left p");
let buttonBottomR = document.querySelector(".right p");

let base = "RUB";
let symbols = "USD";

let active;

let inputLeft = document.querySelector(".left input");
let inputRight = document.querySelector(".right input");
let value;

function buttonsEdit(c) {
  buttonTopL.forEach(function (a) {
    a.onclick = async function () {
      console.log(a);
      base = a.innerText;
      await f();
      changeCost();
      buttonTopL.forEach(function (b) {
        b.classList.remove("active");
      });
      a.classList.add("active");
    };
  });

  buttonTopR.forEach(function (a) {
    a.onclick = async function () {
      symbols = a.innerText;
      await f();
      changeCost();
      console.log(a);
      buttonTopR.forEach(function (b) {
        b.classList.remove("active");
      });
      a.classList.add("active");
    };
  });
}
buttonsEdit();

function changeCost() {
  if (active == "left") {
    if (inputLeft.value != "") {
      inputRight.value = (value * inputLeft.value).toFixed(2);
    } else {
      inputRight.value = "";
    }
  } else if (active == "right") {
    if (inputRight.value != "") {
      inputLeft.value = ((1 / value) * inputRight.value).toFixed(2);
    } else {
      inputLeft.value = "";
    }
  }
}

async function f() {
  let a = await fetch(
    `https://api.exchangerate.host/latest?base=${base}&symbols=${symbols}`
  );
  let b = await a.json();
  value = b.rates[symbols];
  console.log(value);

  buttonBottomL.innerText = `1 ${base} = ${value.toFixed(2)} ${symbols} `;
  buttonBottomR.innerText = `1 ${symbols} = ${(1 / value).toFixed(2)} ${base} `;
}
f();

inputLeft.oninput = (item) => {
  if (inputLeft.value != "") {
    inputRight.value = (value * inputLeft.value).toFixed(2);
  } else {
    inputRight.value = "";
  }
  active = "left";
};
inputRight.oninput = (item) => {
  if (inputRight.value != "") {
    inputLeft.value = ((1 / value) * inputRight.value).toFixed(2);
  } else {
    inputLeft.value = "";
  }
  active = "right";
};

function c(p) {
  if (p == "right") {
    if (inputRight.value != "") {
      inputLeft.value = ((1 / value) * inputRight.value).toFixed(2);
    } else {
      inputLeft.value = "";
    }
  } else if (p == "left") {
    if (inputLeft.value != "") {
      inputRight.value = (value * inputLeft.value).toFixed(2);
    } else {
      inputRight.value = "";
    }
  }
}
