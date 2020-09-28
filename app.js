/**
 * Stores the list of kittens
 * @type {Kitten[]}
 */
 let kittens = []
 let kitten = {}

/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * you can use robohash for images
 * https://robohash.org/<INSERTCATNAMEHERE>?set=set4
 * then add that data to the kittens list.
 * Then reset the form
 */
function addKitten(event) {
event.preventDefault()
let form = event.target

let kitten = {
  id: generateId(),
  name: form.name.value,
  mood: 'Tolerant',
  affection: 5,
}

console.log (`Name Check ${kitten.name}`)

kittens.push(kitten)
saveKittens()

form.reset()
//drawKittens();
}


/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens
 */
function saveKittens() {
  window.localStorage.setItem("kittens", JSON.stringify(kittens))
  drawKittens()
}

/**
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {
  let kittensData = JSON.parse(window.localStorage.getItem("kittens"))
  if (kittensData) {
    kittens = kittensData
  }
}

/**
 * Draw all of the kittens to the kittens element
 * <div class= "d-flex space-around" id='name'><b> Name:</b>${kitten.name} </div>
      <div class= "d-flex space-around" id='mood'><b> Name:</b>${mood} </div>
      <div class= "d-flex space-around" id='affection'><b>Affection:</b>${affection} </div>
      
 */
function drawKittens() {

  let kittenElem = document.getElementById('kittens')
  let kittenTemp = ""
  kittens.forEach(kitten => {
    kittenTemp += `<div id = "${kitten.name}" class = "kitten ${kitten.mood} card m-2"> 
      <div>
      <img class = "kitten ${kitten.mood}" src="https://robohash.org/${kitten.name}?set=set4" height = "175" width = "175">
      </div>
      <div class = "d-flex justify-content-center space-between">
      <h4>Name: ${kitten.name}<h/4>
      <p>  
       <span>Mood: ${kitten.mood}</span>
      </p>
      <p>
       <span>Affection:${kitten.affection}</span> 
      </p>
        <button id = "${kitten.name}PetButton" onclick="pet('${kitten.id}')">Pet</button>
        <button id = "${kitten.name}CatnipButton" onclick="catnip('${kitten.id}')">Catnip</button>
        <button onClick ="removeKitten('${kitten.id}')">Delete</button>
      </div>
    </div>

    `
  })
  kittenElem.innerHTML = kittenTemp
  console.log("Testing");

}

/**
 * Find the kitten in the array by its id
 * @param {string} id
 * @return {Kitten}
 */
function findKittenById(id) {
  return kittens.find(k => k.id == id);
}

/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .7
 * increase the kittens affection
 * otherwise decrease the affection
 * save the kittens
 * @param {string} id
 */
function pet(id) {
  let i = findKittenById(id)
  let x = Math.random()
  if (x > .7) {
    i.affection++
  } 
  else{
    i.affection--
  }
  setKittenMood(i)
  saveKittens()
}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * save the kittens
 * @param {string} id
 */
function catnip(id) {
  let i = findKittenById(id)
  i.mood = 'Tolerant'
  i.affection = 5
  saveKittens()
}

/**
 * Sets the kittens mood based on its affection
 * Happy > 6, Tolerant <= 5, Angry <= 3, Gone <= 0
 * @param {Kitten} kitten
 */
function setKittenMood(kitten) {
  document.getElementById("kittens").classList.remove("mood")
  if (kitten.affection > 6) {
    kitten.mood = 'happy'
  } if (kitten.affection <= 5) {
    kitten.mood = 'tolerant'
  } if (kitten.affection <= 3) {
    kitten.mood = 'angry'
  } if (kitten.affection <= 0) {
    kitten.mood = 'gone';
  }
  
  saveKittens()
}

function removeKitten(id) {
  let i = kittens.findIndex(kitten => kitten.id == id)
  kittens.splice(i, 1)
  saveKittens()
  
}

function getStarted() {
  document.getElementById("welcome").remove()
  drawKittens()
}

/**
 * Defines the Properties of a Kitten
 * @typedef {{id: string, name: string, mood: string, affection: number}} Kitten
 */


/**
* Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return (
    Math.floor(Math.random() * 10000000) +
    "-" +
    Math.floor(Math.random() * 10000000)
  );
}
loadKittens()
