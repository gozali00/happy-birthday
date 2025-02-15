const data = [
  { image: "foto1.jpeg", text: "kamuuu lagi ngapain wkwkwk" },
  { image: "foto2.jpeg", text: "cie cie cie yang hari ini ulang tahun!!!" },
  { image: "foto3.jpeg", text: "ini foto pas ngerayain ulang tahun kamu sekaligus aku beri kado spatu pertama buat kamu terus kita ngapain lagi yaa xixixi 🤭" },
  { image: "foto4.jpeg", text: "kamu gencet kepala aku ayang aku penyet wkwkwk" },
  { image: "foto5.jpeg", text: "semoga cinta kita abadi ayang ❤️😘" },
  { image: "foto6.jpeg", text: "you are my everything 🫶" },
];

const imageElement = document.getElementById("slider-image");
const textElement = document.getElementById("changing-text");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const musicElement = document.getElementById("background-music");

let currentIndex = 0;
let autoSlide = setInterval(nextContent, 3000);

function showContent(index) {
  imageElement.classList.add("transition-transform", "duration-500", "-translate-x-full", "opacity-0", "rounded-lg");
  textElement.classList.add("opacity-0");

  setTimeout(() => {
    imageElement.src = data[index].image;
    textElement.textContent = data[index].text;

    imageElement.classList.remove("-translate-x-full");
    imageElement.classList.add("translate-x-full");

    setTimeout(() => {
      imageElement.classList.remove("translate-x-full", "opacity-0");
      textElement.classList.remove("opacity-0");
    }, 50);
  }, 500);
}

function nextContent() {
  currentIndex = (currentIndex + 1) % data.length;
  showContent(currentIndex);
}

prevBtn.style.opacity = "0.3";
nextBtn.style.opacity = "0.3";
prevBtn.style.transition = "opacity 0.3s";
nextBtn.style.transition = "opacity 0.3s";

prevBtn.style.borderRadius = "0px";
nextBtn.style.borderRadius = "0px";
prevBtn.style.background = "transparent";
nextBtn.style.background = "transparent";
prevBtn.style.border = "none";
nextBtn.style.border = "none";
prevBtn.style.color = "white";
nextBtn.style.color = "white";
prevBtn.style.fontSize = "24px";
nextBtn.style.fontSize = "24px";

prevBtn.addEventListener("mouseover", () => (prevBtn.style.opacity = "1"));
prevBtn.addEventListener("mouseout", () => (prevBtn.style.opacity = "0.3"));
nextBtn.addEventListener("mouseover", () => (nextBtn.style.opacity = "1"));
nextBtn.addEventListener("mouseout", () => (nextBtn.style.opacity = "0.3"));

function stopAutoSlide() {
  clearInterval(autoSlide);
  autoSlide = null;
}

function restartAutoSlide() {
  if (!autoSlide) {
    autoSlide = setInterval(nextContent, 3000);
  }
}

function prevContent() {
  currentIndex = (currentIndex - 1 + data.length) % data.length;
  showContent(currentIndex);
}

prevBtn.addEventListener("click", prevContent);

imageElement.addEventListener("touchstart", stopAutoSlide, { passive: true });
imageElement.addEventListener("click", stopAutoSlide);
imageElement.addEventListener("mouseover", stopAutoSlide);
imageElement.addEventListener("touchend", () => setTimeout(restartAutoSlide, 3000));
imageElement.addEventListener("mouseleave", () => setTimeout(restartAutoSlide, 3000));
nextBtn.addEventListener("click", nextContent);
showContent(currentIndex);

document.addEventListener("DOMContentLoaded", function () {
  musicElement.volume = 0.5;
  musicElement.muted = false;

  const tryPlayMusic = () => {
    if (musicElement.paused) {
      musicElement
        .play()
        .then(() => {
          console.log("Musik berhasil diputar.");
        })
        .catch(() => {
          console.log("Autoplay gagal, menunggu interaksi pengguna...");
          document.addEventListener("click", tryPlayMusic, { once: true });
          document.addEventListener("touchstart", tryPlayMusic, { once: true });
        });
    }
  };

  tryPlayMusic();
});
