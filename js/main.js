(function () {
  function updateFooterYear() {
    document.querySelectorAll("[data-current-year]").forEach(function (element) {
      element.textContent = new Date().getFullYear();
    });
  }

  function initPage() {
    var page = document.body.dataset.page;

    if (window.RedeGastroUI) {
      window.RedeGastroUI.initMobileMenu();
      window.RedeGastroUI.initActionButtons();
      window.RedeGastroUI.initQuickSearch();
    }

    if (window.RedeGastroForms) {
      window.RedeGastroForms.init();
    }

    if (page === "home" && window.RedeGastroFilters) {
      window.RedeGastroFilters.renderHomeHighlights();
    }

    updateFooterYear();
  }

  document.addEventListener("DOMContentLoaded", initPage);
})();
