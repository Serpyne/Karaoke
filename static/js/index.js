
let lyrics;
let lyrics_frame;
let OPACITY_STRENGTH;


function setOpacity(index, offset=0) {
    let t = 1 - (offset - index) / OPACITY_STRENGTH;
    if (t <= 1)
        return Math.max(t, 0);
    else
        return Math.max(2 - t, 0);
}

function set_lyrics(data) {
    document.addEventListener("DOMContentLoaded", () => {
        lyrics_array = data.lyrics.lines;

        OPACITY_STRENGTH = lyrics_array.length / 9;
        lyrics_frame = document.getElementById("lyrics-frame");
        for (let i in lyrics_array) {
            line = lyrics_array[i];

            let element = document.createElement("p");
            element.innerHTML = line.words;
            element.style.opacity = setOpacity(i);
            lyrics_frame.appendChild(element);

        }
        lyrics = lyrics_array;
        main_loop();
    });
}


function format_ms(ms) {
    minutes = Math.floor(ms / 60000);
    ms %= 60000;
    seconds = ms / 1000;
    seconds = ("00" + Math.floor(seconds)).slice(-2);

    return `${minutes}:${seconds}`;
}


let current_index = 0
function update_lyrics(time) {
    let current_time = lyrics[current_index].startTimeMs;
    if (time >= current_time) {

        for (let i in lyrics) {
            lyrics_frame.children[i].style.opacity = setOpacity(i, offset=current_index);
        }
        lyrics_frame.style.top = `calc(50% - ${current_index} * (${lyrics_frame.children[current_index].clientHeight}px + 1em))`;
        console.log(lyrics_frame.style.top)

        current_index++;
    }
}


function main_loop() {
    let total = lyrics[lyrics.length - 1].startTimeMs - lyrics[0].startTimeMs;
    let totalDuration = total / lyrics.length * (lyrics.length + 1);

    let tick = 0.;
    let clock = document.getElementById("clock");
    setInterval(function() {
        if (tick <= totalDuration) {
            // Update clock
            let formatted = format_ms(tick);
            if (clock.innerHTML != formatted)
                clock.innerHTML = formatted;

            update_lyrics(tick);

            tick += 50;
        }
    }, 50);
}