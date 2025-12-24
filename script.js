let ms = 0, sec = 0, min = 0, hr = 0;
let timer = null;
let lapCount = 0;
let lapsData = [];
let session = 0;

const timeDisplay = document.getElementById("time");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const stopBtn = document.getElementById("stopBtn");
const lapBtn = document.getElementById("lapBtn");
const resetBtn = document.getElementById("resetBtn");
const lapsBox = document.getElementById("laps");
const historyBox = document.getElementById("history");
const stopwatchBox = document.getElementById("stopwatchBox");
const historyPanel = document.getElementById("historyBox");

function formatTime() {
    return (
        String(hr).padStart(2, '0') + ":" +
        String(min).padStart(2, '0') + ":" +
        String(sec).padStart(2, '0') + "." +
        String(ms).padStart(2, '0')
    );
}

function update() {
    ms++;
    if (ms === 100) { ms = 0; sec++; }
    if (sec === 60) { sec = 0; min++; }
    if (min === 60) { min = 0; hr++; }
    timeDisplay.innerText = formatTime();
}

startBtn.onclick = () => {
    if (timer) return;
    timer = setInterval(update, 10);
    startBtn.innerText = "Start";
    stopwatchBox.classList.add("running");
    historyPanel.classList.add("running");
};

pauseBtn.onclick = () => {
    if (!timer) return;
    clearInterval(timer);
    timer = null;
    startBtn.innerText = "Continue";
    stopwatchBox.classList.remove("running");
    historyPanel.classList.remove("running");
};

stopBtn.onclick = () => {
    if (timer) clearInterval(timer);
    timer = null;
    saveHistory();
    startBtn.innerText = "Start";
    stopwatchBox.classList.remove("running");
    historyPanel.classList.remove("running");
};

resetBtn.onclick = () => {
    stopBtn.onclick();
    ms = sec = min = hr = 0;
    lapCount = 0;
    lapsData = [];
    lapsBox.innerHTML = "";
    timeDisplay.innerText = "00:00:00.00";
};

lapBtn.onclick = () => {
    if (!timer) return;
    lapCount++;
    const t = formatTime();
    lapsData.push(`Lap ${lapCount} — ${t}`);
    const div = document.createElement("div");
    div.innerText = lapsData[lapsData.length - 1];
    lapsBox.prepend(div);
};

function saveHistory() {
    if (hr + min + sec + ms === 0) return;
    session++;
    const div = document.createElement("div");
    div.innerHTML = `
        <strong>Session ${session}</strong><br>
        Time: ${formatTime()}<br>
        ${lapsData.length ? lapsData.join("<br>") : "No laps"}
    `;
    historyBox.prepend(div);
    lapsData = [];
    lapCount = 0;
    lapsBox.innerHTML = "";
}
