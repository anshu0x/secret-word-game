// CSS
import './App.css';

// React
import { useCallback, useEffect, useState } from 'react';

// Data
import { wordsList } from './data/words';

// Components
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" }
]

function App() {

  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(3);
  const [score, setScore] = useState(0);


  const pickWordAndCategory = () => {

    // pick a random category
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * categories.length)];

    // pick a random word
    const pickedWords = words[category];
    const word = pickedWords[Math.floor(Math.random() * pickedWords.length)];

    // cheating, show in console what is the category and word
    // console.log(`Categoria: ${category}, Palavra: ${pickedWord}`);

    return { word, category };
  }

  // starts the secret word game
  const startGame = () => {

    // pick word and pick category
    const { word, category } = pickWordAndCategory();

    // create an array of letters
    let wordLetters = word.split("");

    wordLetters = wordLetters.map((l) => l.toUpperCase())


    // fill states
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);

    console.log(word)



    // change the game stage
    setGameStage(stages[1].name);
  }

  // proccess the letter input
  const verifyLetter = (letter) => {


    const normalizedLetter = letter.toUpperCase();
    if (guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)) return;

    if (pickedWord.toUpperCase().includes(normalizedLetter)) {
      setGuessedLetters((guessed) => [...guessed, normalizedLetter]);
    } else {
      setWrongLetters((wrong)=>[...wrong, normalizedLetter]);
      setGuesses((g) => g - 1);
    }

    if (guesses <= 1)
      setGameStage(stages[2].name);

  }

  // restarts the game
  const retry = () => {

    setPickedCategory("");
    setPickedWord("");
    setGuesses(3);
    setGuessedLetters([]);
    setWrongLetters([]);
    setScore(0);


    startGame();
  }

  return (
    <div className="App">
      {gameStage === 'start' && <StartScreen startGame={startGame} />}
      {gameStage === 'game' &&
        <Game
          verifyLetter={verifyLetter}
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />}
      {gameStage === 'end' && <GameOver retry={retry} />}
    </div>
  );

}

export default App;
