import './App.css';
import { HiSwitchHorizontal } from 'react-icons/hi';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const [number, setNumber] = useState(0)
  const [info, setInfo] = useState([])
  const [from, setFrom] = useState("usd")
  const [to, setTo] = useState("inr")
  const [options, setOptions] = useState([])
  const [output, setOutput] = useState(0);

  useEffect(() => {
    axios.get(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}.json`)
    .then(response => {
      setInfo(response.data[from])
    })
    .catch(err=>console.log(err))
    
  }, [from]);

  useEffect(() => {
    setOptions(Object.keys(info))
    convert();
  }, [info]);

  function convert() {
    var rate = info[to];
    setOutput(number * rate);
  }

  function flip() {
    var temp = from;
    setFrom(to);
    setTo(temp);
  }

  return (
    <div className="App">
      <h1>Currency Converter</h1>
      <div className='form'>
        <div className='currencyContainer'>
          <div className='left'>
            <label>Amount</label>
            <input type="number" onChange={(e)=> setNumber(e.target.value)} placeholder="Enter the Amount"/>
          </div>
          <div className='from'>
            <label>From</label>
            <select value={from} onChange={(e) => {setFrom(e.target.value)}}  >
              {
                options.map((option) => (
                  <option>{option}</option>
                  ))
              }
            </select>
          </div>
          <div className="switch">
            <HiSwitchHorizontal size="30px" className='switchIcon' onClick={() => {flip()}}/>
          </div>
          <div className='to'>
            <label>To</label>
            <select onChange={(e) => {setTo(e.target.value)}} value={to}>
              {
                options.map((option) => (
                  <option>{option}</option>
                  ))
              }
            </select>
          </div>
        </div>
        <div className='buttonSection'>
          <button className='convertButton'>Convert</button>
        </div>
        <div className='convertedSec'>
          <h3>Converted Amount</h3>
          <p>{number+" "+from+" = "+output.toFixed(2) + " " + to}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
