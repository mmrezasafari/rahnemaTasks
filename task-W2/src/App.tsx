import { useEffect, useState } from 'react'
import PlayGround from './components/PlayGround'
import { gameOverPixels } from './assets/coordinates'
import type { Block, Direction } from './interface/Block'

function App() {
  const [direction, setDirection] = useState<Direction>("right")
  const [apple, setApple] = useState<Block>({ x: 10, y: 10 })
  const [snake, setSnake] = useState<Array<Block>>([{ x: 2, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 0 }])
  const [isGameOver, setIsGameOver] = useState<Boolean>(false)

  const addToSnakeLength = () => {
    setSnake((snake) => {
      const head = snake[0]
      if (head.x === apple.x && head.y === apple.y) {
        const newSnake = [...snake]
        newSnake.push({ x: snake[snake.length - 1].x, y: snake[snake.length - 1].y })
        changeAppleCordinates()
        return [...newSnake]
      } else {
        return snake
      }
    })
  }

  /**
   * change direction of apple and check no confilict with snake cordinate
   */
  const changeAppleCordinates = () => {
    let randomX = Math.ceil(Math.random() * (29 - 0) + 0)
    let randomY = Math.ceil(Math.random() * (29 - 0) + 0)

    if (snake.find(block => block.x === randomX && block.y === randomY)) {
      changeAppleCordinates()
    } else {
      setApple({ x: randomX, y: randomY })
    }
  }

  const checkGameOver = () => {
    const head = snake[0]
    const body = snake.slice(1)
    if (body.some(block => block.x === head.x && block.y === head.y)) {
      setIsGameOver(true)
      setSnake(gameOverPixels)
      setApple({ x: 2, y: 10 })
    }
  }

  useEffect(() => {
    if (isGameOver) {
      return;
    }

    const timer = setInterval(() => {
      setSnake((snake) => {
        const newSnake = [...snake]
        newSnake.pop()
        return newSnake
      })

      switch (direction) {
        case "up":
          setSnake((snake) => [{ x: snake[0].x, y: (snake[0].y - 1 + 30) % 30 }, ...snake])
          break;
        case "down":
          setSnake((snake) => [{ x: snake[0].x, y: (snake[0].y + 1) % 30 }, ...snake])
          break;
        case "left":
          setSnake((snake) => [{ x: (snake[0].x - 1 + 30) % 30, y: snake[0].y }, ...snake])
          break;
        case "right":
          setSnake((snake) => [{ x: (snake[0].x + 1) % 30, y: snake[0].y }, ...snake])
      }

      checkGameOver()
      addToSnakeLength()

    }, 5 * 100)

    return () => clearInterval(timer)
  })

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowUp":
          if (direction !== 'down') {
            setDirection("up")
          }
          break;
        case "ArrowDown":
          if (direction !== 'up') {
            setDirection("down")
          }
          break;
        case "ArrowLeft":
          if (direction !== 'right') {
            setDirection("left")
          }
          break;
        case "ArrowRight":
          if (direction !== 'left') {
            setDirection("right")
          }
          break;
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  })

  return (
    <>
      <PlayGround
        apple={apple}
        snake={snake}
      />
    </>
  )
}


export default App
