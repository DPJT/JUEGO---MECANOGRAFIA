let words =
    "never, forget to empty your vacuum bags y todas las coasa que hemos pasado en este tiempo no las olvidare soldado extrañamente no descuuidaremios nuestra solida amistad",
  wordsArray = words.split(" ");

console.log(wordsArray, wordsArray[0].length);

let max = 66;
let acumulador = "";
let i = 0;
let arrayDeOraciones = [];
//lo que podemos hacer es ocgemos el string completo
//y analizamos si en el caracter 10 es el limite si es caracter 11 es o no un espacio en blanco

//otro metodo seria separa en palabras y si en el limite es el final entonces la contamos si no no
// ademas debemos tener en cuenta que debemos sumar los espacios en blanco

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
console.log("salio del bucle", arrayDeOraciones);

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
