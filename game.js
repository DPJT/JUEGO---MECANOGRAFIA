// define the time limit
let TIME_LIMIT = 60;

// define quotes to be used
let quotes_array = [
  "osa osea asa amor mea marea mar marimar",
  "au ai ai au ae ao au ao ao ae ao ao ai ai",
  "eu ei ei eu eu eo eo eo eo euea eaei ei eo ae",
  "io ia ia ia ioa ioa ie ie ie ei iu iu iu iuioi ia ",
  "oa oa oe oe oi oi ou ou ou ou osaoa oea oea oie oia oias",
];

/* registro de las personas que participan */

let registro = [];

// selecting required elements
let timer_text = document.querySelector(".curr_time");
let accuracy_text = document.querySelector(".curr_accuracy");
let error_text = document.querySelector(".curr_errors");
let cpm_text = document.querySelector(".curr_cpm");
let wpm_text = document.querySelector(".curr_wpm");
let quote_text = document.querySelector(".quote");
let input_area = document.querySelector(".input_area");
let restart_btn = document.querySelector(".restart_btn");
let cpm_group = document.querySelector(".cpm");
let wpm_group = document.querySelector(".wpm");
let error_group = document.querySelector(".errors");
let accuracy_group = document.querySelector(".accuracy");

//DJ necesary elements
let regis = document.querySelector(".registro");
let customText = document.querySelector(".input_customtext");

let modetype = "a";
let modoa = document.querySelector(".modoa");

/* funciion para insertar registro */

function insertRegistro(wpm, cpm, errores, aciertos) {
  var elemento1 = document.createElement("div");
  elemento1.id = "elemento1";
  elemento1.style.display = "flex";
  elemento1.classList = ["gap-15"];

  var hijo1 = document.createElement("h3");
  var hijo2 = document.createElement("h3");
  var hijo3 = document.createElement("h3");
  var hijo4 = document.createElement("h3");

  hijo1.innerHTML = wpm;
  hijo2.innerHTML = cpm;
  hijo3.innerHTML = errores;
  hijo4.innerHTML = aciertos;
  elemento1.appendChild(hijo1);
  elemento1.appendChild(hijo2);
  elemento1.appendChild(hijo3);
  elemento1.appendChild(hijo4);

  regis.appendChild(elemento1);

  console.log("registro console", regis.children[1]);
}

/* fin funcion para insertar registro */

let timeLeft = TIME_LIMIT;
let timeElapsed = 0;
let total_errors = 0;
let errors = 0;
let accuracy = 0;
let characterTyped = 0;
let current_quote = "";
let quoteNo = 0;
let timer = null;

function updateQuote() {
  quote_text.textContent = null;
  console.log(customText.value, quotes_array);
  current_quote = quotes_array[quoteNo];

  // separate each character and make an element
  // out of each of them to individually style them
  current_quote.split("").forEach((char) => {
    const charSpan = document.createElement("span");
    charSpan.innerText = char;
    quote_text.appendChild(charSpan);
  });

  // roll over to the first quote
  if (quoteNo < quotes_array.length - 1) quoteNo++;
  else quoteNo = 0;
}

function processCurrentText() {
  // get current input text and split it
  curr_input = input_area.value;
  curr_input_array = curr_input.split("");

  // increment total characters typed
  characterTyped++;

  errors = 0;

  quoteSpanArray = quote_text.querySelectorAll("span");
  quoteSpanArray.forEach((char, index) => {
    let typedChar = curr_input_array[index];

    // characters not currently typed
    if (typedChar == null) {
      char.classList.remove("correct_char");
      char.classList.remove("incorrect_char");

      // correct characters
    } else if (typedChar === char.innerText) {
      char.classList.add("correct_char");
      char.classList.remove("incorrect_char");

      // incorrect characters
    } else {
      char.classList.add("incorrect_char");
      char.classList.remove("correct_char");

      // increment number of errors
      errors++;
    }
  });

  // display the number of errors
  error_text.textContent = total_errors + errors;

  // update accuracy text
  let correctCharacters = characterTyped - (total_errors + errors);
  let accuracyVal = (correctCharacters / characterTyped) * 100;
  accuracy_text.textContent = Math.round(accuracyVal);

  // if current text is completely typed
  // irrespective of errors
  if (curr_input.length == current_quote.length) {
    updateQuote();

    // update total errors
    total_errors += errors;

    // clear the input area
    input_area.value = "";
  }
}

function updateTimer() {
  if (timeLeft > 0) {
    // decrease the current time left

    modetype == "a" ? timeLeft-- : "none";
    console.log("tiempo update", modetype);
    // increase the time elapsed
    timeElapsed++;

    // update the timer text
    modetype == "a"
      ? (timer_text.textContent = timeLeft + "s")
      : (timer_text.textContent = timeElapsed + "s");
  } else {
    // finish the game
    finishGame();
  }
}

function finishGame() {
  // stop the timer
  clearInterval(timer);

  // disable the input area
  input_area.disabled = true;

  // show finishing text
  quote_text.textContent = "Click para reiniciar el juego.";

  // display restart button
  restart_btn.style.display = "block";

  console.log(
    "error_group",
    error_text.innerHTML,
    "accuracy_group",
    accuracy_text.innerHTML
  );

  // calculate cpm and wpm
  cpm = Math.round((characterTyped / timeElapsed) * 60);
  wpm = Math.round((characterTyped / 5 / timeElapsed) * 60);

  /* inicio registro */
  insertRegistro(wpm, cpm, error_text.innerHTML, accuracy_text.innerHTML);

  // update cpm and wpm text
  cpm_text.textContent = cpm;
  wpm_text.textContent = wpm;

  // display the cpm and wpm
  cpm_group.style.display = "flex";
  wpm_group.style.display = "flex";
}

function startGame() {
  let customTextArray = formatParagraph(customText.value, 60);

  modetype == "a" ? null : (quotes_array = customTextArray);
  resetValues();
  updateQuote();

  // clear old and start a new timer
  clearInterval(timer);
  timer = setInterval(updateTimer, 1000);
}

function resetValues() {
  timeLeft = TIME_LIMIT;
  timeElapsed = 0;
  errors = 0;
  total_errors = 0;
  accuracy = 0;
  characterTyped = 0;
  quoteNo = 0;
  input_area.disabled = false;

  input_area.value = "";
  quote_text.textContent = "Click on the area below to start the game.";
  accuracy_text.textContent = 100;
  timer_text.textContent = timeLeft + "s";
  error_text.textContent = 0;
  restart_btn.style.display = "none";
  cpm_group.style.display = "none";
  wpm_group.style.display = "none";
}

/* DJ función para separar el texto el lineas según un límite máximo de carácteres por linea */
function formatParagraph(paragraph, limite) {
  let words = paragraph;
  let wordsArray = words.split(" ");
  let max = limite; //este es el líumite de carácteres
  let acumulador = "";
  let i = 0;
  let arrayDeOraciones = [];

  while (acumulador.length < max) {
    if (!wordsArray[i]) break;
    acumulador = acumulador + wordsArray[i] + " ";
    i++;
    //if (wordsArray.length == i + 1) break;
    let sumaSiguiente = acumulador + wordsArray[i];
    if (sumaSiguiente.length > max) {
      arrayDeOraciones.push(acumulador.trim());
      acumulador = "";
      console.log(arrayDeOraciones, "separacion", acumulador);
    }
  }
  return arrayDeOraciones;
}

function resetMode(value) {
  modetype = value;
  modetype == "a"
    ? (customText.style.display = "none")
    : (customText.style.display = "flex");
}
