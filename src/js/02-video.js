
import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const play = function (data) {
    localStorage.setItem('videoplayer-current-time', data.seconds);
}

player.on('timeupdate', throttle(play, 1000));
    
player.getVideoTitle().then(function(title) {
    console.log('title:', title);
});

const currentTime = Number(localStorage.getItem('videoplayer-current-time'));

player.setCurrentTime(currentTime).then(function(seconds) {
    // seconds = the actual time that the player seeked to
}).catch(function(error) {
    switch (error.name) {
        case 'RangeError':
            // the time was less than 0 or greater than the video’s duration
            break;

        default:
            // some other error occurred
            break;
    }
});


