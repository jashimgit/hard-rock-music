



const search = () => {
    // get search box input value 
    const searchInput = document.getElementById('search-box').value;
    const url = `https://api.lyrics.ovh/suggest/${searchInput}`
    fetch(url)
        .then(res => res.json())
        .then(data => getSongs(data.data))
}


// get songs

const getSongs = (songs) => {
    const songscontainer = document.getElementById('songs-container')
    songscontainer.innerHTML = '';
    songs.forEach(song => {
        
        const songItem = document.createElement('div');
        songItem.className = "single-result row align-items-center my-3 p-3";
        songItem.innerHTML =
            `<div class="col-md-9">
                <h3 class="lyrics-name">${song.title}</h3>
                <p class="author lead">Album by <span>${song.artist.name}</span></p>
            </div>
            <audio controls>
            <source src="${song.preview}" type="audio/mpeg">
            </audio>
            <div class="col-md-3 text-md-right text-center">
                <button onclick="getLyrics('${song.artist.name}', '${song.title}')" class="btn btn-success">Get Lyrics</button>
            </div>`;
        songscontainer.appendChild(songItem);
    });

    // songscontainer.innerHTML = songItem
}

const getLyrics = (artist, title) => {
    // lyric link: https://api.lyrics.ovh/v1/:artist/:title

    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayLyric(data.lyrics))


}
const displayLyric = lyrics => {
    const lyric = document.getElementById('song-lyric');
    lyric.innerText = lyrics;
}