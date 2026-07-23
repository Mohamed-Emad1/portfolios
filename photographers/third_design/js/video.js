(function () {
  const modal = document.getElementById("videoModal");
  const modalVideo = document.getElementById("modalVideo");
  const closeBtn = document.getElementById("videoModalClose");
  const playPauseBtn = document.getElementById("videoPlayPause");
  const muteBtn = document.getElementById("videoMute");
  const fullscreenBtn = document.getElementById("videoFullscreen");
  const progress = document.getElementById("videoProgress");
  const progressFill = document.getElementById("videoProgressFill");
  const videoCards = document.querySelectorAll(".video-card");
  if (!modal || !modalVideo) return;

  const iconPlay = '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="m8 5 12 7-12 7z"/></svg>';
  const iconPause = '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M7 5h4v14H7zM13 5h4v14h-4z"/></svg>';

  function openModal(src, poster) {
    modalVideo.src = src;
    modalVideo.poster = poster || "";
    modal.classList.add("open");
    document.body.classList.add("no-scroll");
    modalVideo.play().catch(() => {});
    playPauseBtn.innerHTML = iconPause;
  }

  function closeModal() {
    modal.classList.remove("open");
    document.body.classList.remove("no-scroll");
    modalVideo.pause();
    modalVideo.currentTime = 0;
  }

  videoCards.forEach((card) => {
    card.addEventListener("click", () => {
      const src = card.dataset.video;
      const poster = card.querySelector("img")?.src;
      openModal(src, poster);
    });
  });

  closeBtn?.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  playPauseBtn?.addEventListener("click", () => {
    if (modalVideo.paused) {
      modalVideo.play().catch(() => {});
      playPauseBtn.innerHTML = iconPause;
    } else {
      modalVideo.pause();
      playPauseBtn.innerHTML = iconPlay;
    }
  });

  muteBtn?.addEventListener("click", () => {
    modalVideo.muted = !modalVideo.muted;
  });

  fullscreenBtn?.addEventListener("click", () => {
    const container = modalVideo.parentElement;
    if (document.fullscreenElement) document.exitFullscreen();
    else container.requestFullscreen?.();
  });

  modalVideo.addEventListener("timeupdate", () => {
    if (!modalVideo.duration) return;
    progressFill.style.width = `${(modalVideo.currentTime / modalVideo.duration) * 100}%`;
  });

  progress?.addEventListener("click", (e) => {
    const rect = progress.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    if (modalVideo.duration) modalVideo.currentTime = ratio * modalVideo.duration;
  });

  modalVideo.addEventListener("ended", () => {
    playPauseBtn.innerHTML = iconPlay;
  });

  document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("open")) return;
    if (e.key === "Escape") closeModal();
    if (e.key === " ") {
      e.preventDefault();
      playPauseBtn?.click();
    }
  });
})();
