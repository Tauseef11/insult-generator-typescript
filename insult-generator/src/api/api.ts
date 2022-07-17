export const getInsult = async () => {
    const response = await fetch('https://insult.mattbas.org/api/insult');
    const data = response.text();
    return data;
  };
  