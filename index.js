const baseURL =
  "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2401-ftb-et-web-pt/events";
const state = {
  events: [],
};

async function logAsync(func) {
  const result = await func();
  console.log(result);
}

//Display all of the parties using a fetch command
async function getParty() {
  const response = await fetch(`${baseURL}`);
  const json = await response.json();

  if (!json.success) {
    throw new Error(json.error);
  }

  json.data.forEach((p) => {
    addPartytoScreen(p);
  });
}

//render party to browser
function addPartytoScreen(p) {
  const partiesElement = document.getElementById("parties");
  const elem = document.createElement("div");
  elem.classList.add("party");
  elem.setAttribute("data-id", p.id);

  const idElem = document.createElement("div");
  idElem.classList.add("id");
  idElem.append(p.id);

  const nameElem = document.createElement("div");
  nameElem.classList.add("name");
  nameElem.append(p.name);

  const descriptionElem = document.createElement("div");
  descriptionElem.classList.add("description");
  descriptionElem.append(p.description);

  const dateElem = document.createElement("div");
  descriptionElem.classList.add("date");
  dateElem.append(p.date);

  const locationElem = document.createElement("div");
  locationElem.classList.add("location");
  locationElem.append(p.location);

  const cohortIdElem = document.createElement("div");
  cohortIdElem.classList.add("cohortId");
  cohortIdElem.append(p.cohortId);

  const delButtonElem = document.createElement("button");
  const buttonText = document.createTextNode("Delete");
  delButtonElem.appendChild(buttonText);

  delButtonElem.addEventListener("click", async (event) => {
    const selectedParty = event.target.closest(".party");
    const id = selectedParty.dataset.id;
    const result = await deleteEvent(id);
  });

  elem.append(idElem);
  elem.append(nameElem);
  elem.append(descriptionElem);
  elem.append(dateElem);
  elem.append(locationElem);
  elem.append(cohortIdElem);
  elem.append(delButtonElem);

  partiesElement.append(elem);
}

document.addEventListener("DOMContentLoaded", async () => {
  const parties = await getParty();

  const form = document.getElementById("partyForm");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const id = document.getElementById("id");
    const name = document.getElementById("name");
    const description = document.getElementById("description");
    const date = document.getElementById("date");
    const location = document.getElementById("location");
    const cohortId = document.getElementById("cohortId");

    const party = {
      id: id.value,
      name: name.value,
      description: description.value,
      date: date.value,
      location: location.value,
      cohortId: cohortId.value,
    };

    try {
      const newParty = await createParty(party);
      //add new party to screen
      addPartytoScreen(newParty);
    } catch (err) {
      console.error(err);
    }
  });
});

async function init() {
  await getParty();
}

init();

//Create a party
async function createParty(party) {
  const response = await fetch(`${baseURL}`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(party),
  });
  const json = await response.json();

  if (!json.success) {
    throw new Error(json.error.message);
  }
  return json.data;
}

//delete party

async function deleteEvent(id) {
  console.log("from the delete Event", id);

  try {
    const response = await fetch(`${baseURL}/${id}`, {
      method: "delete",
    });

    if (response.status === "204") {
      console.log("in the if after success on deletion"); //added to check
      const result = State.events.filter((event) => {
        event.id == id;
      });
    }
    render();
  } catch (error) {
    console.log(error);
  }
}
