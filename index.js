const wrapper = document.querySelector(".wrapper")
const neck = document.querySelector(".neck")
const wowEl = document.querySelector("#wows")

const largeWowContainer = document.querySelector("#largewowcontainer")
const rainbowWowContainer = document.querySelector("#rainbowwowcontainer")
const dogePrimeContainer = document.querySelector("#dogeprimecontainer")
const secretWowContainer = document.querySelector("#secretwowcontainer")
const fibowowcontainer = document.querySelector("#fibowowcontainer")

const largewowEl = document.querySelector("#largeWows")
const lengthEl = document.querySelector("#length")
const rainbowsEl = document.querySelector("#rainbow")
const dogePrimeEl = document.querySelector("#dogeprime")
const secretWowEl = document.querySelector("#secretwow")
const fiboWowEl = document.querySelector("#fibo")

let wows = 0
let largewows = 0
let rainbowwows = 0
let secretwows = 0
let minidoges = 0
const primeWows = []

let fibonacciChallengeStarted = false
let fibonacciChallengeComplete = false
const fibonacciWows = []
const fibonacciSecretWows = []
let dogePrime = false

document.querySelector(".print").addEventListener("click", () => {
  if (fibonacciChallengeComplete) {
    document.querySelector(".head").style.display = "none"
    document.querySelector(".hatted").style.display = "block"
  }
  window.print()
})

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio > 0) {
        injectNeck(entry)
      }
    })
  },
  { rootMargin: "0px 0px 200% 0px" }
)

document.addEventListener("click", onBodyClick)

window.onscroll = function(ev) {
  if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
    const lastEl = document.querySelector(".neck:last-child")
    injectNeck({ target: lastEl })
  }
}

function injectNeck(entry) {
  // Stops observing the old neck element
  observer.unobserve(entry.target)

  const clonedNeck = neck.cloneNode(true)
  wrapper.appendChild(clonedNeck)
  observer.observe(clonedNeck)

  injectWow()
}

function injectWow() {
  wows++
  wowEl.innerText = wows

  const newWow = document.createElement("div")
  newWow.className = "textwow"
  return n > 0 && Math.sqrt(n) % 1 === 0
}

function isFibonacci(numberToCheck) {
  return (
    isSquare(5 * numberToCheck * numberToCheck + 4) ||
    isSquare(5 * numberToCheck * numberToCheck - 4)
  )
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}

function onBodyClick(e) {
  if (e.target.className === "textwow" && largewows >= 15) {
    rainbowwows++
    e.target.classList.add("rainbow")
    rainbowwowcontainer.classList.remove("hidden")
    rainbowsEl.innerText = rainbowwows

    // Check if they have achieved dogePrime
    dogePrimeContainer.classList.remove("hidden")
    let isPrime = primeWows.every((wowEl) => {
      return wowEl.classList.contains("rainbow")
    })

    // Activate doge prime
    if (dogePrime === false && isPrime === true) {
      dogePrime = true
      dogePrimeEl.innerText = "ACTIVE"
      setupSecretWows()
    }
  }

  if (e.target.className === "secretwow") {
    e.target.classList.add("found")
    secretwows++
    secretWowEl.innerText = secretwows

    if (secretwows === 100) {
      fibonacciChallengeStarted = true
      fibowowcontainer.classList.remove("hidden")
    }
  }

  if (fibonacciChallengeStarted) {
    if (
      e.target.classList.contains("textwow") ||
      e.target.classList.contains("secretwow")
    ) {
      if (e.target.classList.contains("spinLeft")) {
        e.target.classList.remove("spinLeft")
        e.target.classList.add("spinRight")
      } else if (e.target.classList.contains("spinRight")) {
        e.target.classList.remove("spinRight")
        e.target.classList.add("spinLeft")
      } else {
        e.target.classList.add("spinLeft")
      }

      checkAllFiboWows()
    }
  }
}

function checkAllFiboWows() {
  let successConfirmed = true

  let right = true
  for (let i = 0; i < fibonacciWows.length; i++) {
    if (fibonacciWows[i].classList.contains(right ? "spinRight" : "spinLeft")) {
      right = !right
    } else {
      successConfirmed = false
    }
  }

  right = false
  for (let i = 0; i < fibonacciSecretWows.length; i++) {
    if (
      fibonacciSecretWows[i].classList.contains(
        right ? "spinRight" : "spinLeft"
      )
    ) {
      right = !right
    } else {
      successConfirmed = false
    }
  }

  if (successConfirmed) {
    fibonacciChallengeComplete = true
    fibo.innerText = "COMPLETE"
  }
}

function setupSecretWows() {
  secretWowContainer.classList.remove("hidden")

  const allnecks = document.querySelectorAll(".neck")
  let allnecksAsArray = Array.apply(null, allnecks)
  allnecksAsArray.shift() // remove first item

  shuffleArray(allnecksAsArray)
  shuffleArray(allnecksAsArray)

  // Do this for first 100 shuffled neck pieces
  let total = 100

  for (let i = 0; i < total; i++) {
    let neckItem = allnecksAsArray[i]
    let pieces = neckItem.innerText.split("\n")
    const pieceIndex = Math.floor(Math.random() * (pieces.length - 1))
    const injectionIndex = 5 + Math.floor(Math.random() * 18)
    pieces[pieceIndex] =
      pieces[pieceIndex].slice(0, injectionIndex) +
      '<span class="secretwow">WOW</span>' +
      pieces[pieceIndex].slice(injectionIndex + 3)
    neckItem.innerHTML = pieces.join("\n")
  }

  const allSecretwows = document.querySelectorAll(".secretwow")
  const secretWowsAsArray = Array.apply(null, allSecretwows)
  for (let i = 0; i < secretWowsAsArray.length; i++) {
    if (isFibonacci(i)) {
      fibonacciSecretWows.push(secretWowsAsArray[i])
    }
  }
}

observer.observe(neck)
