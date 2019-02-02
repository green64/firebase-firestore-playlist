//this puts data into our index <ul>
const cafeList = document.querySelector("#cafe-list");
const form = document.querySelector('#add-cafe-form');

//create element and render cafe
function renderCafe(doc) {
  let li = document.createElement('li');
  let name = document.createElement('span');
  let city = document.createElement('span');

  //attach auto id to - doc is in our function and .id gets us its auto id
  li.setAttribute('data-id', doc.id);
  name.textContent = doc.data().name;
  city.textContent = doc.data().city;

  //append data to li
  li.appendChild(name);
  li.appendChild(city);

  //append li to doc
  cafeList.appendChild(li);

}
//we need a promise because this may not complete immediately
//get method is grabbing docs from firebase
//we need 'then' method for a promise when "get" is complete our function will fire
db.collection("cafes")
  .get()
  .then(snapshot => {
    snapshot.docs.forEach(doc => {
      renderCafe(doc);
    })
  });

  //listening for & getting data
  form.addEventListener('submit', (e) => {
    //prevent default page reload
    e.preventDefault();
    //instead of getting data, we're ADDING it, so add method
    db.collection('cafes').add({
      name: form.name.value,
      city: form.city.value
    });
    //clear form of previous input
    form.name.value = '';
    form.city.value = ';'
  }); 
