import axios from 'axios'
import {useState, useEffect} from 'react'

const baseUrl = 'https://restcountries.com/v3.1/name/'
const baseUrlEnd = '?fullText=true';
// export const useCountry = (XXX) => {
//   const [country, setCountry] = useState('')
// }

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    axios.get(baseUrl + name + baseUrlEnd).then(response => {
      console.log('response :>> ', response);
      console.log('response.data[0].name :>> ', response.data[0].name);
      setCountry({
        found: true,
        data: {
          name: response.data[0].name.common,
          capital: response.data[0].capital,
          population: response.data[0].population,
          flag: response.data[0].flags.png,
        }

      });

    }, noCountry => {
      setCountry({
        found: false,
      })
    })

  }, [name])
  return country;
}