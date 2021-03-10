$(document).ready(function(){

    var duration = 0;
    var player = document.getElementById('audio');
    var playerBtn = $('#playAudioBtn');
    var repeatAudio = $('#repeatAudioBtn');
    var volumeBtn = $('#volumeAudioBtn');

    //Repeat Btn
    $('#repeatAudioBtn, #randomAudioBtn').click(function(){
        //player.currentTime = 0;
        $(this).toggleClass('selectBtn');
    })

    //Doi icon play va pause
    playerBtn.click(function(){
        if(this.classList.contains('la-play')){
            this.classList.replace('la-play', 'la-pause');
            player.play();
        }
        else{
            this.classList.replace('la-pause', 'la-play');
            player.pause();
        }
    })


    player.onloadedmetadata = function(){
        duration = player.duration;
        var min = Math.floor(duration/60);
        var sec = Math.floor(duration%60);
        if(min<10) min = "0"+min;
        if(sec<10) sec = "0"+sec;
        $('.durtime').text(min+':'+sec);
    }

    player.addEventListener('timeupdate', function(){
        currentTime = this.currentTime;
        var min = Math.floor(currentTime/60);
        var sec = Math.floor(currentTime%60);
        if(min<10) min = "0"+min;
        if(sec<10) sec = "0"+sec;
        $('.curtime').text(min+':'+sec);

        var percent = currentTime*100/this.duration + '%';
        $('#progress').width(percent);
        if(currentTime == this.duration){
            if(document.getElementById('repeatAudioBtn').classList.contains('selectBtn')){
                currentTime = 0;
                player.play();
            }
            else{
                playNextSong();
            }
        }
    })

    var down = false;
    $('#progressbar').click(function(e){
        $('#progress').width(e.offsetX);
        var percent = e.offsetX*100/$(this).width();
        player.currentTime = percent*duration/100;
    })

    $('#progressbar').mousedown(function(){
        down = true;
    })

    $(window).mouseup(function(){
        down = false;
    })

    $('#progressbar').mousemove(function(e){
        if(down){
            $('#progress').width(e.offsetX);
            var percent = e.offsetX*100/$(this).width();
            player.currentTime = percent*duration/100;
        }
    })




    function getOffset( el ) {
        var _x = 0;
        var _y = 0;
        while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
            _x += el.offsetLeft - el.scrollLeft;
            _y += el.offsetTop - el.scrollTop;
            el = el.offsetParent;
        }
        return { top: _y, left: _x };
    }
    

    var vol = 1;
    $('#volume-slider').click(function(e){
        var volumeBtn = document.getElementById('volumeAudioBtn');
        var x = getOffset( document.getElementById('volume-slider') ).top; 
        var posY = x + $(this).height();
        $('.progressVol').height(posY - e.clientY);
        var percent = (posY - e.clientY)/$(this).height();
        if(volumeBtn.classList.contains('la-volume-mute'))
            volumeBtn.classList.replace('la-volume-mute', 'la-volume-up');
        if(percent<=0){
            percent = 0;
            volumeBtn.classList.replace('la-volume-up', 'la-volume-mute');
        }
        if(percent>1) percent = 1;
        player.volume = percent;
        vol = percent;
    })

    //Doi icon volume
    volumeBtn.click(function(){
        if(this.classList.contains('la-volume-up')){
            this.classList.replace('la-volume-up', 'la-volume-mute');
            $('.progressVol').height(0);
            player.volume = 0;
        }
        else{
            this.classList.replace('la-volume-mute', 'la-volume-up');
            $('.progressVol').height($('#volume-slider').height() * vol);
            player.volume = vol;
        }
    })
    /* Player music  */

    $('.btn-lyric').click(function(){
        if($('.lyric').attr('class').indexOf('show')<0){
            $('.btn-gr .active').removeClass('active');
            $('.info-player .show').removeClass('show');
            $('.lyric').addClass('show');
            $(this).addClass('active');
        }
        else{
            $(this).removeClass('active');
            $('.info-player .lyric').removeClass('show');
            $('.bg-player').addClass('show');
        }
    })

    $('.btn-list').click(function(){
        if($('.list').attr('class').indexOf('show')<0){
            $('.btn-gr .active').removeClass('active');
            $('.info-player .show').removeClass('show');
            $('.list').addClass('show');
            $(this).addClass('active');
        }
        else{
            $(this).removeClass('active');
            $('.info-player .list').removeClass('show');
            $('.bg-player').addClass('show');
        }
    })

    $('.tab-group .tab').click(function(){
        $('.tab-group .active').removeClass('active');
        $(this).addClass('active');
        var id = $(this).attr('data-target');
        $('.tab-content .show').removeClass('show');
        $(`${id}`).addClass('show');
    })
    function handleEnter(){
        this.parentElement.querySelector('label').classList.add('label-act');
        this.parentElement.querySelector('span').classList.add('req');
        if(this.value==""){
            this.parentElement.querySelector('label').classList.remove('label-act');
            this.parentElement.querySelector('span').classList.remove('req');
        }
                this.parentElement.querySelector('.show-mess').classList.remove('show-mess');
    }
    $('.form-login input').keyup(handleEnter);

    $('.tab-title>div').click(function(){
        $('.tab-title .active').removeClass('active');
        $(this).addClass('active');
        var a = $(this).attr('data-target');
        $('.uploadForm').addClass('hide');
        $(a).removeClass('hide');
    })

    //Add a song to playlist
    $('.addPlaylist').click(function(event){
        event.stopPropagation();
        var elem = $(this).parent().parent();
        var link = elem.attr('data-link');
        var lyric = elem.attr('data-lyric');
        var name = elem.children('.column').children('.nameSong').text();
        var singer = elem.children('.column').children('.singer').text();
        var bg = elem.children('.thumbnail').children('img').attr('src');
        $('.info-player .list').append(`
            <div class="list-song" data-link="${link}" data-lyric="${lyric}">
                <div class="thumbnail">
                    <img src="${bg}">
                </div>
                <div class="column">
                    <h5 class="nameSong">${name}</h4>
                    <h6 class="singer">${singer}</h6>
                </div>
                <div class="btn deleteSongPlaylist">Xóa</div>
            </div>`);
        var nextAudio = $('.info-player .list').children()[0].querySelector('.column .nameSong').innerHTML;
        $('.nextAudio h4').text(`Bài tiếp theo: ${nextAudio}`);
    })

    //Play a song in playlist
    $(document).on('click','.list-song', function(){
        var link = $(this).attr('data-link');
        $('#audio').attr('src', link);
        player.play();
        var playerBtn = document.getElementById('playAudioBtn');
        if(playerBtn.classList.contains('la-play')){
            playerBtn.classList.replace('la-play', 'la-pause');
        }
        var lyric = $(this).attr('data-lyric');
        $('.lyric').text(lyric);
        
        var image = this.querySelector('.thumbnail img').src;
        var bg = `url(${image})`;
        $('.bg-player').css('background-image', bg);

        var name = this.querySelector('.column .nameSong').innerHTML;
        var singer = this.querySelector('.column .singer').innerHTML;
        $('.music-player>.nameSong').text(name);
        $('.music-player>.singer').text(singer);
        var a = $(this).parent().parent();
        if(a[0].classList.contains('info-player')){
            this.remove();
        };
    })

    //Play next song
    function playNextSong(){
        var isRandom = document.getElementById('randomAudioBtn').classList.contains('selectBtn');
        console.log(isRandom);
        var firstChild = $('.info-player .list').children();
        var numOfChild = firstChild.length;
        var a = 0;
        if(isRandom){
            a = Math.floor((Math.random() * (numOfChild-1)) + 1)-1;
        }
        var link = $(firstChild[a]).attr('data-link');
        $('#audio').attr('src', link);
        player.play();
        var playerBtn = document.getElementById('playAudioBtn');
        if(playerBtn.classList.contains('la-play')){
            playerBtn.classList.replace('la-play', 'la-pause');
        }
        var lyric = $(firstChild[a]).attr('data-lyric');
        $('.lyric').text(lyric);
        
        var image = firstChild[a].querySelector('.thumbnail img').src;
        var bg = `url(${image})`;
        $('.bg-player').css('background-image', bg);

        var name = firstChild[a].querySelector('.column .nameSong').innerHTML;
        var singer = firstChild[a].querySelector('.column .singer').innerHTML;
        $('.music-player>.nameSong').text(name);
        $('.music-player>.singer').text(singer);
        if(numOfChild==1){
            var nextAudio = "/Danh sách trống/";
        }
        else
            var nextAudio = firstChild[a+1].querySelector('.column .nameSong').innerHTML;
        $('.nextAudio h4').text(`Bài tiếp theo: ${nextAudio}`);
        firstChild[a].remove();
    }
    $('#nextAudioBtn').click(playNextSong);

    //Delete song in playlist
    $(document).on('click','.deleteSongPlaylist', function(event){
        event.stopPropagation();
        $(this).parent().remove();
    })
})