import { useState } from "react"

import Input from "./Input"
import Options from "./Options"
import Output from "./Output"

const PvmCalculator = () => {
 
    const [withPVM, setWithPVM] = useState('')
    const [withoutPVM, setWithoutPVM] = useState('')
    const [PVM, setPVM] = useState('21')
  
    const handleWithPVM = (e) => {
      setWithPVM(e.target.value)
    }
    const handleWithoutPVM = (e) => {
      setWithoutPVM(e.target.value)
    }
    const handlePVM = (e) => {
      setPVM(e.target.value)
    }
  
    return (
      <div className='wrapper'>
        <main>
  
          <h1>PVM skaičiuotuvas</h1>
  
          <div style={withoutPVM !== '' ? { pointerEvents: 'none', opacity: '0.4' } : {}}>
            <Input
              name='Suma su PVM'
              value={withPVM}
              onChange={handleWithPVM}
            />
          </div>
          <div style={withPVM !== '' ? { pointerEvents: 'mone', opacity: '0.4' } : {}}>
            <Input
              name='Suma be PVM'
              value={withoutPVM}
              onChange={handleWithoutPVM}
  
            />
          </div>
          <div>
            <Options
              value={PVM}
              onChange={handlePVM}
            />
          </div>
          <div>
            <Output
              withoutPVM={withoutPVM ? withoutPVM : (withPVM - (withPVM / ((+PVM + 100) / PVM))).toFixed(2)}
              withPVM={withPVM ? withPVM : (+withoutPVM + withoutPVM / 100 * PVM).toFixed(2)}
              PVM={withPVM ? (withPVM / ((+PVM + 100) / PVM)).toFixed(2) : (+withoutPVM / 100 * PVM).toFixed(2)}
            />
          </div>
        </main>
      </div>
    )
}

export default PvmCalculator
