import { useState } from "react"
import useSound from "use-sound"
import soundBoop from "../sounds/boop.wav"

const Wrapper = ({ children }) => {
  const [welcome, setShowWelcome] = useState(true)
  const [creditsOpen, setCreditsOpen] = useState(false)

  const [boop] = useSound(soundBoop)

  const acknowledge = () => {
    boop()
    setShowWelcome(false)
  }

  const openCredits = () => {
    boop()
    setCreditsOpen(true)
  }

  const closeCredits = () => {
    boop()
    setCreditsOpen(false)
  }

  return (
    <div id='wrapper'>
      {welcome ? (
        <div id='welcome'>
          <p>
            It's 1993 and you just finished installing a weird floppy disk on
            your parents' i386. You're sure they won't mind. The label reads
            "End Quest", and promises you "minutes of point and click fun!"
          </p>
          <hr />
          <div id='welcome-button'>
            <button onClick={acknowledge}>[OK, whatever]</button>
          </div>
        </div>
      ) : (
        children
      )}
      <div id='footer'>
        &copy;2024{" "}
        <a
          href='https://southpawgeek.com'
          target='_blank'
          rel='noopener'
        >
          Jen Guerra
        </a>
        &nbsp;&mdash;&nbsp;
        {creditsOpen && (
          <div id='credits-modal'>
            <div id='credits'>
              <h1>Credits</h1>
              <ul>
                <li>
                  Project created with{" "}
                  <a
                    href='https://vite.dev/'
                    target='_blank'
                    rel='noopener'
                  >
                    Vite
                  </a>
                </li>
                <li>
                  Graphics created with{" "}
                  <a
                    href='https://pyxeledit.com/'
                    target='_blank'
                    rel='noopener'
                  >
                    PyxelEdit
                  </a>
                </li>
                <li>
                  SFX created with{" "}
                  <a
                    href='https://sfbgames.itch.io/chiptone'
                    target='_blank'
                    rel='noopener'
                  >
                    ChipTone
                  </a>
                </li>
                <li>
                  Font is{" "}
                  <a
                    href='https://velvetyne.fr/fonts/terminal-grotesque/'
                    target='_blank'
                    rel='noopener'
                  >
                    Terminal Grotesque
                  </a>
                </li>
                <li>
                  Text typing effect is{" "}
                  <a
                    href='https://www.npmjs.com/package/react-typed'
                    target='_blank'
                    rel='noopener'
                  >
                    react-typed by ssbeefeater
                  </a>
                </li>
                <li>
                  Sound effects hook is{" "}
                  <a
                    href='https://www.npmjs.com/package/use-sound'
                    target='_blank'
                    rel='noopener'
                  >
                    use-sound by joshwcomeau
                  </a>
                </li>
              </ul>
              <hr />
              <p>Fly free, Beebee.
                <br />
                June 2015 - October 4th, 2024
              </p>
              <div id='credits-button'>
                <button onClick={closeCredits}>[OK]</button>
              </div>
            </div>
          </div>
        )}
        <a href="#" onClick={openCredits}>Credits</a>
      </div>
    </div>
  )
}

export default Wrapper
