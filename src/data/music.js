// Track list for /music/. Lived inside src/scripts/music.js, which is
// passthrough-copied rather than templated and so could never read build data.
//
// music.njk now serializes this onto the <ul> as a data-tracks attribute and
// the script parses it from there. `file` is resolved against /assets/music/
// by the player.
module.exports = [{ title: "In Neon", date: "2019-12-01", file: "in_neon.mp3" }];
