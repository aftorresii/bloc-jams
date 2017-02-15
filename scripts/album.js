var createSongRow = function(songNumber, songName, songLength) {
  var template =
    '<tr class="album-view-song-item">' + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>' + ' <td class="song-item-title">' + songName + '</td>' + ' <td class="song-item-duration">' + songLength + '</td>' + '</tr>';
    

//play-pause icon functionality
  var $row = $(template);



  var clickHandler = function() {
      var songNumber = $(this).attr('data-song-number');

      if (currentlyPlayingSong !== null) {
        var currentlyPlayingCell = $('.song-item-number[data-song-number="' + currentlyPlayingSong + '"]');
        currentlyPlayingCell.html(currentlyPlayingSong);
      }

      if (currentlyPlayingSong !== songNumber) {
        $(this).html(pauseButtonTemplate);
        currentlyPlayingSong = songNumber;

      } else if (currentlyPlayingSong === songNumber) {
        $(this).html(playButtonTemplate);
        currentlyPlayingSong = null;
      }
    };
    
//Handler to add play button to songs when hovered over with a mouse as long as the song is not currently playing
  var onHover = function(event) {
    var songNumberCell = $(this).find('.song-item-number');
    var songNumber = songNumberCell.attr('data-song-number');

    if (songNumber !== currentlyPlayingSong) {
      songNumberCell.html(playButtonTemplate);
    }
  };
//handler to return icon to song number when the mouse leaves if it is not currently playing
  var offHover = function(event) {
    var songNumberCell = $(this).find('.song-item-number');
    var songNumber = songNumberCell.attr('data-song-number');

    if (songNumber !== currentlyPlayingSong) {
      songNumberCell.html(songNumber);
    }

  };

  $row.find('.song-item-number').click(clickHandler);

  $row.hover(onHover, offHover);

  return $row;
};

var setCurrentAlbum = function(album) {
  crrentAlbum = album;
  var $albumTitle = $('.album-view-title');
  var $albumArtist = $('.album-view-artist');
  var $albumReleaseInfo = $('.album-view-release-info');
  var $albumImage = $('.album-cover-art');
  var $albumSongList = $('.album-view-song-list');

  $albumTitle.text(album.title);
  $albumArtist.text(album.artist);
  $albumReleaseInfo.text(album.year + ' ' + album.label);
  $albumImage.attr('src', album.albumArtUrl);

  $albumSongList.empty();

  for (var i = 0; i < album.songs.length; i++) {
    var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
    $albumSongList.append($newRow);
  }
};


var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';

var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';


var currentlyPlayingSong = null;


//when the document loads set current album to Picasso
$(document).ready(function() {

  setCurrentAlbum(albumPicasso);
});
