window.shootConfetti = () => {
  function randomInRange(min, max) {
    return Math.random() * (max - min) + min
  }

  const defaults = {
    spread: 360,
    ticks: 0,
    gravity: 3,
    decay: 0.9,
    startVelocity: 30,
  }

  function shoot() {
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
      origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 },
    })

    confetti({
      ...defaults,
      particleCount: 25,
      scalar: 2.75,
      shapes: ['emoji'],
      shapeOptions: {
        emoji: {
          value: ['♦️', '♥️', '♠️', '♣️'],
        },
      },
      origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 },
    })
  }

  setTimeout(shoot, 0)
  setTimeout(shoot, 100)
  setTimeout(shoot, 200)
  setTimeout(shoot, 300)
  setTimeout(shoot, 400)
}
