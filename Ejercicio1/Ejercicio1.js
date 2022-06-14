function primeNumbers(event) {
  event.preventDefault();
  let a = document.getElementById("a").value;
  let b = document.getElementById("b").value;
  let allPrimeNumbers = [];
  if (b < a || b < 1) return allPrimeNumbers;
  if (a > 1) {
    for (let i = a; i <= b; i++) {
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
  if (num == 2 || num == 3) return true;
  if (num <= 1 || num % 2 == 0 || num % 3 == 0) return false;
  for (let i = 5; i * i <= num; i += 6)
    if (num % i == 0 || num % (i + 2) == 0) return false;
  return true;
}
