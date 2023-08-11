"use strict";

////////////////////////////
// Variables
let dataSet;
let wordsData;

////////////////////////////
// Elements
const balanceEl = document.querySelector(".my-balance__amount"),
  monthTotalEl = document.querySelector(".this-month__amount"),
  monthChangeEl = document.querySelector(".last-month__amount");

const monNumEl = document.querySelector(".box-display__amount--mon"),
  tueNumEl = document.querySelector(".box-display__amount--tue"),
  wedNumEl = document.querySelector(".box-display__amount--wed"),
  thuNumEl = document.querySelector(".box-display__amount--thu"),
  friNumEl = document.querySelector(".box-display__amount--fri"),
  satNumEl = document.querySelector(".box-display__amount--sat"),
  sunNumEl = document.querySelector(".box-display__amount--sun");

const monBoxEl = document.querySelector(".graph__box--mon"),
  tueBoxEl = document.querySelector(".graph__box--tue"),
  wedBoxEl = document.querySelector(".graph__box--wed"),
  thuBoxEl = document.querySelector(".graph__box--thu"),
  friBoxEl = document.querySelector(".graph__box--fri"),
  satBoxEl = document.querySelector(".graph__box--sat"),
  sunBoxEl = document.querySelector(".graph__box--sun");

////////////////////////////
// Event-listeners
window.onload = function () {
  getJSONData();
};

////////////////////////////
// Functions

// get json data from file
function getJSONData() {
  // fetch data from .json file
  fetch("../assets/json/data.json")
    .then((res) => res.json())
    .then((data) => {
      dataSet = data;
      displayJSONData();
    });
}

// display json data
function displayJSONData() {
  // get amounts
  const monAmount = dataSet.filter((obj) => obj.day === "mon")[0]["amount"];
  const tueAmount = dataSet.filter((obj) => obj.day === "tue")[0]["amount"];
  const wedAmount = dataSet.filter((obj) => obj.day === "wed")[0]["amount"];
  const thuAmount = dataSet.filter((obj) => obj.day === "thu")[0]["amount"];
  const friAmount = dataSet.filter((obj) => obj.day === "fri")[0]["amount"];
  const satAmount = dataSet.filter((obj) => obj.day === "sat")[0]["amount"];
  const sunAmount = dataSet.filter((obj) => obj.day === "sun")[0]["amount"];

  // display amount in boxes
  monNumEl.textContent = monAmount;
  tueNumEl.textContent = tueAmount;
  wedNumEl.textContent = wedAmount;
  thuNumEl.textContent = thuAmount;
  friNumEl.textContent = friAmount;
  satNumEl.textContent = satAmount;
  sunNumEl.textContent = sunAmount;

  // get amounts
  const amountsArr = dataSet.map((obj) => obj.amount);
  // get largest amount
  const maxAmount = Math.max(...amountsArr);
  // get total amount
  const totalAmount = amountsArr.reduce((a, b) => a + b, 0);

  // set box heights
  monBoxEl.style.height = `calc((${calcBoxHeight(
    maxAmount,
    monAmount
  )} / 16) * 1rem)`;
  tueBoxEl.style.height = `calc((${calcBoxHeight(
    maxAmount,
    tueAmount
  )} / 16) * 1rem)`;
  wedBoxEl.style.height = `calc((${calcBoxHeight(
    maxAmount,
    wedAmount
  )} / 16) * 1rem)`;
  thuBoxEl.style.height = `calc((${calcBoxHeight(
    maxAmount,
    thuAmount
  )} / 16) * 1rem)`;
  friBoxEl.style.height = `calc((${calcBoxHeight(
    maxAmount,
    friAmount
  )} / 16) * 1rem)`;
  satBoxEl.style.height = `calc((${calcBoxHeight(
    maxAmount,
    satAmount
  )} / 16) * 1rem)`;
  sunBoxEl.style.height = `calc((${calcBoxHeight(
    maxAmount,
    sunAmount
  )} / 16) * 1rem)`;

  // display current day of the week
  switch (new Date().getDay()) {
    case 0:
      sunBoxEl.classList.add("graph__box--active");
      break;
    case 1:
      monBoxEl.classList.add("graph__box--active");
      break;
    case 2:
      tueBoxEl.classList.add("graph__box--active");
      break;
    case 3:
      wedBoxEl.classList.add("graph__box--active");
      break;
    case 4:
      thuBoxEl.classList.add("graph__box--active");
      break;
    case 5:
      friBoxEl.classList.add("graph__box--active");
      break;
    case 6:
      satBoxEl.classList.add("graph__box--active");
      break;
    default:
      console.error("Error, couldn't read current day");
      break;
  }

  // display balance
  const balance = (693.54 + totalAmount).toFixed(2);
  balanceEl.textContent = balance;

  // display month total
  const monthTotal = (250.39 + totalAmount).toFixed(2);
  monthTotalEl.textContent = monthTotal;

  // display month change
  const monthChange = (((monthTotal - 467.12) / 467.12) * 100).toFixed(1);
  const monthChangeSign = monthChange < 0 ? "-" : "+";
  monthChangeEl.textContent = `${monthChangeSign}${Math.abs(monthChange)}%`;
}

// calculate height for graph boxes
function calcBoxHeight(maxHeight, thisHeight) {
  return 130 / (maxHeight / thisHeight);
}
