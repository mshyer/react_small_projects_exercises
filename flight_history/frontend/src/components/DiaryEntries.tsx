import React from "react";
import {DiaryEntry} from '../../../backend/src/types';

interface DiaryEntriesProps {
  diaryEntries: DiaryEntry[];
}

const DiaryEntries = (props: DiaryEntriesProps) => {
  const DiaryEntriesStyle = {
    fontSize: 16,
    padding: 0,
    paddingLeft: 30,
    margin: 0,
    lineHeight: 0.5
  }
  const keys = [0];
  const randKey = function(): number {
    return keys.push(Math.max(...keys) + 1);
  }
  return (
    <ul style={DiaryEntriesStyle}>
      <h1>Ship Captain's Log</h1>
      {props.diaryEntries.map(entry => {
        return <li key={randKey()}>
          <p><strong>Date: {entry.date}</strong></p>
          <p>Visibility: {entry.visibility}</p>
          <p>Weather: {entry.weather}</p>
        </li>
      })}
    </ul>
  )
};

export default DiaryEntries;