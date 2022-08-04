const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect (0, 0, canvas.width, canvas.height)

const gravity = 0.7

const background = new Sprite ({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: './img/background.png'
})

const pulo = new Audio();
pulo.src = './sons/pulo.wav'

const ataque = new Audio();
ataque.src ='./sons/ataque.wav'

const hit = new Audio();
hit.src = './sons/hit.wav'

const morte = new Audio();
morte.src= './sons/morte.wav'





const shop = new Sprite ({
    position: {
        x: 575,
        y: 162
    },
    imageSrc: './img/shop.png',
    scale: 2.75,
    framesMax: 6
})

const player = new Fighter({
    position: {
    x: 0,
    y: 0
},
velocity: {
    x: 0,
    y: 0
}, 
offset: {
    x:0 ,
    y:0
},
imageSrc: './img/kenji/Idle.png',
framesMax: 8,
scale: 2.5,
offset: {
    x: 215,
    y: 140
},
    sprites: {
        idle: {
            imageSrc:'./img/kenji/Idle.png',
            framesMax: 8
        },
        run: {
            imageSrc:'./img/kenji/Run.png',
            framesMax:8
        },
        jump: {
            imageSrc:'./img/kenji/Jump.png',
            framesMax:2
        },
        fall: {
            imageSrc:'./img/kenji/Fall.png',
            framesMax:2
        },attack1:{
        imageSrc:'./img/kenji/Attack1.png',
            framesMax:6
        },
        takeHit:{
            imageSrc:'./img/kenji/Take Hit - white silhouette.png',
                framesMax:4},
                death:{
                    imageSrc:'./img/kenji/Death.png',
                        framesMax:6}
    },
    attackBox: {
        offset: {
            x:100,
            y:50
        },
        width: 160,
        height: 50
    }

})


const enemy = new Fighter({
    position: {
    x: 400,
    y: 140
},
velocity: {
    x: 0,
    y: 0
},
offset: {
    x: -50,
    y:0
},
color: 'blue',
imageSrc: './img/mack/Idle.png',
framesMax: 8,
scale: 2.5,
offset: {
    x: 215,
    y:155
},
    sprites: {
        idle: {
            imageSrc:'./img/mack/Idle.png',
            framesMax: 4
        },
        run: {
            imageSrc:'./img/mack/Run.png',
            framesMax:8
        },
        jump: {
            imageSrc:'./img/mack/Jump.png',
            framesMax:2
        },
        fall: {
            imageSrc:'./img/mack/Fall.png',
            framesMax:2
        },attack1:{
        imageSrc:'./img/mack/Attack1.png',
            framesMax:4
        },
        takeHit: {
            imageSrc: './img/mack/Take hit.png',
            framesMax: 3
        },
        death: {
            imageSrc: './img/mack/Death.png',
            framesMax: 7}
    },
    attackBox: {
        offset: {
            x: -170,
            y: 50
        },
        width: 170,
        height: 50
    }
}


   
        
)




console.log(player)

const keys = {
    a: {
        pressed: false
    },

    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    }
   
}

decreaseTimer()

function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    background.update()
    shop.update()
    c.fillStyle = 'rgba(255, 255, 255, 0.05)'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    enemy.update()

    player.velocity.x = 0
    enemy.velocity.x = 0
    
    // movimentos do player
    

    if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -5
        player.switchSprite('run')}
  
        else if (keys.d.pressed && player.lastKey === 'd') {
            player.velocity.x = 5
            player.switchSprite('run')
    } else {
        player.switchSprite('idle')
    }
    // pulo
    if(player.velocity.y <0){
        player.switchSprite('jump')
    } else if (player.velocity.y > 0) {
        player.switchSprite('fall')
    }



// movimentos do inimigo
if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
    enemy.velocity.x = -5
    enemy.switchSprite('run')}
    else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 5
        enemy.switchSprite('run')
    } else {
        enemy.switchSprite('idle')
    }

     // pulo
     if(enemy.velocity.y <0){
        enemy.switchSprite('jump')
    } else if (enemy.velocity.y > 0) {
        enemy.switchSprite('fall')
    }

    // colisao e rits do player
    if ( rectangularCollision ({
        rectangle1: enemy,
        recntangle2: player
    }) &&
        enemy.isAttacking && enemy.frameCurrent === 2
        ) 
        { player.takeHit()
            enemy.isAttacking = false
        gsap.to('#playerHealth', {
            width: player.health + '%'
        })
    }

     // erros do inimigo
     if(enemy.isAttacking && enemy.frameCurrent === 2) {
        enemy.isAttacking = false
    }

    //rit inimigo
    if ( rectangularCollision ({
        rectangle1: player,
        recntangle2: enemy
    }) &&
        player.isAttacking && player.frameCurrent === 4) 
        {   enemy.takeHit()
             player.isAttacking = false
    gsap.to('#enemyHealth', {
        width: enemy.health + '%'
    })
    }
    // erros do jogador
    if(player.isAttacking && player.frameCurrent === 4) {
        
        player.isAttacking = false
    }

   



    // final de jogo
    if (enemy.health <= 0 || player.health <= 0) {
        determineWinner({player,enemy, timerId})
    }
}





animate()

window.addEventListener('keydown', (event) => { 
    if (!player.dead, timer > 0) {

    switch (event.key) {
        // controle do player
        case 'd': 
        keys.d.pressed = true
        player.lastKey = 'd'
        break
        case 'a': 
        keys.a.pressed = true
        player.lastKey = 'a'
        break
        case 'w': 
        player.velocity.y = -20
        break
        case 'c':
            player.attack()
        break
    }
    

        //controles do inimigo
        
  
    }
    if (!enemy.dead, timer > 0) {
    switch(event.key) {
        case 'ArrowRight': 
        keys.ArrowRight.pressed = true
        enemy.lastKey = 'ArrowRight'
        break
        case 'ArrowLeft': 
        keys.ArrowLeft.pressed = true
        enemy.lastKey = 'ArrowLeft'
        break
        case 'ArrowUp': 
        enemy.velocity.y = -20
        break
        case '5':
            enemy.attack()
            break
    }
    }

})

window.addEventListener('keyup', (event) => { 
    switch (event.key) {
        case 'd': 
        keys.d.pressed = false
        break
        case 'a': 
        keys.a.pressed = false
        break
        case 'w': 
        keys.w.pressed = false
        
        break
        
    }
    
    //contorles do inimigo
    switch (event.key) {
        case 'ArrowRight': 
        keys.ArrowRight.pressed = false
        break
        case 'ArrowLeft': 
        keys.ArrowLeft.pressed = false
        break
        case 'ArrowUp': 
        keys.ArrowUp.pressed = false
        break
      
    }
   

})