$(document).ready(function () {
  const allowedOrigins = [
    "http://localhost:5500",
    "http://localhost:8080",
    "https://auth.800ambi.com",
  ];

  let validParent = false;
  if (window.top !== window.self) {
    if (document.referrer) {
      const parentUrl = new URL(document.referrer);
      if (allowedOrigins.includes(parentUrl.origin)) {
        validParent = true;
      }
    }
  }

  if (validParent) {
    $(".slider-container").css("display", "block");

    function shuffleWord(word) {
      const arr = word.split("");
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr.join("");
    }

    $(".slider").slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 0,
      speed: 2000, // Faster speed for the scrolling effect
      cssEase: "linear",
      infinite: true,
      variableWidth: true,
    });

    $(".slider-item").hover(
      function () {
        const originalText = $(this).text();
        $(this).data("original-text", originalText);
        if (originalText === "Onboarding Day 1") {
          $(this).text("1️⃣ " + originalText);
        } else if (originalText === "Onboarding Day 2") {
          $(this).text("2️⃣ " + originalText);
        } else if (originalText === "Forgot Password") {
          const target = $(this);
          let shuffled = shuffleWord("Password");
          let count = 0;
          const interval = setInterval(() => {
            target.text(`Forgot ${shuffled}`);
            shuffled = shuffleWord("Password");
            count++;
            if (count > 10) {
              clearInterval(interval);
              target.text("Forgot Password");
            }
          }, 100);
          $(this).data("interval", interval);
        } else if (originalText === "Invite Team") {
          $(this).text("👋 Invite Team");
        } else if (originalText === "Changelog Updates") {
          $(this).html('Changelog Updates <span class="pill">NEW</span>');
        } else if (originalText === "Upgrade Confirmation") {
          $(this).text("✅ Upgrade Confirmation");
        } else if (originalText === "Account Confirmation") {
          $(this).text("Account Confirmation 🎉");
        }
      },
      function () {
        const originalText = $(this).data("original-text");
        $(this).text(originalText);
        if ($(this).data("interval")) {
          clearInterval($(this).data("interval"));
          $(this).removeData("interval");
        }
      }
    );
  }
});
