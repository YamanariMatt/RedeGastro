window.RedeGastroUI = (function () {
  var favoriteKey = "redegastro:favorites";
  var whatsappNumber = "5567999999999";

  function initMobileMenu() {
    var toggle = document.querySelector("[data-menu-toggle]");
    var nav = document.querySelector("[data-main-nav]");

    if (!toggle || !nav) {
      return;
    }

    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      document.body.classList.toggle("is-menu-open", isOpen);
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
    });

    nav.addEventListener("click", function (event) {
      if (event.target.matches("a")) {
        nav.classList.remove("is-open");
        document.body.classList.remove("is-menu-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Abrir menu");
      }
    });
  }

  function getFavorites() {
    try {
      return JSON.parse(localStorage.getItem(favoriteKey)) || [];
    } catch (error) {
      return [];
    }
  }

  function setFavorites(favorites) {
    localStorage.setItem(favoriteKey, JSON.stringify(favorites));
  }

  function isFavorite(id) {
    return getFavorites().indexOf(id) >= 0;
  }

  function toggleFavorite(id) {
    var favorites = getFavorites();
    var index = favorites.indexOf(id);

    if (index >= 0) {
      favorites.splice(index, 1);
      setFavorites(favorites);
      return false;
    }

    favorites.push(id);
    setFavorites(favorites);
    return true;
  }

  function updateFavoriteButtons() {
    document.querySelectorAll("[data-favorite-id]").forEach(function (button) {
      var active = isFavorite(button.dataset.favoriteId);
      button.classList.toggle("is-saved", active);
      button.textContent = active ? "Salvo" : "Salvar";
      button.setAttribute("aria-pressed", String(active));
    });
  }

  function showToast(message) {
    var region = document.querySelector("[data-toast-region]");

    if (!region) {
      return;
    }

    var toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    region.appendChild(toast);

    window.setTimeout(function () {
      toast.remove();
    }, 4200);
  }

  function buildWhatsappUrl(message) {
    return "https://wa.me/" + whatsappNumber + "?text=" + encodeURIComponent(message);
  }

  function openWhatsapp(message) {
    window.open(buildWhatsappUrl(message), "_blank", "noopener");
  }

  function initActionButtons() {
    document.addEventListener("click", function (event) {
      var favoriteButton = event.target.closest("[data-favorite-id]");
      var whatsappButton = event.target.closest("[data-whatsapp-message]");
      var interestButton = event.target.closest("[data-interest-message]");

      if (favoriteButton) {
        var active = toggleFavorite(favoriteButton.dataset.favoriteId);
        updateFavoriteButtons();
        showToast(active ? "Profissional salvo neste navegador." : "Profissional removido dos salvos.");
      }

      if (whatsappButton) {
        openWhatsapp(whatsappButton.dataset.whatsappMessage);
      }

      if (interestButton) {
        openWhatsapp(interestButton.dataset.interestMessage);
      }
    });
  }

  function initQuickSearch() {
    var form = document.querySelector("[data-quick-search]");

    if (!form) {
      return;
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var formData = new FormData(form);
      var params = new URLSearchParams();
      var role = String(formData.get("funcao") || "").trim();
      var neighborhood = String(formData.get("bairro") || "").trim();

      if (role) {
        params.set("funcao", role);
      }

      if (neighborhood) {
        params.set("bairro", neighborhood);
      }

      window.location.href = "pages/profissionais.html" + (params.toString() ? "?" + params.toString() : "");
    });
  }

  return {
    buildWhatsappUrl: buildWhatsappUrl,
    initActionButtons: initActionButtons,
    initMobileMenu: initMobileMenu,
    initQuickSearch: initQuickSearch,
    openWhatsapp: openWhatsapp,
    showToast: showToast,
    updateFavoriteButtons: updateFavoriteButtons
  };
})();
