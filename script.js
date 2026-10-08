let bird = document.querySelector('.bird')
let game = document.querySelector('.game')

let gravity = 2
let birdTop = 200
let isGameOver = false

// Bird movement
setInterval(() => {

    if (isGameOver) return

    birdTop += gravity
    bird.style.top = `${birdTop}px`

    if (birdTop > game.clientHeight || birdTop < 0) {
        gameOver()
    }

},15)


// Bird jump
document.addEventListener('keydown', (event) => {

    if (event.code === 'Space') {

        if (isGameOver) return

        birdTop -= 50
    }

})


// Create pipe
const createPipe = () => {

    if (isGameOver) return

    const topPipe = document.createElement('div')
    const bottomPipe = document.createElement('div')

    topPipe.classList.add('pipe')
    bottomPipe.classList.add('pipe')

    const gap = 150

    let pipeLeft = game.clientWidth

    const gameHeight = game.clientHeight

    // Minimum and maximum top pipe height
    const minHeight = 50
    const maxHeight = gameHeight - gap - 50

    const topPipeHeight =
        Math.random() * (maxHeight - minHeight) + minHeight

    // Remaining height after gap
    const bottomPipeHeight =
        gameHeight - topPipeHeight - gap


    topPipe.style.height = `${topPipeHeight}px`
    bottomPipe.style.height = `${bottomPipeHeight}px`

    topPipe.style.top = '0'
    bottomPipe.style.bottom = '0'

    topPipe.style.left = `${pipeLeft}px`
    bottomPipe.style.left = `${pipeLeft}px`

    game.append(topPipe, bottomPipe)


    // Move pipe
    let move = setInterval(() => {

        if (isGameOver) {
            clearInterval(move)
            return
        }

        pipeLeft -= 2

        topPipe.style.left = `${pipeLeft}px`
        bottomPipe.style.left = `${pipeLeft}px`


        // Remove pipe
        if (pipeLeft < -50) {

            topPipe.remove()
            bottomPipe.remove()

            clearInterval(move)

            return
        }


        // Collision detection
        let birdRect = bird.getBoundingClientRect()
        let topRect = topPipe.getBoundingClientRect()
        let bottomRect = bottomPipe.getBoundingClientRect()


        const horizontalCollision =
            topRect.left < birdRect.right &&
            topRect.right > birdRect.left


        const verticalCollision =
            birdRect.top < topRect.bottom ||
            birdRect.bottom > bottomRect.top


        if (horizontalCollision && verticalCollision) {

            gameOver()

            clearInterval(move)
        }

    }, 20)
}


// Create pipes every 2 seconds
setInterval(createPipe, 2000)


// Game Over
function gameOver() {

    if (isGameOver) return

    isGameOver = true

    alert("Game Over!")

    location.reload()
}


// First pipe
createPipe()