const scoreMap = [
  { value: -15, name: 'Lost Chicago' },
  { value: 0, name: '' },
  { value: 1, name: 'One Pair' },
  { value: 2, name: 'Two Pair' },
  { value: 3, name: 'Three of a Kind' },
  { value: 4, name: 'Straight' },
  { value: 5, name: 'Flush / Dance' },
  { value: 6, name: 'Full House' },
  { value: 7, name: 'Four of a Kind' },
  { value: 8, name: 'Straight Flush' },
  { value: 15, name: 'Chicago' },
  { value: 20, name: 'Royal Flush' },
]

function getScoreMapItem(value) {
  return scoreMap.find(item => item.value === value)
}

window.utils = {
  scoreMap,
  getScoreMapItem
}