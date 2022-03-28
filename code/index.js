const section = document.querySelector(".container");
const btnLeft = document.querySelector(".leftbn");
const btnRight = document.querySelector(".rightbn");

function generateCard(movie) {
  return `<div class='movie-card' id='${movie.id}'>
      <img src='${movie.imgUrl}' />
      <p>Movie:'${movie.name}' </p>
      <p>Info:'${movie.outlineInfo}'</p>
    </div>`;
}

async function getData() {
  const response = await fetch("http://localhost:3000/movies");
  return await response.json();
}
let pointer = 0;
let length = 4;

btnLeft.addEventListener("click", () => {
  pointer--;
  length--;
  section.innerHTML = null;
  sendData();
});

btnRight.addEventListener("click", () => {
  pointer++;
  length++;
  section.innerHTML = null;
  sendData();
});

function renderCardList(movies) {
  if (pointer === 0) {
    btnLeft.style.opacity = 0;
    btnLeft.classList.add("disableClick");
  } else {
    btnLeft.style.opacity = 1;
    btnLeft.classList.remove("disableClick");
  }
  if (length === 9) {
    btnRight.style.opacity = 0;
    btnRight.classList.add("disableClick");
  } else {
    btnRight.style.opacity = 1;
    btnRight.classList.remove("disableClick");
  }
  if (pointer >= 0 && length <= 9) {
    movies = movies.slice(pointer, length);
    return movies.map((movie) => {
      let generatedCard = generateCard(movie);
      insertIntoHtml(generatedCard);
    });
  }
}

function insertIntoHtml(tag) {
  section.insertAdjacentHTML("afterbegin", tag);
}

function sendData() {
  getData().then((movies) => {
    renderCardList(movies);
  });
}
sendData();
