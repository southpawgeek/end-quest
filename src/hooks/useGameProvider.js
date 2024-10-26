import { useContext } from "react"
import { GameContext } from "../components/GameProvider"

export const useGameProvider = () => useContext(GameContext)
