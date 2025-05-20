const loadData = async () => {
  try {
    let { data } = await axios.get("https://api.tvmaze.com/shows");
    let principalContent = document.getElementById("principalContent");
    data.forEach((element) => {
      principalContent.innerHTML += `<figure>
                <img class="imageShow" alt="${element.name}" src=${element.image.medium} />
                <figcaption><h3>${element.name}</h3></figcaption>
              </figure>`;
    });
  } catch (error) {
    console.log(error);
  }
};
loadData();
const search = async () => {
  let searchInput = document.getElementById("search").value;
  try {
    let { data } = await axios.get(
      `https://api.tvmaze.com/search/shows?q=${searchInput.toLowerCase()}`
    );
    console.log(data);

    console.log(data.length);

    let principalContent = document.getElementById("principalContent");
    if (searchInput === "") {
      principalContent.innerHTML = "";
      loadData();
    }
    if (data.length === 0 && searchInput !== "") {
      principalContent.innerHTML = "";
      principalContent.innerHTML = `<h2>No se encontraron resultados</h2>`;
    } else {
      principalContent.innerHTML = "";
      data.forEach((element) => {
        principalContent.innerHTML += `<figure>
                  <img class="imageShow" alt="${element.show.name}" src=${
          element.show.image !== null
            ? element.show.image.original
            : "img/imageplaceholder.jpg"
        } />
                  <figcaption><h3>${element.show.name}</h3></figcaption>
                </figure>`;
      });
    }
  } catch (error) {
    console.log(error);
  }
};

let searchInput = document.getElementById("search");
searchInput.addEventListener("input", search);
