import { useState, useEffect } from 'react';
import { SearchButton } from './SearchButton';

export const UserName = () => {
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
      <SearchButton
        userName={userName}
        isDisabled={isDisabled}
        setIsDisabled={setIsDisabled}
        eventValue={eventValue}
        setEventValue={setEventValue}
      />
    </div>
  );
};
