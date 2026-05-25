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

  function formatCpf(value) {
    var numbers = onlyNumbers(value).slice(0, 11);

    return numbers
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  }

  function formatWhatsapp(value) {
    var numbers = onlyNumbers(value).slice(0, 11);

    if (numbers.length <= 2) {
      return numbers;
    }

    if (numbers.length <= 10) {
      return numbers.replace(/(\d{2})(\d{0,4})(\d{0,4})/, function (_, ddd, first, last) {
        return "(" + ddd + ") " + first + (last ? "-" + last : "");
      });
    }

    return numbers.replace(/(\d{2})(\d{0,5})(\d{0,4})/, function (_, ddd, first, last) {
      return "(" + ddd + ") " + first + (last ? "-" + last : "");
    });
  }

  function getErrorElement(form, input) {
    if (!input.id) {
      return null;
    }

    return form.querySelector('[data-error-for="' + input.id + '"]');
  }

  function setError(form, input, message) {
    var error = getErrorElement(form, input);

    input.classList.toggle("is-invalid", Boolean(message));
    input.setAttribute("aria-invalid", message ? "true" : "false");

    if (error) {
      error.textContent = message;
    }
  }

  function validateInput(form, input) {
    var value = String(input.value || "").trim();
    var validation = input.dataset.validation;
    var message = "";

    if (input.disabled) {
      return true;
    }

    if (input.required && input.type === "checkbox" && !input.checked) {
      message = "Você precisa aceitar os termos do protótipo.";
    } else if (input.required && !value) {
      message = "Preencha este campo.";
    } else if (validation === "email" && value && !isValidEmail(value)) {
      message = "Informe um e-mail válido.";
    } else if (validation === "whatsapp" && value && onlyNumbers(value).length < 10) {
      message = "Informe um WhatsApp com DDD.";
    } else if (validation === "cpf" && value && !isValidCpf(value)) {
      message = "Informe um CPF válido para a simulação.";
    }

    setError(form, input, message);
    return !message;
  }

  function clearFormErrors(form) {
    form.querySelectorAll("input, select").forEach(function (input) {
      setError(form, input, "");
    });
  }

  function setPanelEnabled(panel, enabled) {
    panel.hidden = !enabled;
    panel.querySelectorAll("input, select, button[type='submit']").forEach(function (field) {
      field.disabled = !enabled;
    });
  }

  function initAccountSwitch() {
    var options = document.querySelectorAll("[data-account-option]");
    var panels = document.querySelectorAll("[data-account-panel]");

    if (!options.length || !panels.length) {
      return;
    }

    function activate(account) {
      options.forEach(function (option) {
        var active = option.dataset.accountOption === account;
        option.classList.toggle("is-active", active);
        option.setAttribute("aria-pressed", String(active));
      });

      panels.forEach(function (panel) {
        var active = panel.dataset.accountPanel === account;
        setPanelEnabled(panel, active);
        clearFormErrors(panel);
      });
    }

    options.forEach(function (option) {
      option.addEventListener("click", function () {
        activate(option.dataset.accountOption);
      });
    });

    activate("professional");
  }

  function initMasks() {
    document.querySelectorAll("[data-mask]").forEach(function (input) {
      input.addEventListener("input", function () {
        if (input.dataset.mask === "cpf") {
          input.value = formatCpf(input.value);
        }

        if (input.dataset.mask === "whatsapp") {
          input.value = formatWhatsapp(input.value);
        }
      });
    });
  }

  function initPrototypeForms() {
    document.querySelectorAll("[data-prototype-form]").forEach(function (form) {
      form.addEventListener("input", function (event) {
        if (event.target.matches("input, select")) {
          validateInput(form, event.target);
        }
      });

      form.addEventListener("change", function (event) {
        if (event.target.matches("input, select")) {
          validateInput(form, event.target);
        }
      });

      form.addEventListener("submit", function (event) {
        var fields = Array.prototype.slice.call(form.querySelectorAll("input, select"));
        var results = fields.map(function (input) {
          return validateInput(form, input);
        });
        var isValid = results.every(Boolean);

        event.preventDefault();

        if (!isValid) {
          var firstInvalid = form.querySelector(".is-invalid");

          if (firstInvalid) {
            firstInvalid.focus();
          }

          return;
        }

        if (window.RedeGastroUI) {
          window.RedeGastroUI.showToast(form.dataset.successMessage || "Cadastro simulado com sucesso! Este protótipo não salva dados.");
        }

        form.reset();
        clearFormErrors(form);
      });
    });
  }

  function init() {
    initAccountSwitch();
    initMasks();
    initPrototypeForms();
  }

  return {
    init: init,
    isValidCpf: isValidCpf,
    isValidEmail: isValidEmail,
    onlyNumbers: onlyNumbers
  };
})();
