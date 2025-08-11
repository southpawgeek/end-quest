import { useState } from "react"
import useSound from "use-sound"
import soundBoop from "../sounds/boop.wav"
import soundExit from "../sounds/exit.wav"
import soundMove from "../sounds/move.wav"
import soundDead from "../sounds/dead.wav"

/**
 * Custom hook for managing game sound effects
 */
export const useGameSounds = () => {
  const [playbackRate, setPlaybackRate] = useState(Math.random() * (2 - 1) + 1)
  
  const [boop] = useSound(soundBoop)
  const [cancelBoop] = useSound(soundBoop, { playbackRate: 0.5 })
  const [done] = useSound(soundExit)
  const [move] = useSound(soundMove, { playbackRate })
  const [dead] = useSound(soundDead, { playbackRate })

  const playBoop = () => {
    boop()
  }

  const playCancelBoop = () => {
    cancelBoop()
  }

  const playDone = () => {
    done()
  }

  const playMove = () => {
    move()
    setPlaybackRate(Math.random() * (2 - 1) + 1)
  }

  const playDead = () => {
    dead()
    // Have a little fun with death sounds :)
    setPlaybackRate(Math.random() * (1.3 - 0.7) + 0.7)
  }

  const playMoveWithVariation = () => {
    move()
    setPlaybackRate(Math.random() * (1.3 - 0.7) + 0.7)
  }

  return {
    playBoop,
    playCancelBoop,
    playDone,
    playMove,
    playDead,
    playMoveWithVariation
  }
}
