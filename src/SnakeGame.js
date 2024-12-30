// src/SnakeGame.js
import React, { useEffect, useState } from 'react';

const SnakeGame = () => {
  const [snake, setSnake] = useState([[0, 0]]);
  const [food, setFood] = useState([Math.floor(Math.random() * 20), Math.floor(Math.random() * 20)]);
  const [direction, setDirection] = useState([0, 1]);
  const [gameOver, setGameOver] = useState(false);
  const [speed, setSpeed] = useState(200);

  const moveSnake = () => {
    if (gameOver) return;

    const newSnake = [...snake];
    const head = newSnake[0];
    const newHead = [head[0] + direction[0], head[1] + direction[1]];

    // Check for collision with borders
    if (newHead[0] < 0 || newHead[0] >= 20 || newHead[1] < 0 || newHead[1] >= 20) {
      setGameOver(true);
      return;
    }

    // Check for collision with itself
    if (newSnake.some(segment => segment[0] === newHead[0] && segment[1] === newHead[1])) {
      setGameOver(true);
      return;
    }

    newSnake.unshift(newHead);

    // Check if snake has eaten the food
    if (newHead[0] === food[0] && newHead[1] === food[1]) {
      setFood([Math.floor(Math.random() * 20), Math.floor(Math.random() * 20)]);
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  };

  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowUp':
        if (direction[0] !== 1) setDirection([-1, 0]);
        break;
      case 'ArrowDown':
        if (direction[0] !== -1) setDirection([1, 0]);
        break;
      case 'ArrowLeft':
        if (direction[1] !== 1) setDirection([0, -1]);
        break;
      case 'ArrowRight':
        if (direction[1] !== -1) setDirection([0, 1]);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      moveSnake();
    }, speed);

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [snake, direction, gameOver]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-800">
      <h1 className="text-white text-2xl mb-4">Snake Game</h1>
      <div className="relative w-80 h-80 border border-green-500 bg-gray-900">
        {snake.map((segment, index) => (
          <div
            key={index}
            className="absolute bg-green-500"
            style={{
              top: `${segment[0] * 20}px`,
              left: `${segment[1] * 20}px`,
              width: '20px',
              height: '20px',
            }}
          />
        ))}
        <div className="absolute bg-red-500"
          style={{
            top: `${food[0] * 20}px`,
            left: `${food[1] * 20}px`,
            width: '20px',
            height: '20px',
          }}
        />
      </div>
      {gameOver && <h2 className="text-red-500 text-xl mt-4">Game Over!</h2>}
    </div>
  );
};

export default SnakeGame;