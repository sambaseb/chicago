window.shootConfetti = () => {
  function randomInRange(min, max) {
    return Math.random() * (max - min) + min
  }

  const defaults = {
    spread: 160,
    ticks: 0,
    gravity: 3,
    decay: 0.9,
    startVelocity: 30,
  }

  function shoot(idx) {
    confetti({
      ...defaults,
      particleCount: 25,
      scalar: 6,
      shapes: ['emoji'],
      shapeOptions: {
        emoji: {
          value: ['🃏'],
        },
      },
      origin: { x: idx % 2 === 0 ? 1 : 0, y: 1 - idx / 5 },
    })

    confetti({
      ...defaults,
      particleCount: 25,
      scalar: 3,
      shapes: ['emoji'],
      shapeOptions: {
        emoji: {
          value: ['♦️', '♥️', '♠️', '♣️'],
        },
      },
      origin: { x: idx % 2 === 0 ? 0 : 1, y: 1 - idx / 5 },
    })
  }

  setTimeout(() => shoot(0), 0)
  setTimeout(() => shoot(1), 100)
  setTimeout(() => shoot(2), 200)
  setTimeout(() => shoot(3), 300)
  setTimeout(() => shoot(4), 400)
}
