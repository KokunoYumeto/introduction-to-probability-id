import * as pdfjsLib from "./vendor/pdfjs/pdf.min.mjs";

globalThis.pdfjsLib = pdfjsLib;
pdfjsLib.GlobalWorkerOptions.workerSrc = "./assets/vendor/pdfjs/pdf.worker.min.mjs";

const {
  EventBus,
  FindState,
  PDFLinkService,
  PDFFindController,
  PDFViewer,
} = await import("./vendor/pdfjs/pdf_viewer.mjs");

const PDF_URL = "./release/PENGANTAR_PELUANG_GRINSTEAD_SNELL_ID.pdf";
const PAGE_COUNT = 554;
const MOBILE_BREAKPOINT = 900;

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const elements = {
  viewerContainer: $("#viewerContainer"),
  viewer: $("#viewer"),
  loading: $("#loadingState"),
  loadingDetail: $("#loadingDetail"),
  error: $("#errorState"),
  pageNumber: $("#pageNumber"),
  pageCount: $("#pageCount"),
  previousPage: $("#previousPage"),
  nextPage: $("#nextPage"),
  zoomOut: $("#zoomOut"),
  zoomIn: $("#zoomIn"),
  zoomSelect: $("#zoomSelect"),
  rotatePage: $("#rotatePage"),
  fullscreen: $("#fullscreen"),
  sidebar: $("#sidebar"),
  sidebarToggle: $("#sidebarToggle"),
  sidebarClose: $("#sidebarClose"),
  scrim: $("#scrim"),
  searchToggle: $("#searchToggle"),
  searchPanel: $("#searchPanel"),
  searchForm: $("#searchForm"),
  searchInput: $("#searchInput"),
  searchStatus: $("#searchStatus"),
  previousMatch: $("#previousMatch"),
  nextMatch: $("#nextMatch"),
  searchClose: $("#searchClose"),
  pageAnnouncement: $("#pageAnnouncement"),
};

const eventBus = new EventBus();
const linkService = new PDFLinkService({ eventBus });
const findController = new PDFFindController({
  linkService,
  eventBus,
  updateMatchesCountOnProgress: true,
});
const pdfViewer = new PDFViewer({
  container: elements.viewerContainer,
  viewer: elements.viewer,
  eventBus,
  linkService,
  findController,
  imageResourcesPath: "./assets/vendor/pdfjs/images/",
  enableHWA: true,
});

linkService.setViewer(pdfViewer);

let pdfDocument = null;
let activeQuery = "";
let lastAnnouncedPage = 0;
let resizeTimer = null;

function requestedPage() {
  const params = new URLSearchParams(window.location.search);
  const value = Number.parseInt(params.get("page") || "1", 10);
  return Number.isFinite(value) ? Math.min(PAGE_COUNT, Math.max(1, value)) : 1;
}

function setControlsEnabled(enabled) {
  for (const element of [
    elements.pageNumber,
    elements.zoomOut,
    elements.zoomIn,
    elements.zoomSelect,
    elements.rotatePage,
    elements.searchToggle,
  ]) {
    element.disabled = !enabled;
  }
  updatePageButtons();
}

function updatePageButtons() {
  const ready = Boolean(pdfDocument);
  const page = ready ? pdfViewer.currentPageNumber : 1;
  elements.previousPage.disabled = !ready || page <= 1;
  elements.nextPage.disabled = !ready || page >= PAGE_COUNT;
}

function updateLocation(page) {
  const url = new URL(window.location.href);
  if (page === 1) {
    url.searchParams.delete("page");
  } else {
    url.searchParams.set("page", String(page));
  }
  window.history.replaceState({ page }, "", `${url.pathname}${url.search}${url.hash}`);
}

function updateContents(page) {
  const entries = $$("[data-page]");
  let active = null;
  for (const entry of entries) {
    const start = Number(entry.dataset.page);
    if (start <= page && (!active || start > Number(active.dataset.page))) {
      active = entry;
    }
    entry.removeAttribute("aria-current");
  }
  active?.setAttribute("aria-current", "page");
}

function setPage(page, { focusViewer = false } = {}) {
  if (!pdfDocument) return;
  const bounded = Math.min(pdfDocument.numPages, Math.max(1, Number(page) || 1));
  pdfViewer.currentPageNumber = bounded;
  if (focusViewer) elements.viewerContainer.focus({ preventScroll: true });
}

