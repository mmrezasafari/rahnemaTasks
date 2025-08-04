import clsx from "clsx";
import type { Block } from "../interface/Block";

interface Props {
  apple: Block
  snake: Array<Block>
}

export default function PlayGround({ apple, snake }: Props) {
  const emptyArray = new Array(900).fill(0)

  return (
    <div className="h-screen flex justify-center items-center p-12">
      <div className="grid grid-cols-30 gap-0 p-0 rounded-sm">
        {
          emptyArray.map((_, index) => {
            const currentX = index % 30;
            const currentY = Math.floor(index / 30);

            return (
              <div key={index} className={clsx(
                ["bg-green-300 w-[25px] h-[25px] border border-white rounded-sm"],
                {
                  "bg-red-500": currentX === apple.x && currentY === apple.y,
                  "!bg-blue-400": snake.some(
                    (block) => block.x === currentX && block.y === currentY
                  ),
                  "!bg-blue-900": currentX === snake[0].x && currentY === snake[0].y,
                }
              )}>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
