document.addEventListener("DOMContentLoaded", function () {
  // Opening modals
  document.querySelectorAll(".js-modal-trigger").forEach((trigger) => {
    const modal = trigger.dataset.target;
    const modalTarget = document.getElementById(modal);

    trigger.addEventListener("click", (e) => {
      let imagePath = e.target.dataset.imageUrl;
      openModal(modalTarget, imagePath);
    });
  });

  // Closing modals
  document
    .querySelectorAll(
      ".modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button"
    )
    .forEach((elem) => {
      const relatedModal = elem.closest(".modal");

      elem.addEventListener("click", () => {
        closeModal(relatedModal);
      });
    });

  // Keyboard - close modals
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeAllModals();
    }
  });

  // Modal internals
  function openModal(elem, imagePath) {
    // may have already been opened
    // ---------------------------------
    if (!elem.querySelector(".image").hasChildNodes()) {
      let img = document.createElement("img");
      img.src = imagePath;
      elem.querySelector(".image").append(img);
    }

    elem.classList.add("is-active");
  }

  function closeModal(elem) {
    elem.classList.remove("is-active");
  }

  function closeAllModals() {
    document.querySelectorAll(".modal").forEach(($modal) => {
      closeModal($modal);
    });
  }

  const deposit = document.querySelector(".deposit-trigger");
  deposit.addEventListener("click", () => toggle());

  function toggle() {
    var cont = document.getElementById("deposit");
    cont.style.display = cont.style.display == "none" ? "block" : "none";
  }

  // Tabs
  let tabs = document.querySelectorAll(".tabs li");
  let relatedBoxes = document.querySelectorAll(".quickbox");
  let galleries = document.getElementById("galleries");

  // Assign click handlers on tabs
  for (const [index, element] of tabs.entries()) {
    element.addEventListener("click", (e) => {
      tabs.forEach((t) => t.classList.remove("is-active"));
      tabs[index].classList.add("is-active");
      relatedBoxes.forEach((t) => t.classList.add("is-hidden"));
      relatedBoxes[index].classList.remove("is-hidden");
    });
  }

  // Links to gallery
  document.querySelectorAll(".bolt-link").forEach((e) => {
    e.addEventListener("click", (e) => {
      console.log(" e.target.dataset.bolt :>> ", e.target.dataset.bolt);
      var name = e.target.dataset.bolt;
      tabs.forEach((t) => {
        if (!t.classList.contains("tab-" + name)) {
          t.classList.remove("is-active");
        } else {
          t.classList.add("is-active");
        }
      });
      relatedBoxes.forEach((r) => {
        if (!r.classList.contains("quickbox-" + name)) {
          r.classList.add("is-hidden");
        } else {
          r.classList.remove("is-hidden");
        }
      });

      galleries.scrollIntoView({
        behavior: "smooth",
      });
    });
  });
});
