$(document).ready(function(){

    var duration = 0;
    var player = document.getElementById('audio');
    var playerBtn = $('#playAudioBtn');
    var reapetAudio = $('#repeatAudioBtn');
    var volumeBtn = $('#volumeAudioBtn');

    //Repeat Btn
    reapetAudio.click(function(){
        player.currentTime = 0;
        $(this).toggleClass('selectBtn');
    })

    //Doi icon play va pause
    playerBtn.click(function(){
        if(this.classList.contains('pe-7s-play')){
            this.classList.replace('pe-7s-play', 'pe-7s-rocket');
            player.play();
        }
        else{
            this.classList.replace('pe-7s-rocket', 'pe-7s-play');
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
        if(volumeBtn.classList.contains('pe-7s-mute'))
            volumeBtn.classList.replace('pe-7s-mute', 'pe-7s-volume');
        if(percent<=0){
            percent = 0;
            volumeBtn.classList.replace('pe-7s-volume', 'pe-7s-mute');
        }
        if(percent>1) percent = 1;
        player.volume = percent;
        vol = percent;
    })

    //Doi icon volume
    volumeBtn.click(function(){
        if(this.classList.contains('pe-7s-volume')){
            this.classList.replace('pe-7s-volume', 'pe-7s-mute');
            $('.progressVol').height(0);
            player.volume = 0;
        }
        else{
            this.classList.replace('pe-7s-mute', 'pe-7s-volume');
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

    $('.list .list-song').click(function(){
        var link = $(this).attr('data-link');
        $('#audio').attr('src', link);
        player.play();
        var playerBtn = document.getElementById('playAudioBtn');
        if(playerBtn.classList.contains('pe-7s-play')){
            playerBtn.classList.replace('pe-7s-play', 'pe-7s-rocket');
        }
        var lyric = $(this).attr('data-lyric');
        $('.lyric').text(lyric);
        
        var image = this.querySelector('.thumbnail img').src;
        var bg = `url(${image})`;
        $('.bg-player').css('background-image', bg);

        var name = this.querySelector('.column .nameSong').innerHTML;
        var singer = this.querySelector('.column .singer').innerHTML;
        $('.music-player .nameSong').text(name);
        $('.music-player .singer').text(singer);
    })

    $('.addPlaylist').click(function(event){
        event.stopPropagation();
    })

    $('.addPlaylist').click(function(){
        var elem = $(this).parent().parent();
        var link = elem.attr('data-link');
        var name = elem.children('.column').children('.nameSong').text();
        var singer = elem.children('.column').children('.singer').text();
        $('.info-player .list').append(`<div class="list-song">
                <h5 class="nameSongList">${name}</h4>
                <h6 class="singerList">${singer}</h6>
            </div>`)
    })

})