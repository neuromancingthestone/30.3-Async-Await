let $numDiv = $('#num');
let $cardDiv = $('#card-box')
const $drawBtn = $('#drawBtn')
const $cardImg = $('#cardImg')

// 1 ////////////////////////////////
async function favNumber(num) {
  let baseUrl = `http://numbersapi.com/${num}`
  let p1 = await axios.get(baseUrl)
  console.log(p1.data)
}
favNumber(42);

// // 2 ////////////////////////////////
async function getFourFacts() {
  let baseUrl = `http://numbersapi.com/1..4`;
  let res = await axios.get(baseUrl);
  let facts = Object.values(res.data);
  $numDiv.append("<ul>")
  for(let fact of facts) {
    $numDiv.append(`<li>${fact}</li>`)
  }
  $numDiv.append("</ul>")
}

getFourFacts();

// // 3 ////////////////////////////////
async function getCard() {

  let res = await axios.get("https://deckofcardsapi.com/api/deck/new/draw/?count=1");
  console.log(`${res.data.cards[0].value} of ${res.data.cards[0].suit}`);
}

getCard();

// // 4 ////////////////////////////////
async function getTwoCards() {
  let res = await axios.get("https://deckofcardsapi.com/api/deck/new/draw/");
  let deckId = res.data.deck_id;  
  let card1 = res.data.cards[0];
  res = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/`);
  let card2 = res.data.cards[0];
  console.log(`Card 1: ${card1.value} of ${card1.suit}\n`);
  console.log(`Card 2: ${card2.value} of ${card2.suit}\n`);
}

getTwoCards();

// // 5 ///////////////////////////////
async function drawCards() {
//  console.log(deckId)
  let res = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
  let deckId = res.data.deck_id;
  
  $drawBtn.on('click', async function(e) {
    let res = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
    let angle = Math.random() * 90 - 45;
    let randomX = Math.random() * 40 - 20;
    let randomY = Math.random() * 40 - 20;    
    $cardDiv.append(
      $('<img>', {
        src: res.data.cards[0].image,
        css: {
          transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
        }        
      })
    );

    if (res.data.remaining === 0) $drawBtn.remove();
  });
}

drawCards();