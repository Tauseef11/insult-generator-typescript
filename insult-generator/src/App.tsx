import React, { useState, useEffect } from 'react';
import './App.css';

const getResponse = async () => {
  const response = await fetch('https://insult.mattbas.org/api/insult');
  const data = response.text();
  return data;
};

type AppProps = {
  isDisabled: boolean;
  setIsDisabled: any;
  userName: string;
  eventValue: string;
  setEventValue: any;
};

const SearchButton = ({ userName, isDisabled, setIsDisabled, eventValue, setEventValue }: AppProps) => {
  const [text, setText] = useState('');
  const handleOnClick = () => {
    getResponse().then((insult) => {
      setText(insult);
    });
  };
  
  const handleClearOnClick = () => {
    setText('');
    setEventValue(eventValue ? '' : '');
    setIsDisabled(true);
  }
 
  const output = text && userName ? `${userName}, ${text}` : '';
  const loadButtonLabel = 'Load Insult';
  const clearButtonLabel = 'Clear';

  return (
    <div>
      <button onClick={handleOnClick} disabled={isDisabled}>
        {loadButtonLabel}
      </button>
      {' '}
      <button onClick={handleClearOnClick} disabled={isDisabled}>
        {clearButtonLabel}
      </button>
      <p>{output}</p>
    </div>
  );
};

const UserName = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [userName, setUserName] = useState('');
  const [eventValue, setEventValue] = useState('');
  const [header, setHeader] = useState(<></>);
  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    setEventValue(e.currentTarget.value);
    if (!eventValue) {
      setIsDisabled(false);
    }
  };

  useEffect(() => {
    setUserName(eventValue);
    setHeader(
      eventValue ? (
        <h1>{`Insulting ${userName}...`}</h1>
      ) : (
        <h1>Who would you like to insult?</h1>
      )
    );
  }, [eventValue, userName]);

  return (
    <div>
      {header}
      <input onChange={handleOnChange}></input>
      <SearchButton userName={userName} isDisabled={isDisabled} setIsDisabled={setIsDisabled} eventValue={eventValue} setEventValue={setEventValue} />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <UserName />
    </div>
  );
}

export default App;
