let board = document.getElementById('board');
const combinations = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9];
let matchedCards = [];
let flippedCards = [];
// let canFlip = true;


initGame();
function initGame(){
    combinations.sort(() => Math.random() - 0.5);
    combinations.forEach((c) => {
        let card = createCard(c);
        board.appendChild(card);

    })
}
function createCard(number){
    let card = document.createElement('div');
    card.dataset.number = number;
    card.textContent = '?';
    card.classList.add('card');
    card.addEventListener('click', handleClick);
    return card;
}
function handleClick(){
    if(/*!canFlip ||*/flippedCards.length >= 2 || this.classList.contains('flipped') || matchedCards.includes(this)) 
        return;
    this.classList.add('flipped');
    this.textContent = this.dataset.number;
    flippedCards.push(this);
    if(flippedCards.length == 2) 
        checkMatch();
}
function checkMatch(){
    // canFlip = false;
    // setTimeout(() => {
        const[card1, card2] = flippedCards;
        if(card1.dataset.number === card2.dataset.number){
            card1.textContent = '✔️';
            card2.textContent = '✔️';
            matchedCards.push(card1, card2);
            if(matchedCards.length == combinations.length)
                setTimeout(() => {
                    alert("congratulations You Won...");
                    resetGame();
                },100)
                
        }
        else{
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                card1.textContent = '?';
                card2.textContent = '?';
            }, 500)
        }
        flippedCards = [];
        // canFlip = true;
// }, 1000)
}
function resetGame(){
    matchedCards = [];
    flippedCards = [];
    board.innerHTML = '';
    initGame();
}