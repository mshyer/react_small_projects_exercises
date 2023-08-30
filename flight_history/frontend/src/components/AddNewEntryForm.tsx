import React, {ChangeEventHandler, useState} from 'react';
import axios from 'axios';
import { Weather, Visibility } from '../types'

const possibleWeather: string[] = Object.values(Weather)
const possibleVisibility = Object.values(Visibility)


interface AddEntryFormProps {
  setErrorMessage: Function,
}

interface WeatherRadioProps {
  possibleWeather: string[],
  handleUpdateWeather: ChangeEventHandler,
}
interface VisibilityRadioProps {
  possibleVisibility: string[],
  handleUpdateVisibility: ChangeEventHandler,
}

const WeatherRadio = (props: WeatherRadioProps) => {
  return (
    <label>Weather: 
      {props.possibleWeather.map(weather => {
        return (
          <label key={weather}>{weather}
             <input onChange={props.handleUpdateWeather} type="radio" name="weather"  value={weather}/>
        </label>
        )
      })}
    </label>
    
  )
}
const VisibilityRadio = (props: VisibilityRadioProps) => {
  return (
    <label>Visibility: 
      {props.possibleVisibility.map(visibility => {
        return (
          <label key={visibility}>{visibility} 
            <input onChange={props.handleUpdateVisibility} type="radio" name="visibility"  value={visibility}/>
          </label>
        )
        
      })}
    </label>
    
  )
}

const AddNewEntryForm = (props: AddEntryFormProps) => {
  const [date, setDate] = useState<string>('');
  const [visibility, setVisibility] = useState<string>('');
  const [weather, setWeather] = useState<string>('');
  const [comment, setComment] = useState<string>('');

  const hanleUpdateDate = function(event: React.SyntheticEvent) {
    const eventTarget: HTMLInputElement = event.target as HTMLInputElement;
    setDate(eventTarget.value);
  }
  const hanleUpdateVisibility = function(event: React.SyntheticEvent) {
    const eventTarget: HTMLInputElement = event.target as HTMLInputElement;
    setVisibility(eventTarget.value);
  }
  const hanleUpdateWeather = function(event: React.SyntheticEvent) {
    const eventTarget: HTMLInputElement = event.target as HTMLInputElement;
    setWeather(eventTarget.value);
  }
  const hanleUpdateComment = function(event: React.SyntheticEvent) {
    const eventTarget: HTMLInputElement = event.target as HTMLInputElement;
    setComment(eventTarget.value);
  }

  const handleSubmitNewDiary = (event: React.SyntheticEvent) => {
    event.preventDefault();
    console.log('Submitting form');


      axios.post('/api/diaries', {
        date,
        visibility,
        weather,
        comment
      }).then(response => {
        return response.data;
      }).catch((error: unknown) => {
        if (axios.isAxiosError(error)) {
          let errorMessage = 'error posting.'
          if (error.response) {
            errorMessage = error.response.data
          }
          props.setErrorMessage(errorMessage)
          console.log(error);
        }}
        );
    } 
  return (
    <form onSubmit={handleSubmitNewDiary}>
      <label>date
        <input onChange={hanleUpdateDate }id="date "name='date' type='text' />
      </label>
      <WeatherRadio possibleWeather={possibleWeather} handleUpdateWeather={hanleUpdateWeather}/>
      <VisibilityRadio possibleVisibility={possibleVisibility} handleUpdateVisibility={hanleUpdateVisibility}/>
      <label>comment
        <input onChange={hanleUpdateComment } id="comment" name='comment' type='text' />
      </label>
      <button type='submit'>add</button>
    </form>
  )
};

export default AddNewEntryForm;