window.RedeGastroFilters = (function () {
  function getInitials(name) {
    return name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map(function (part) {
        return part.charAt(0).toUpperCase();
      })
      .join("");
  }

  function renderTags(tags) {
    return tags
      .map(function (tag) {
        return '<li class="tag">' + tag + "</li>";
      })
      .join("");
  }

  function professionalWhatsappMessage(professional) {
    return "Olá, " + professional.name + "! Encontrei seu perfil na RedeGastro e gostaria de conversar sobre uma oportunidade freelancer. Você tem disponibilidade?";
  }

  function jobInterestMessage(job) {
    return "Olá, vi sua vaga de " + job.role + " publicada na RedeGastro e tenho interesse. Podemos conversar?";
  }

  function createProfessionalCard(professional) {
    return [
      '<article class="info-card professional-card">',
      '  <div class="professional-card__head">',
      '    <div class="avatar" aria-hidden="true">' + getInitials(professional.name) + "</div>",
      "    <div>",
      "      <h3>" + professional.name + "</h3>",
      '      <p>' + professional.role + "</p>",
      "    </div>",
      "  </div>",
      '  <div class="info-card__meta">',
      "    <span>" + professional.neighborhood + " · " + professional.city + "</span>",
      '    <span class="rating">★ ' + professional.rating.toFixed(1) + " · " + professional.reviews + " avaliações</span>",
      "    <span>" + professional.experience + " de experiência</span>",
      '    <span class="badge badge--status">' + professional.availability + "</span>",
      "  </div>",
      '  <ul class="tag-list" aria-label="Habilidades">' + renderTags(professional.tags) + "</ul>",
      '  <div class="info-card__footer">',
      '    <a class="btn btn--secondary" href="pages/perfil-profissional.html">Ver perfil</a>',
      '    <button class="btn btn--primary" type="button" data-whatsapp-message="' + professionalWhatsappMessage(professional) + '">Chamar no WhatsApp</button>',
      '    <button class="btn btn--ghost" type="button" data-favorite-id="' + professional.id + '" aria-pressed="false">Salvar</button>',
      "  </div>",
      "</article>"
    ].join("");
  }

  function createJobCard(job) {
    return [
      '<article class="info-card job-card">',
      '  <div class="info-card__top">',
      "    <div>",
      job.urgent ? '      <span class="badge badge--urgent">Urgente</span>' : "",
      "      <h3>" + job.title + "</h3>",
      "    </div>",
      '    <span class="rating">' + job.value + "</span>",
      "  </div>",
      '  <div class="info-card__meta">',
      "    <span>" + job.restaurant + "</span>",
      "    <span>" + job.neighborhood + " · " + job.date + "</span>",
      "    <span>" + job.time + " · " + job.type + "</span>",
      "  </div>",
      "  <p>" + job.description + "</p>",
      '  <div class="info-card__footer">',
      '    <button class="btn btn--primary" type="button" data-interest-message="' + jobInterestMessage(job) + '">Tenho interesse</button>',
      '    <a class="btn btn--secondary" href="pages/vagas.html">Ver detalhes</a>',
      "  </div>",
      "</article>"
    ].join("");
  }

  function renderHomeHighlights() {
    var data = window.RedeGastroData || {};
    var jobsContainer = document.getElementById("urgent-jobs");
    var professionalsContainer = document.getElementById("featured-professionals");

    if (jobsContainer && data.jobs) {
      jobsContainer.innerHTML = data.jobs
        .filter(function (job) {
          return job.urgent;
        })
        .slice(0, 3)
        .map(createJobCard)
        .join("");
    }

    if (professionalsContainer && data.professionals) {
      professionalsContainer.innerHTML = data.professionals
        .filter(function (professional) {
          return professional.featured;
        })
        .slice(0, 4)
        .map(createProfessionalCard)
        .join("");
    }

    if (window.RedeGastroUI) {
      window.RedeGastroUI.updateFavoriteButtons();
    }
  }

  return {
    createJobCard: createJobCard,
    createProfessionalCard: createProfessionalCard,
    renderHomeHighlights: renderHomeHighlights
  };
})();
