export function emojiFor(name: string) {
  switch (name.toLowerCase()) {
    case 'rock':
      return '🪨';
    case 'paper':
      return '📄';
    case 'scissors':
      return '✂️';
    case 'lizard':
      return '🦎';
    case 'spock':
      return '🖖';
    default:
      return '🎲';
  }
}
