export const mapStyles = {
  height: "100vh",
  width: "100%",
};

export const getNameCombination = (index: number) => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (index >= 0 && index <= 25) {
    const letter = alphabet[index];
    return letter;
  } else if (index >= 26) {
    const firstIndex = Math.floor((index - 26) / 26);
    const secondIndex = (index - 26) % 26;
    const firstLetter = alphabet[firstIndex];
    const secondLetter = alphabet[secondIndex];
    return `${firstLetter}${secondLetter}`;
  } else {
    return "A";
  }
};
