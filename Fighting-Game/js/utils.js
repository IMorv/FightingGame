const musica = new Audio();
musica.src = './sons/musica2.wav'
function rectangularCollision({
    rectangle1,
    recntangle2
}) {
    return (
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >= recntangle2.position.x && 
        rectangle1.attackBox.position.x <= recntangle2.position.x + recntangle2.width && 
        rectangle1.attackBox.position.y +rectangle1.attackBox.height >= recntangle2.position.y && 
        rectangle1.attackBox.position.y <= recntangle2.position.y + recntangle2.height
    )
}

function determineWinner({player, enemy, timerId}){
    clearTimeout(timerId)
    document.querySelector('#displayText').style.display = 'flex'
    if (player.health === enemy.health) {
    document.querySelector('#displayText').innerHTML = 'Acabou o tempo!'
} else if (player.health > enemy.health) {
document.querySelector('#displayText').innerHTML = 'Vitoria do P1!'
} else if (player.health < enemy.health) {
    document.querySelector('#displayText').innerHTML = 'Vitoria do P2!'}
}

let timer = 60
let timerId
function decreaseTimer() {
   
    if (timer > 0) {
        
        
        timerId = setTimeout(decreaseTimer, 1000)
    timer--
    document.querySelector('#timer').innerHTML = timer
    musica.play()
    }
    if (timer ===0) {
        musica.pause()
        
        
        determineWinner({player, enemy, timerId})
        

    }
  
}