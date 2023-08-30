import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {DiaryEntry} from '../../backend/src/types';
import AddNewEntryForm from './components/AddNewEntryForm';
import DiaryEntries from './components/DiaryEntries';
import ErrorMessage from './components/ErrorMessage';

function App() {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get<DiaryEntry[]>('http://localhost:3001/api/diaries').then(response => {
      setDiaryEntries(response.data)
    })
  }, []);

  useEffect(() => {
    console.log('error :>> ', error);
  }, [error]);
  
  return (
    <div className="App">
      <ErrorMessage setErrorMessage={setError} error={error}/>
      <AddNewEntryForm setErrorMessage={setError}/>
      <DiaryEntries diaryEntries={diaryEntries}/>

    </div>
  );
}

export default App;
