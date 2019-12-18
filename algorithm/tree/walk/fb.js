function fb1(n) {
  if (n <= 2) {
    return 1;
  } else {
    return fb1(n - 1) + fb1(n - 2);
  }
}
console.log(fb1(40))
