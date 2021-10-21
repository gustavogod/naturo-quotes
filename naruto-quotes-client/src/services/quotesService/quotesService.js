//Quando der o fetch, vai retornar um json, que é então transformado em um javaScript
export const getQuote = () => 
  fetch(process.env.REACT_APP_API).
    then(response => response.json());