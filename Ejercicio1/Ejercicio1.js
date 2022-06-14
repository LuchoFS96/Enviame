function primeNumbers(event) {
  // Previene el cargado de la pagina.
  event.preventDefault();
  // Tomo los valores del form.
  let a = document.getElementById("a").value;
  let b = document.getElementById("b").value;
  let allPrimeNumbers = [];
  // Verifico casos especiales. Tengo dos ciclos por si A en negativo.
  if (b < a || b < 1) return allPrimeNumbers;
  if (a > 1) {
    for (let i = a; i <= b; i++) {
      // Si son primos los añado a mi array resultado y modifico el HTML al final para mostrarlos.
      if (isPrime(i)) allPrimeNumbers.push(i);
    }
    document.getElementById("result").innerHTML = allPrimeNumbers;
    return allPrimeNumbers;
  } else {
    for (let i = 2; i <= b; i++) {
      if (isPrime(i)) allPrimeNumbers.push(i);
    }
    document.getElementById("result").innerHTML = allPrimeNumbers;
    return allPrimeNumbers;
  }
}

function isPrime(num) {
  // Algoritmo que devuelve true o false dependiendo si es Primo o no.
  if (num == 2 || num == 3) return true;
  if (num <= 1 || num % 2 == 0 || num % 3 == 0) return false;
  for (let i = 5; i * i <= num; i += 6)
    if (num % i == 0 || num % (i + 2) == 0) return false;
  return true;
}
