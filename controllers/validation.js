exports.isValidEmail = (inputEmail) => {
  //Validates contact email
  const convertedEmailArr = inputEmail.split("");
  if (!convertedEmailArr.includes("@")) {
    return false
  } else {
    return true
  }
}


exports.isValidPhone = (numInput) => {
  // Validates contact number
  //   number must be in the form of: +1 (919) 797-2875
  //Returns 400 status if any given char in contact_number is not in the valid array of chars
  const validChars = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "+",
    "(",
    ")",
    " ",
    "-",
  ];
  let output = true;
  const convertedNumArr = numInput.split("");

  convertedNumArr.forEach((char) => {
    if (!validChars.includes(char)) {
      output = false
    }

  })
  return output

}


