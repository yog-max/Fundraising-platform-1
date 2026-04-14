exports.generateRandomWord = () => {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const maxLength = 10;
  let randomWord = "";

  for (let i = 0; i < maxLength; i++) {
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    randomWord += alphabet[randomIndex];
  }

  return randomWord;
};
