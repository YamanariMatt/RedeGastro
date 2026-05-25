window.RedeGastroForms = (function () {
  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function onlyNumbers(value) {
    return String(value || "").replace(/\D/g, "");
  }

  function isValidCpf(value) {
    var cpf = onlyNumbers(value);
    var sum = 0;
    var rest;

    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
      return false;
    }

    for (var i = 1; i <= 9; i += 1) {
      sum += parseInt(cpf.substring(i - 1, i), 10) * (11 - i);
    }

    rest = (sum * 10) % 11;
    if (rest === 10 || rest === 11) {
      rest = 0;
    }

    if (rest !== parseInt(cpf.substring(9, 10), 10)) {
      return false;
    }

    sum = 0;
    for (var j = 1; j <= 10; j += 1) {
      sum += parseInt(cpf.substring(j - 1, j), 10) * (12 - j);
    }

    rest = (sum * 10) % 11;
    if (rest === 10 || rest === 11) {
      rest = 0;
    }

    return rest === parseInt(cpf.substring(10, 11), 10);
  }

  function init() {
    return true;
  }

  return {
    init: init,
    isValidCpf: isValidCpf,
    isValidEmail: isValidEmail,
    onlyNumbers: onlyNumbers
  };
})();
