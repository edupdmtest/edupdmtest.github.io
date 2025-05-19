let reponse
let essais = 0
let indiceReponse = ""

function addDdaks(points) {
  let current = parseInt(sessionStorage.getItem("ddaks") || "100", 10);
  current += points;
  sessionStorage.setItem("ddaks", current);

  const scoreElement = document.getElementById("score");
  if (scoreElement) {
    scoreElement.textContent = current;
    scoreElement.classList.add("grow");
    setTimeout(() => scoreElement.classList.remove("grow"), 200);
  }
}

function numRandom() {
  reponse = Math.floor(Math.random() * 100 + 1)
  essais = 0
  indiceReponse = ""

  document.getElementById("message").textContent =
    "Devine un nombre entre 1 et 100. Tu as 10 essais. Des indices apparaîtront progressivement."
  document.getElementById("indice").textContent = ""

  const tbody = document.querySelector("#guessTable tbody")
  tbody.innerHTML = ""
}


function verifieInput(entree) {
  return !(isNaN(entree) || entree < 1 || entree > 100)
}

function verifieNum() {
  indiceReponse = "" 

  const indices = [
    ["Le nombre est pair", "Le nombre est impair"],
    ["Le nombre est un multiple de 3", "Le nombre n'est pas un multiple de 3"],
    ["Le nombre est premier", "Le nombre n'est pas premier"],
    ["Le nombre est un multiple de 5", "Le nombre n'est pas un multiple de 5"],
    ["Le nombre est un multiple de 7", "Le nombre n'est pas un multiple de 7"],
    ["Le nombre est un multiple de 13", "Le nombre n'est pas un multiple de 13"],
    ["Le nombre est un multiple de 17", "Le nombre n'est pas un multiple de 17"],
    ["Le nombre est plus petit que la racine carrée de 49", "Le nombre est plus grand que le onzième chiffre de la séquence de Fibonacci"],
    ["Le nombre est entre 8 et 88 inclus", "Le nombre n'est pas entre 8 et 88"]
  ]

  const premiers = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97]

  indiceReponse += (reponse % 2 === 0 ? indices[0][0] : indices[0][1]) + ". "
  indiceReponse += (reponse % 3 === 0 ? indices[1][0] : indices[1][1]) + ". "
  indiceReponse += (premiers.includes(reponse) ? indices[2][0] : indices[2][1]) + ". "
  indiceReponse += (reponse % 5 === 0 ? indices[3][0] : indices[3][1]) + ". "
  indiceReponse += (reponse % 7 === 0 ? indices[4][0] : indices[4][1]) + ". "
  indiceReponse += (reponse % 13 === 0 ? indices[5][0] : indices[5][1]) + ". "
  indiceReponse += (reponse % 17 === 0 ? indices[6][0] : indices[6][1]) + ". "

  if (reponse < 7) {
    indiceReponse += indices[7][0] + ". "
  } else if (reponse > 89) {
    indiceReponse += indices[7][1] + ". "
  }

  if (reponse >= 8 && reponse <= 88) {
    indiceReponse += indices[8][0] + ". "
  } else {
    indiceReponse += indices[8][1] + ". "
  }
}

function checkGuess() {
  const entree = parseInt(document.getElementById("guess").value)
  const message = document.getElementById("message")
  const indice = document.getElementById("indice")

  if (typeof reponse === "undefined") {
    indice.textContent = "Clique sur 'Nouveau nombre' pour commencer une partie."
    return
  }

  if (!verifieInput(entree)) {
    message.textContent = "Entrée invalide ! Saisir une valeur entre 1 et 100."
    indice.textContent = ""
    return
  }

  essais++

  let indiceFinale = ""

  if (entree === reponse) {
    reponse = undefined
    message.textContent = `Bravo ! Tu as trouvé en ${essais} essai(s) et tu as gagné ` + parseInt((100 / essais)*4) + " Ddaks!"
    addToHistory(essais, entree, "Bonne réponse !")
    addDdaks(parseInt((100 / essais)*4))
    indice.textContent = "Clique sur 'Nouveau nombre' pour commencer une partie."
    return
  }

  if (essais >= 10) {
    message.textContent = `WOMP WOMP... Tu as perdu. Le nombre était ${reponse}.`
    indice.textContent = ""
    addToHistory(essais, entree, "Fin de partie.")
    essais = 0
    reponse = undefined
    return
  }

  message.textContent = "Ce n'est pas le bon nombre ! Essaie encore."

  if (!(essais % 2 === 0)) {
    if (entree < reponse) {
      indiceFinale += `Le nombre est plus grand que ${entree}. `
    } else {
      indiceFinale += `Le nombre est plus petit que ${entree}. `
    }
  }

  verifieNum()
  const splitIndices = indiceReponse.split(". ")
  if (splitIndices[essais - 1]) {
    indiceFinale += splitIndices[essais - 1] + "."
  }

  indice.textContent = indiceFinale
  addToHistory(essais, entree, indiceFinale)
}

function addToHistory(essai, guess, clue) {
  const tbody = document.querySelector("#guessTable tbody")
  const row = document.createElement("tr")

  const tdEssai = document.createElement("td")
  const tdGuess = document.createElement("td")
  const tdClue = document.createElement("td")

  tdEssai.textContent = essai
  tdGuess.textContent = guess
  tdClue.textContent = clue

  row.appendChild(tdEssai)
  row.appendChild(tdGuess)
  row.appendChild(tdClue)

  tbody.appendChild(row)
}
