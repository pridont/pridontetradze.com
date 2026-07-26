/*
 * Music Player Functionality
 */

const PLAY_ICON = `<svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>`;
const PAUSE_ICON = `<svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M6 5h4v14H6zm8 0h4v14h-4z"/></svg>`;
const containerEl = document.getElementById("music-list");

class MusicTrack {
  constructor(title, date, file) {
    this.title = title;
    this.date = date;
    this.file = file;

    const track = this.#trackElement({ title, date, file });

    this.playBtn = track.playBtn;
    this.waveElement = track.waveElement;
    this.containerElement = track.containerElement;
    this.id = track.id;

    const loadingElement = document.createElement("p");
    loadingElement.textContent = "hold on...";
    this.loadingElement = loadingElement;
  }

  // The button's playing/paused state lives in a data attribute rather than
  // being sniffed out of the icon markup (the inline SVG has no "play"
  // substring to match on).
  #setPlaying(playing) {
    this.playBtn.innerHTML = playing ? PAUSE_ICON : PLAY_ICON;
    this.playBtn.dataset.state = playing ? "playing" : "paused";
    this.playBtn.setAttribute("aria-label", playing ? "Pause" : "Play");
  }

  playPause() {
    this.wavesurfer.playPause();
    this.#setPlaying(this.playBtn.dataset.state !== "playing");
  }

  pause() {
    this.wavesurfer.pause();
    this.#setPlaying(false);
  }

  play() {
    this.wavesurfer.play();
    this.#setPlaying(true);
  }

  initWavesurfer() {
    const styles = getComputedStyle(document.body);
    this.wavesurfer = WaveSurfer.create({
      container: this.waveElement,
      waveColor: styles.getPropertyValue("--faint").trim() || "#a196aa",
      progressColor: styles.getPropertyValue("--accent").trim() || "#e6a878",
      cursorColor: styles.getPropertyValue("--fg").trim() || "#ece6f1",
      url: "/assets/music/" + this.file,
      barWidth: 3,
      barGap: 2,
      barRadius: 2,
      cursorWidth: 1,
    });
  }

  showLoading() {
    this.waveElement.prepend(this.loadingElement);
  }

  hideLoading() {
    if (this.loadingElement) {
      this.loadingElement.remove();
    }
  }

  #trackElement({ title, date, file }) {
    const containerElement = document.createElement("li");
    containerElement.id = file;
    containerElement.classList.add("music-entry", "entry");

    const titleElement = document.createElement("div");
    titleElement.classList.add("music-title");
    titleElement.innerHTML = `
      <h3>${title}</h3>
      <p class="date">${new Date(date).toLocaleDateString()}</p>
    `;
    containerElement.appendChild(titleElement);

    const waveElement = document.createElement("div");
    waveElement.classList.add("wave");

    const playBtn = document.createElement("button");
    playBtn.classList.add("play");
    playBtn.type = "button";
    playBtn.dataset.state = "paused";
    playBtn.setAttribute("aria-label", "Play");
    playBtn.innerHTML = PLAY_ICON;

    const playerElement = document.createElement("div");
    playerElement.classList.add("player");
    playerElement.appendChild(playBtn);
    playerElement.appendChild(waveElement);
    containerElement.appendChild(playerElement);

    return { playBtn, waveElement, containerElement, id: file };
  }
}

// The track list is build data (src/data/music.js), serialized onto the <ul>
// by music.njk. This file is passthrough-copied rather than templated, so the
// DOM is the only way build data reaches it.
const musicList = JSON.parse(containerEl.dataset.tracks || "[]");

const tracks = [];

musicList.forEach((item) => {
  const track = new MusicTrack(item.title, item.date, item.file);
  containerEl.appendChild(track.containerElement);

  track.playBtn.addEventListener("click", () => {
    if (!track.wavesurfer) {
      track.initWavesurfer();
      track.wavesurfer.on("load", () => track.showLoading());
      track.wavesurfer.on("ready", () => {
        track.hideLoading();
        playPauseTrack(track);
      });
      track.wavesurfer.on("finish", () => track.pause());
    } else {
      playPauseTrack(track);
    }
  });

  tracks.push(track);
});

document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    tracks.forEach((t) => t.pause());
    e.preventDefault();
  }
});

function playPauseTrack(track) {
  track.playPause();
  tracks.filter((t) => t.id !== track.id).forEach((t) => t.pause());
}
