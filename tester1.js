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

let formato = formatParagraph(
  "Uno de mis lugares favoritos de mi hogar es mi habitación. Siempre que llego a casa voy directamente a mi habitación para descansar y divertirme. Allí paso la mayor parte de mi tiempo libre, escuchando música, leyendo libros interesantes o dibujando todo lo que puedo imaginar.",
  66
);
console.log(formato);
