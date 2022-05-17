const express = require('express');
const {
    getSong,
    getDetailPlaylist,
    getHome,
    getTop100,
    getChartHome,
    getNewReleaseChart,
    getInfoSong,
    getArtist,
    getLyric,
    search,
    getListMV,
    getCategoryMV,
    getVideo
  } = require("zingmp3-api-full");

const app = express();

app.get('/get-song/:songId', async (req, res, next) => {
    const songId = req.params.songId;
    const song = await getSong(songId);
    return res.json(song);
});

app.get('/search/:key', async (req, res, next) => {
    const key = req.params.key;
    const result = await search(key);
    return res.json(result);
});

app.get('/get-info-song/:songId', async (req, res, next) => {
    const songId = req.params.songId;
    const infoSong = await getInfoSong(songId);
    return res.json(infoSong);
});

app.get('/get-lyric-song/:songId', async (req, res, next) => {
    const songId = req.params.songId;
    const lyricSong = await getLyric  (songId);
    return res.json(lyricSong);
});

app.get('/get-chart', async (req, res, next) => {
    const chart = await getChartHome();
    return res.json(chart);
});

app.get('/get-top-100', async (req, res, next) => {
    const top100 = await getTop100();
    return res.json(top100);
});

app.get('/get-detail-playlist/:playlistId', async (req,res,next) =>{
    const id = req.params.playlistId;
    const playList = await getDetailPlaylist(id);
    return res.json(playList);
})

app.get('/', (req, res, next) => {
    return res.json({
        name: "app"
    });
});



app.listen(3001);