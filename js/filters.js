window.RedeGastroFilters = (function () {
  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function normalize(value) {
    return String(value || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }

  function getPagePrefix() {
    return document.body.dataset.page === "home" ? "pages/" : "";
  }

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
        return '<li class="tag">' + escapeHtml(tag) + "</li>";
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
    var prefix = getPagePrefix();

    return [
      '<article class="info-card professional-card">',
      '  <div class="professional-card__head">',
      '    <div class="avatar" aria-hidden="true">' + escapeHtml(getInitials(professional.name)) + "</div>",
      "    <div>",
      "      <h3>" + escapeHtml(professional.name) + "</h3>",
      '      <p>' + escapeHtml(professional.role) + "</p>",
      "    </div>",
      "  </div>",
      '  <div class="info-card__meta">',
      "    <span>" + escapeHtml(professional.neighborhood) + " · " + escapeHtml(professional.city) + "</span>",
      '    <span class="rating">★ ' + professional.rating.toFixed(1) + " · " + professional.reviews + " avaliações</span>",
      "    <span>" + escapeHtml(professional.experience) + " de experiência</span>",
      '    <span class="badge badge--status">' + escapeHtml(professional.availability) + "</span>",
      "  </div>",
      '  <ul class="tag-list" aria-label="Habilidades">' + renderTags(professional.tags) + "</ul>",
      '  <div class="info-card__footer">',
      '    <a class="btn btn--secondary" href="' + prefix + 'perfil-profissional.html">Ver perfil</a>',
      '    <button class="btn btn--whatsapp" type="button" data-whatsapp-message="' + escapeHtml(professionalWhatsappMessage(professional)) + '">Chamar no WhatsApp</button>',
      '    <button class="btn btn--ghost" type="button" data-favorite-id="' + escapeHtml(professional.id) + '" aria-pressed="false">Salvar</button>',
      "  </div>",
      "</article>"
    ].join("");
  }

  function createJobCard(job) {
    var prefix = getPagePrefix();

    return [
      '<article class="info-card job-card" id="vaga-' + escapeHtml(job.id) + '">',
      '  <div class="info-card__top">',
      "    <div>",
      job.urgent ? '      <span class="badge badge--urgent">Urgente</span>' : "",
      "      <h3>" + escapeHtml(job.title) + "</h3>",
      '      <p class="text-beige">' + escapeHtml(job.restaurant) + "</p>",
      "    </div>",
      '    <span class="rating">' + escapeHtml(job.value) + "</span>",
      "  </div>",
      '  <div class="info-card__meta">',
      "    <span>" + escapeHtml(job.role) + " · " + escapeHtml(job.type) + "</span>",
      "    <span>" + escapeHtml(job.neighborhood) + " · " + escapeHtml(job.date) + "</span>",
      "    <span>" + escapeHtml(job.time) + "</span>",
      "  </div>",
      "  <p>" + escapeHtml(job.description) + "</p>",
      '  <div class="info-card__footer">',
      '    <button class="btn btn--primary" type="button" data-interest-message="' + escapeHtml(jobInterestMessage(job)) + '">Tenho interesse</button>',
      '    <a class="btn btn--secondary" href="' + prefix + 'vagas.html#vaga-' + escapeHtml(job.id) + '">Ver detalhes</a>',
      "  </div>",
      "</article>"
    ].join("");
  }

  function sortJobs(jobs, sortBy) {
    var list = jobs.slice();

    if (sortBy === "value") {
      return list.sort(function (a, b) {
        return b.valueAmount - a.valueAmount;
      });
    }

    if (sortBy === "recent") {
      return list.sort(function (a, b) {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
    }

    return list.sort(function (a, b) {
      if (a.urgent && !b.urgent) {
        return -1;
      }

      if (!a.urgent && b.urgent) {
        return 1;
      }

      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  }

  function sortProfessionals(professionals, sortBy) {
    var list = professionals.slice();

    if (sortBy === "reviews") {
      return list.sort(function (a, b) {
        return b.reviews - a.reviews;
      });
    }

    if (sortBy === "recent") {
      return list.sort(function (a, b) {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
    }

    if (sortBy === "today") {
      return list.sort(function (a, b) {
        if (a.availabilityKey === "today" && b.availabilityKey !== "today") {
          return -1;
        }

        if (a.availabilityKey !== "today" && b.availabilityKey === "today") {
          return 1;
        }

        return b.rating - a.rating;
      });
    }

    return list.sort(function (a, b) {
      return b.rating - a.rating || b.reviews - a.reviews;
    });
  }

  function getProfessionalFilterState(form) {
    return {
      search: normalize(form.querySelector("[data-filter-search]").value),
      role: form.querySelector("[data-filter-role]").value,
      neighborhood: form.querySelector("[data-filter-neighborhood]").value,
      availability: form.querySelector("[data-filter-availability]").value,
      sort: form.querySelector("[data-filter-sort]").value || "rating"
    };
  }

  function filterProfessionals(professionals, state) {
    return professionals.filter(function (professional) {
      var searchable = normalize([
        professional.name,
        professional.role,
        professional.roleCategory,
        professional.neighborhood,
        professional.city,
        professional.tags.join(" ")
      ].join(" "));

      if (state.search && searchable.indexOf(state.search) === -1) {
        return false;
      }

      if (state.role && professional.roleCategory !== state.role) {
        return false;
      }

      if (state.neighborhood && professional.neighborhood !== state.neighborhood) {
        return false;
      }

      if (state.availability && professional.availabilityKey !== state.availability) {
        return false;
      }

      return true;
    });
  }

  function updateProfessionalsResults(form, grid, count, empty) {
    var data = window.RedeGastroData || {};
    var state = getProfessionalFilterState(form);
    var filtered = sortProfessionals(filterProfessionals(data.professionals || [], state), state.sort);
    var label = filtered.length === 1 ? "1 profissional encontrado" : filtered.length + " profissionais encontrados";

    grid.innerHTML = filtered.map(createProfessionalCard).join("");
    count.textContent = label;
    empty.hidden = filtered.length > 0;

    if (window.RedeGastroUI) {
      window.RedeGastroUI.updateFavoriteButtons();
    }
  }

  function applySearchParams(form) {
    var params = new URLSearchParams(window.location.search);
    var role = params.get("funcao");
    var neighborhood = params.get("bairro");

    if (role) {
      form.querySelector("[data-filter-search]").value = role;
    }

    if (neighborhood) {
      form.querySelector("[data-filter-neighborhood]").value = neighborhood;
    }
  }

  function initProfessionalsPage() {
    var form = document.querySelector("[data-professionals-filters]");
    var grid = document.getElementById("professionals-grid");
    var count = document.querySelector("[data-professionals-count]");
    var empty = document.querySelector("[data-professionals-empty]");

    if (!form || !grid || !count || !empty) {
      return;
    }

    applySearchParams(form);
    updateProfessionalsResults(form, grid, count, empty);

    form.addEventListener("input", function () {
      updateProfessionalsResults(form, grid, count, empty);
    });

    form.addEventListener("change", function () {
      updateProfessionalsResults(form, grid, count, empty);
    });

    form.addEventListener("reset", function () {
      window.setTimeout(function () {
        updateProfessionalsResults(form, grid, count, empty);
      }, 0);
    });
  }

  function getJobFilterState(form) {
    return {
      search: normalize(form.querySelector("[data-job-search]").value),
      role: form.querySelector("[data-job-role]").value,
      type: form.querySelector("[data-job-type]").value,
      neighborhood: form.querySelector("[data-job-neighborhood]").value,
      urgency: form.querySelector("[data-job-urgency]").value,
      sort: form.querySelector("[data-job-sort]").value || "urgent"
    };
  }

  function filterJobs(jobs, state) {
    return jobs.filter(function (job) {
      var searchable = normalize([
        job.title,
        job.role,
        job.restaurant,
        job.neighborhood,
        job.type,
        job.description
      ].join(" "));

      if (state.search && searchable.indexOf(state.search) === -1) {
        return false;
      }

      if (state.role && job.role !== state.role) {
        return false;
      }

      if (state.type && job.type !== state.type) {
        return false;
      }

      if (state.neighborhood && job.neighborhood !== state.neighborhood) {
        return false;
      }

      if (state.urgency === "urgent" && !job.urgent) {
        return false;
      }

      if (state.urgency === "regular" && job.urgent) {
        return false;
      }

      return true;
    });
  }

  function updateJobsResults(form, grid, count, empty) {
    var data = window.RedeGastroData || {};
    var state = getJobFilterState(form);
    var filtered = sortJobs(filterJobs(data.jobs || [], state), state.sort);
    var label = filtered.length === 1 ? "1 vaga encontrada" : filtered.length + " vagas encontradas";

    grid.innerHTML = filtered.map(createJobCard).join("");
    count.textContent = label;
    empty.hidden = filtered.length > 0;
  }

  function initJobsPage() {
    var form = document.querySelector("[data-jobs-filters]");
    var grid = document.getElementById("jobs-grid");
    var count = document.querySelector("[data-jobs-count]");
    var empty = document.querySelector("[data-jobs-empty]");

    if (!form || !grid || !count || !empty) {
      return;
    }

    updateJobsResults(form, grid, count, empty);

    form.addEventListener("input", function () {
      updateJobsResults(form, grid, count, empty);
    });

    form.addEventListener("change", function () {
      updateJobsResults(form, grid, count, empty);
    });

    form.addEventListener("reset", function () {
      window.setTimeout(function () {
        updateJobsResults(form, grid, count, empty);
      }, 0);
    });
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
    initJobsPage: initJobsPage,
    initProfessionalsPage: initProfessionalsPage,
    renderHomeHighlights: renderHomeHighlights
  };
})();