function isMobile() {
  return window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`).matches;
}

function setSidebar(open) {
  if (isMobile()) {
    document.body.classList.toggle("mobile-sidebar-open", open);
    document.body.classList.remove("sidebar-hidden");
    elements.scrim.hidden = !open;
  } else {
    document.body.classList.toggle("sidebar-hidden", !open);
    document.body.classList.remove("mobile-sidebar-open");
    elements.scrim.hidden = true;
    if (pdfDocument && pdfViewer.currentScaleValue === "page-width") {
      window.setTimeout(() => {
        pdfViewer.currentScaleValue = "page-width";
      }, 190);
    }
  }
  elements.sidebarToggle.setAttribute("aria-expanded", String(open));
}

function toggleSearch(force) {
  const shouldOpen = force ?? elements.searchPanel.hidden;
  elements.searchPanel.hidden = !shouldOpen;
  elements.searchToggle.setAttribute("aria-expanded", String(shouldOpen));
  if (shouldOpen) {
    window.setTimeout(() => elements.searchInput.focus(), 0);
  } else {
    elements.searchToggle.focus();
  }
}

function dispatchFind({ previous = false, again = false } = {}) {
  const query = elements.searchInput.value.trim();
  if (!query) {
    elements.searchStatus.textContent = "Masukkan kata pencarian";
    return;
  }
  activeQuery = query;
  elements.searchStatus.textContent = "Mencari…";
  eventBus.dispatch("find", {
    source: window,
    type: again ? "again" : "",
    query,
    phraseSearch: true,
    caseSensitive: false,
    entireWord: false,
    highlightAll: true,
    findPrevious: previous,
    matchDiacritics: false,
  });
}

function syncZoomSelect(scaleValue) {
  const options = [...elements.zoomSelect.options].map((option) => option.value);
  if (options.includes(scaleValue)) {
    elements.zoomSelect.value = scaleValue;
    return;
  }
  const numericScale = Number.parseFloat(scaleValue);
  if (!Number.isFinite(numericScale)) return;
  const numericOptions = options.filter((value) => Number.isFinite(Number(value)));
  const nearest = numericOptions.reduce((best, value) => (
    Math.abs(Number(value) - numericScale) < Math.abs(Number(best) - numericScale) ? value : best
  ), numericOptions[0] || "1");
  elements.zoomSelect.value = nearest;
}

eventBus.on("pagesinit", () => {
  pdfViewer.currentScaleValue = "page-width";
  setPage(requestedPage());
  elements.loading.hidden = true;
  setControlsEnabled(true);
});

eventBus.on("pagechanging", ({ pageNumber }) => {
  elements.pageNumber.value = String(pageNumber);
  updatePageButtons();
  updateLocation(pageNumber);
  updateContents(pageNumber);
  if (pageNumber !== lastAnnouncedPage) {
    elements.pageAnnouncement.textContent = `Halaman ${pageNumber} dari ${PAGE_COUNT}`;
    lastAnnouncedPage = pageNumber;
  }
});

eventBus.on("scalechanging", ({ presetValue, scale }) => {
  syncZoomSelect(presetValue || String(scale));
});

eventBus.on("updatefindmatchescount", ({ matchesCount }) => {
  const current = matchesCount?.current || 0;
  const total = matchesCount?.total || 0;
  elements.searchStatus.textContent = total ? `${current || "–"} dari ${total}` : "Mencari…";
});

eventBus.on("updatefindcontrolstate", ({ state, matchesCount }) => {
  const current = matchesCount?.current || 0;
  const total = matchesCount?.total || 0;
  if (state === FindState.NOT_FOUND) {
    elements.searchStatus.textContent = "Tidak ditemukan";
  } else if (state === FindState.PENDING) {
    elements.searchStatus.textContent = "Mencari…";
  } else if (total) {
    elements.searchStatus.textContent = `${current || "–"} dari ${total}${state === FindState.WRAPPED ? " · kembali ke awal" : ""}`;
  }
});

elements.previousPage.addEventListener("click", () => setPage(pdfViewer.currentPageNumber - 1));
elements.nextPage.addEventListener("click", () => setPage(pdfViewer.currentPageNumber + 1));
elements.pageNumber.addEventListener("change", () => setPage(elements.pageNumber.value, { focusViewer: true }));
elements.pageNumber.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    setPage(elements.pageNumber.value, { focusViewer: true });
  }
});

elements.zoomOut.addEventListener("click", () => pdfViewer.decreaseScale());
elements.zoomIn.addEventListener("click", () => pdfViewer.increaseScale());
elements.zoomSelect.addEventListener("change", () => {
  pdfViewer.currentScaleValue = elements.zoomSelect.value;
  elements.viewerContainer.focus({ preventScroll: true });
});
elements.rotatePage.addEventListener("click", () => {
  pdfViewer.pagesRotation = (pdfViewer.pagesRotation + 90) % 360;
});

elements.sidebarToggle.addEventListener("click", () => {
  const open = isMobile()
    ? !document.body.classList.contains("mobile-sidebar-open")
    : document.body.classList.contains("sidebar-hidden");
  setSidebar(open);
});
elements.sidebarClose.addEventListener("click", () => setSidebar(false));
elements.scrim.addEventListener("click", () => setSidebar(false));

for (const button of $$("[data-page]")) {
  button.addEventListener("click", () => {
    setPage(button.dataset.page, { focusViewer: true });
    if (isMobile()) setSidebar(false);
  });
}

elements.searchToggle.addEventListener("click", () => toggleSearch());
elements.searchClose.addEventListener("click", () => toggleSearch(false));
elements.searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  dispatchFind({ again: activeQuery === elements.searchInput.value.trim() });
});
elements.searchInput.addEventListener("input", () => {
  if (elements.searchInput.value.trim() !== activeQuery) {
    elements.searchStatus.textContent = "Tekan Enter untuk mencari";
  }
});
elements.searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    dispatchFind({ again: activeQuery === elements.searchInput.value.trim() });
  }
});
elements.previousMatch.addEventListener("click", () => dispatchFind({ previous: true, again: true }));
elements.nextMatch.addEventListener("click", () => dispatchFind({ again: true }));

elements.fullscreen.addEventListener("click", async () => {
  try {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    } else {
      await document.documentElement.requestFullscreen();
    }
  } catch {
    // Fullscreen is optional; the reader remains fully usable without it.
  }
});

window.addEventListener("keydown", (event) => {
  const target = event.target;
  const editing = target instanceof HTMLInputElement || target instanceof HTMLSelectElement || target instanceof HTMLTextAreaElement;

  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "f") {
    event.preventDefault();
    toggleSearch(true);
    return;
  }
  if (event.key === "Escape") {
    if (!elements.searchPanel.hidden) {
      toggleSearch(false);
    } else if (document.body.classList.contains("mobile-sidebar-open")) {
      setSidebar(false);
    }
    return;
  }
  if (editing || !pdfDocument) return;

  if (event.key === "ArrowLeft" || event.key === "PageUp") {
    event.preventDefault();
    setPage(pdfViewer.currentPageNumber - 1);
  } else if (event.key === "ArrowRight" || event.key === "PageDown") {
    event.preventDefault();
    setPage(pdfViewer.currentPageNumber + 1);
  } else if (event.key === "Home") {
    event.preventDefault();
    setPage(1);
  } else if (event.key === "End") {
    event.preventDefault();
    setPage(PAGE_COUNT);
  } else if (event.key === "+" || event.key === "=") {
    event.preventDefault();
    pdfViewer.increaseScale();
  } else if (event.key === "-") {
    event.preventDefault();
    pdfViewer.decreaseScale();
  }
});

window.addEventListener("resize", () => {
  if (!isMobile()) {
    document.body.classList.remove("mobile-sidebar-open");
    elements.scrim.hidden = true;
  }
  window.clearTimeout(resizeTimer);
  resizeTimer = window.setTimeout(() => {
    if (!pdfDocument) return;
    const preset = elements.zoomSelect.value;
    if (["page-width", "page-fit", "auto"].includes(preset)) {
      const page = pdfViewer.currentPageNumber;
      pdfViewer.currentScaleValue = preset;
      pdfViewer.currentPageNumber = page;
    }
  }, 180);
});

setControlsEnabled(false);
elements.pageCount.textContent = String(PAGE_COUNT);
elements.pageNumber.max = String(PAGE_COUNT);
setSidebar(!isMobile());

try {
  const loadingTask = pdfjsLib.getDocument({
    url: PDF_URL,
    isEvalSupported: true,
  });
  loadingTask.onProgress = ({ loaded, total }) => {
    if (!total) return;
    const percent = Math.min(100, Math.round((loaded / total) * 100));
    elements.loadingDetail.textContent = `Mengunduh buku · ${percent}%`;
  };
  pdfDocument = await loadingTask.promise;
  if (pdfDocument.numPages !== PAGE_COUNT) {
    throw new Error(`Jumlah halaman tidak sesuai: ${pdfDocument.numPages}`);
  }
  pdfViewer.setDocument(pdfDocument);
  linkService.setDocument(pdfDocument, null);
  findController.setDocument(pdfDocument);
} catch (error) {
  console.error("Gagal memuat pembaca PDF", error);
  elements.loading.hidden = true;
  elements.error.hidden = false;
}
