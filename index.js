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
        name: "ehjasjdads"
    });
});



app.listen(3001);