//this puts data into our index <ul>
const cafeList = document.querySelector("#cafe-list");
const form = document.querySelector("#add-cafe-form");

//create element and render cafe
function renderCafe(doc) {
  let li = document.createElement("li");
  let name = document.createElement("span");
  let city = document.createElement("span");
  let cross = document.createElement("div");

  //attach auto id to - doc is in our function and .id gets us its auto id
  li.setAttribute("data-id", doc.id);
  name.textContent = doc.data().name;
  city.textContent = doc.data().city;
  cross.textContent = "x";

  //append data to li
  li.appendChild(name);
  li.appendChild(city);
  li.appendChild(cross);

  //append li to doc
  cafeList.appendChild(li);

  //deleting data
  cross.addEventListener("click", e => {
    e.stopPropagation();
    let id = e.target.parentElement.getAttribute("data-id");
    //how you id a single document -- with .doc
    db.collection("cafes")
      .doc(id)
      .delete();
  });
}
//we need a promise because this may not complete immediately
//get method is grabbing docs from firebase
//we need 'then' method for a promise when "get" is complete our function will fire
db.collection("cafes")
  //refining doc retrieval to filter specific city
  .where('city', '==', 'Manchester')
  .get()
  .then(snapshot => {
    snapshot.docs.forEach(doc => {
      renderCafe(doc);
    })
  });

//listening for & getting data
form.addEventListener("submit", e => {
  //prevent default page reload
  e.preventDefault();
  //instead of getting data, we're ADDING it, so add method
  db.collection("cafes").add({
    name: form.name.value,
    city: form.city.value
  });
  //clear form of previous input
  form.name.value = "";
  form.city.value = "";
});
