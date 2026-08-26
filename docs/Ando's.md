---- content:----
<audio id="andos-music" loop>
  <!-- Replace the URL below with your copied MP3 link -->
  <source src="https://cdn.pixabay.com/audio/2026/07/18/audio_0c1deded6a.mp3
" type="audio/mpeg">
  Your browser does not support the audio element.
</audio>

<div style="width:350px; text-align:center">
<div style="width:inherit; display:flex; justify-content:space-between; vertical-align:middle; text-align:center">
<h3 style="margin:2px;">So you see me now...</h3>
<div id="andosmusicplay">
<i class="fa-solid fa-play" style="color: rgb(0, 0, 0);"></i>
</div>
</div>
<strong>THE NAME FOR THE PROJECT ITSELF WAS INSPIRED BY A ROMANIAN FASTFOOD</strong>
<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSm0zpfjy8Habt4NNYf2feU4XnrqOauvJa2h6nxxMh11Q&s=10">
<text>Genuinely ther're a great restaurant, I highly commend them and you should try them as well.</text>
<a href="https://andos.ro">Ando's homepage</a>
<div>
----

---- code: ----
const music = document.getElementById("andos-music");
document.getElementById("andosmusicplay").addEventListener("click", (e) =>{
if (music.paused) {
      music.play();
    } else {
      music.pause();
    }
});
document.getElementById("Andoopen").addEventListener("click", (e) =>{
if(card.style.display === "flex")
music.play();
});
----
