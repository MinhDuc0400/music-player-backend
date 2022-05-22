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
    const songInfo = await getInfoSong(songId);
    if (!song.err) {
        let data = {
            id: songInfo.data.encodeId,
            title: songInfo.data.title,
            thumbnail: songInfo.data.thumbnailM,
            url: song.data['128'],
            time: songInfo.data.duration,
            artists: songInfo.data.artistsNames 
        }
        return res.json(data);
    }
});

app.get('get-artist/:name', async(req, res, next) => {
    const name = req.params.name;
    const result = await getArtist(name);
    return res.json(result);
});

app.get('/search/:key', async (req, res, next) => {
    const key = req.params.key;
    const result = await search(key);
    const artistList = result.data.artists.map(el => ({
        id: el.id,
        name: el.name,
        thumbnail: el.thumbnailM,
        playlistId: el.playlistId,
        totalFollow: el.totalFollow
    }));
    const songList = result.data.songs.map(el => ({
        id: el.encodeId,
        title: el.title,
        artists: el.artistsNames,
        thumbnail: el.thumbnailM
    }));
    return res.json({artistList, songList});
});

app.get('/get-info-song/:songId', async (req, res, next) => {
    const songId = req.params.songId;
    const infoSong = await getInfoSong(songId);
    return res.json(infoSong);
});

app.get('/get-lyric-song/:songId', async (req, res, next) => {
    const songId = req.params.songId;
    const lyricSong = await getLyric(songId);
    return res.json(lyricSong);
});

app.get('/get-chart', async (req, res, next) => {
    const chart = await getChartHome();
    return res.json(chart);
});

app.get('/get-top-100', async (req, res, next) => {
    const top100 = await getTop100();
    let data = top100.data[0].items;
    data = data.map(el => ({
        title: el.title,
        encodeId: el.encodeId,
        thumbnail: el.thumbnail,
        description: el.sortDescription
    }));
    return res.json(data);
});

app.get('/get-detail-playlist/:playlistId', async (req,res,next) =>{
    const id = req.params.playlistId;
    const playList = await getDetailPlaylist(id);
    // let data = playList.data;
    let data = playList.data.song.items.map(el => ({
        id: el.encodeId,
        title: el.title,
        artists: el.artistsNames,
        thumbnail: el.thumbnailM
    }));
    return res.json(data);
})

app.get('/', (req, res, next) => {
    return res.json({
        name: "app"
    });
});



app.listen(3001);