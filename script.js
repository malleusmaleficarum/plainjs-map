//close button and function
let close = false;
const closeButton = document.querySelector(".header h2");
closeButton.addEventListener("click", () => {
  close = true;
});

//initialize MAP
const map = L.map("map").setView([1.284193, 103.843362], 15);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

//Add marker from JSON use Async Await
let marks = [];
async function callData() {
  const res = await fetch("data.json");
  const data = await res.json();
  marks = [...data];

  marks.forEach((place) => {
    //SETVIEW TO MARKER VIA NAV
    let navButton = document.createElement("button");
    let li = document.createElement("li");
    navButton.innerHTML = place.name;
    document.querySelector(".button").appendChild(li).appendChild(navButton);
    navButton.addEventListener("click", () => handleClick(place));

    //SET ACTIVE BUTTON
    const btnList = document.querySelectorAll(".button li button");
    btnList.forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelector(".active")?.classList.remove("active");
        btn.classList.add("active");
      });
    });

    //SETVIEW TO MARKER VIA MARKER
    const marker = L.marker(place.location)
      .on("click", () => handleClick(place))
      .bindTooltip(place.name, {
        direction: "right",
        permanent: true,
      })
      .addTo(map);
  });
}
callData();

//Add marker from JSON use .then
// fetch("data.json")
//   .then((response) => response.json())
//   .then((data) =>
//     data.forEach((mark) => {
//       L.marker(mark.location).addTo(map);
//     })
//   );

//handle click to zoom
const handleClick = (place) => {
  //zoom and centered clicked marker
  map.setView(place.location, 17);
  const modal = document.querySelector(".modal");
  modal.style.transform = "translateX(0)";

  //add modal content
  const modalTitle = document.querySelector(".modal h2");
  const modalDesc = document.querySelector(".modal p");
  modalTitle.innerHTML = place.name;
  modalDesc.innerHTML = place.desc;
};

//handle close icon
const closeIcon = document.querySelector(".header h2");
closeIcon.addEventListener("click", () => {
  const modal = document.querySelector(".modal");
  modal.style.transform = "translateX(100%)";
});
