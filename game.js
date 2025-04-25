// Buton renkleri tanımlandı
var buttonColours = ["red", "blue", "green", "yellow"];

// Oyunun desenini ve kullanıcının tıklama desenini tutan diziler
var gamePattern = [];
var userClickedPattern = [];

// Oyun başlama durumu ve seviyeyi takip etmek için değişkenler
var started = false;
var level = 0;

// Klavye tuşuna basıldığında oyunu başlatır
$(document).keypress(function() {
  if (!started) {
    // Seviyeyi göster
    $("#level-title").text("Level " + level);
    nextSequence(); // Yeni bir desen oluştur
    started = true; // Oyunu başlat
  }
});

// Mobilde "Tap to Start" tıklama olayını ekliyoruz
$("#mobile-start").click(function() {
  if (!started) {
    $("#level-title").text("Level " + level);  // Seviyeyi göster
    nextSequence(); // Yeni bir desen oluştur
    started = true; // Oyunu başlat
    $("#mobile-start").hide(); // "Tap to Start" mesajını gizle
    $("#level-title").show();  // "level-title" mobilde görünür hale gelsin
  }
});

// Butonlara tıklama olayını ekliyoruz
$(".btn").click(function() {

  // Kullanıcının tıkladığı butonun rengini alıyoruz
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour); // Tıklanan rengi kullanıcı desenine ekliyoruz

  playSound(userChosenColour); // Ses çal
  animatePress(userChosenColour); // Buton animasyonunu başlat

  checkAnswer(userClickedPattern.length-1); // Cevabı kontrol et
});

// Kullanıcının cevabını kontrol etme fonksiyonu
function checkAnswer(currentLevel) {

    // Eğer doğru cevap verdiyse
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      // Eğer kullanıcı tüm deseni doğru şekilde tamamladıysa
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence(); // Yeni bir desen oluştur
        }, 1000);
      }
    } else {
      // Yanlış cevap verildiyse
      playSound("wrong"); // Yanlış sesini çal
      $("body").addClass("game-over"); // Game over animasyonu ekle
      
      // Web ve mobilde mesajları farklı şekilde göster
    if ($(window).width() <= 768) {  // Eğer mobilse
      $("#mobile-start").show().html("GAME OVER<br>Tap to Restart");
      $("#level-title").hide();  // Webdeki başlık gizlensin
    } else {  // Webde
      $("#level-title").text("Game Over, Press Any Key to Restart");
      $("#mobile-start").hide();  // Mobildeki başlık gizlensin
    }
      setTimeout(function () {
        $("body").removeClass("game-over"); // Game over animasyonunu kaldır
      }, 200);

      startOver(); // Oyunu sıfırla
    }
}

// Yeni bir desen oluşturma fonksiyonu
function nextSequence() {
  userClickedPattern = [];
  level++;  // Seviye arttırma işlemi burada yapılır
  if ($(window).width() <= 768) {  // Eğer mobilse
    $("#mobile-start").hide();  // Mobildeki "Tap to Start" mesajını gizle
    $("#level-title").show().text("Level " + level);  // Mobilde seviyeyi göster
  } else {
    $("#level-title").text("Level " + level);  // Webde seviyeyi göster
  }
  var randomNumber = Math.floor(Math.random() * 4); // 0 ile 3 arasında rastgele bir sayı seç
  var randomChosenColour = buttonColours[randomNumber]; // Rastgele bir renk seç
  gamePattern.push(randomChosenColour); // Rengi oyunun desenine ekle

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); // Rengi ekranda göster
  playSound(randomChosenColour); // Ses çal
}

// Butona tıklanınca animasyon ekleme fonksiyonu
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed"); // Buton basıldığında animasyonu başlat
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed"); // Animasyonu bitir
  }, 100);
}

// Ses çalma fonksiyonu
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3"); // Ses dosyasını oluştur
  audio.play(); // Sesi çal
}

// Oyunu sıfırlama fonksiyonu
function startOver() {
  level = 0; // Seviyeyi sıfırla
  gamePattern = []; // Oyunun desenini sıfırla
  started = false; // Oyunun başladığını işaretleyen durumu sıfırla
}