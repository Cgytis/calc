import CalcButton from "./CalcButton"
import Output from './Output'
import { useState, useEffect } from "react"

import { TiBackspaceOutline } from 'react-icons/ti'
import { FiDivide } from 'react-icons/fi'
import { FaSquareRootAlt } from 'react-icons/fa'

import './style.css'

import {
    NUMBER,
    DOT,
    EQUAL,
    OPERATOR,
    BACKSPACE,
    CLEAR,
    CLEARENTRY,
    PLUSMINUS,
    PERCENTAGE,
    FRACTION,
    SQR,
    SQUAREROOT
} from './CalculatorActionType'



const calcSings = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b
}

const calculation = (num1, operator, num2) => calcSings[operator](num1, num2)

var lastOutput = ''


const Calculator = () => {
    const [foolOutput, setFoolOutput] = useState('')
    const [tempOutput, setTempOutput] = useState('0')
    const [operator, setOperator] = useState('')
    const [sing, setSing] = useState('')
    const [actions, setActions] = useState([])
    let result = ''

    const regexEqual = /[=]/g
    const regexMinus = /[-]/g
    const regexDot = /[.]/g
    const regexOperators = /[÷x-]/g
    const searchEqual = foolOutput[foolOutput.search(regexEqual)]
    const searchMinus = tempOutput[tempOutput.search(regexMinus)]
    const searchDot = tempOutput[tempOutput.search(regexDot)]
    const searchOperators = foolOutput[foolOutput.search(regexOperators)]

    const handleAction = () => {

        const [action, lastAction] = actions
        const lastActions =
            foolOutput === ''
            || lastAction.type === SQR
            || lastAction.type === FRACTION
            || lastAction.type === SQUAREROOT
            || lastAction.type === PERCENTAGE
            || lastAction.type === EQUAL
        switch (action?.type) {
            case NUMBER:
                if (!searchEqual) {
                    setTempOutput(tempOutput === '0'
                        ? tempOutput.slice(0, -1) + action.payload.value
                        : lastAction?.type !== OPERATOR
                            ? tempOutput + action.payload.value
                            : action.payload.value, setOperator(lastAction?.payload?.operator))
                    setOperator(operator === '' ? lastAction?.payload?.operator : operator)
                } else if (lastAction.type === PERCENTAGE) {
                    setTempOutput(action.payload.value)
                    setFoolOutput('')
                } else if (lastAction.type === FRACTION) {
                    setTempOutput(action.payload.value)
                    setFoolOutput('')
                } else if (searchDot && lastAction.type === EQUAL) {
                    setTempOutput(action.payload.value)
                    setFoolOutput('')
                } else {
                    setTempOutput(searchDot
                        ? tempOutput + action.payload.value
                        : tempOutput !== '0'
                            ? tempOutput.slice(0, 0) + action.payload.value
                            : action.payload.value)
                    setFoolOutput('')
                }
                break;

            case OPERATOR:
                setOperator(action.payload.operator)
                setSing(action.payload.sing)
                lastOutput = tempOutput
                if (!searchEqual) {
                    foolOutput === '' && tempOutput === '0'
                        ? setTempOutput('0')
                        : lastAction.type !== DOT
                            ? setFoolOutput(
                                foolOutput === ''
                                    ? tempOutput + ' ' + action.payload.sing + ' '
                                    : lastAction.type !== OPERATOR
                                        ? result = calculation(+foolOutput.slice(0, -2), operator, +tempOutput).toString() + ' ' + action.payload.sing
                                        : tempOutput + ' ' + action.payload.sing)
                            : lastAction.type === DOT && foolOutput === ''
                                ? setFoolOutput(tempOutput.slice(0, -1) + ' ' + action.payload.sing)
                                : setFoolOutput(foolOutput,
                                    setTempOutput(result = calculation(+foolOutput.slice(0, -2),
                                        operator, +tempOutput).toString() + ' ' + action.payload.sing))

                    setTempOutput(foolOutput === '' && lastAction?.type === DOT
                        ? tempOutput.slice(0, -1)
                        : foolOutput === ''
                            ? tempOutput
                            : lastAction.type === OPERATOR
                                ? tempOutput
                                : result.slice(0, -1))
                } else {
                    setFoolOutput(tempOutput + ' ' + action.payload.sing)
                }
                break;

            case EQUAL:
                if (!searchEqual) {
                    setFoolOutput(foolOutput === ''
                        ? tempOutput + ' ='
                        : foolOutput !== ''
                            ? foolOutput + ' ' + tempOutput + ' ='
                            : '')
                    lastOutput = tempOutput
                    setTempOutput(operator === '/' && tempOutput === '0'
                        ? 'negalima dalyba iš nulio'
                        : foolOutput === ''
                            ? tempOutput
                            : result = calculation(+foolOutput.slice(0, -2), operator, +tempOutput).toString())
                } else if (foolOutput === '') {
                    setFoolOutput(tempOutput + ' ' + action.payload.sing)
                } else if (searchEqual && operator === '') {
                    setTempOutput(tempOutput)
                } else if (searchEqual && operator) {
                    result = calculation(+tempOutput, operator, +lastOutput)
                    setTempOutput(result.toString())
                    setFoolOutput(tempOutput + ' ' + sing + ' ' + lastOutput + ' =')
                }
                break;

            case CLEAR:
                setTempOutput('0')
                setFoolOutput('')
                setOperator('')
                setActions([])
                break;

            case CLEARENTRY:
                setTempOutput('0')
                break;

            case DOT:
                setTempOutput(!searchDot && lastAction.type !== EQUAL
                    ? tempOutput + action.payload.value
                    : lastAction.type === EQUAL
                        ? '0' + action.payload.value
                        : searchDot
                            ? tempOutput
                            : '')
                break;
            case BACKSPACE:
                setTempOutput(tempOutput.length !== 1 ? tempOutput.slice(0, -1) : '0')
                break;

            case PLUSMINUS:
                setTempOutput(searchMinus
                    ? tempOutput?.slice(1)
                    : action.payload.operator.concat(tempOutput)
                )
                break;

            case PERCENTAGE:
                if (searchOperators === 'x' || searchOperators === '÷') {
                    setFoolOutput(lastActions
                        ? ''
                        : lastAction.type === PERCENTAGE
                            ? foolOutput
                            : foolOutput + ' (' + tempOutput + '% ) = ' + tempOutput / 100)
                    setTempOutput(lastActions
                        ? '0'
                        : lastAction.type === PERCENTAGE
                            ? tempOutput
                            : result = calculation(+foolOutput.slice(0, -2), operator, tempOutput / 100).toString())
                } else {
                    setFoolOutput(lastActions
                        ? ''
                        : lastAction.type === PERCENTAGE
                            ? foolOutput
                            : foolOutput + ' (' + tempOutput + '% ) = ' + foolOutput.slice(0, -2) / 100 * tempOutput)
                    setTempOutput(lastActions
                        ? '0'
                        : lastAction.type === PERCENTAGE
                            ? tempOutput
                            : result = calculation(+foolOutput.slice(0, -2), operator, foolOutput.slice(0, -2) / 100 * tempOutput).toString())
                }
                break;

            case FRACTION:
                setFoolOutput(lastActions
                    ? '1/(' + tempOutput + ') = ' + 1 / tempOutput
                    : lastAction.type === FRACTION
                        ? foolOutput
                        : foolOutput + '1/(' + tempOutput + ') = ' + 1 / tempOutput)
                setTempOutput(lastActions
                    ? (1 / tempOutput).toString()
                    : lastAction.type === FRACTION
                        ? tempOutput
                        : result = calculation(foolOutput.slice(0, -2), operator, 1 / tempOutput).toString())
                break;

            case SQR:
                setFoolOutput(lastActions
                    ? 'sqr(' + tempOutput + ') ='
                    : lastAction.type === SQR
                        ? foolOutput
                        : foolOutput + 'sqr (' + tempOutput + ') = ' + tempOutput * tempOutput)
                setTempOutput(lastActions
                    ? (tempOutput * tempOutput).toString()
                    : lastAction.type === SQR
                        ? tempOutput
                        : result = calculation(+foolOutput.slice(0, -2), operator, tempOutput * tempOutput).toString())
                break;

            case SQUAREROOT:
                setFoolOutput(lastActions
                    ? '√(' + tempOutput + ') = ' + Math.sqrt(tempOutput)
                    : lastAction.type === SQUAREROOT
                        ? foolOutput
                        : foolOutput + '√ (' + tempOutput + ') = ' + Math.sqrt(tempOutput))
                setTempOutput(lastActions
                    ? Math.sqrt(tempOutput).toString()
                    : lastAction.type === SQUAREROOT
                        ? tempOutput
                        : result = calculation(+foolOutput.slice(0, -2), operator, Math.sqrt(tempOutput)).toString())
                break;
            default:
                break;
        }
    }

    useEffect(handleAction, [actions])

    return (
        <div className='wrapper'>
            <main>
                <div className='calculator-container'>
                    <div className='calculator'>
                        <div className='output'>
                            <Output foolOutput={foolOutput} tempOutput={tempOutput} />
                        </div>
                        <CalcButton color='grey' onClick={() => setActions([{ type: PERCENTAGE, payload: { sing: '%' } }, ...actions])}>%</CalcButton>
                        <CalcButton color='grey' onClick={() => setActions([{ type: CLEARENTRY }, ...actions])}>CE</CalcButton>
                        <CalcButton color='grey' onClick={() => setActions([{ type: CLEAR }, ...actions])}>C</CalcButton>
                        <CalcButton color='grey' onClick={() => setActions([{ type: BACKSPACE }, ...actions])}><TiBackspaceOutline /></CalcButton>
                        <CalcButton color='grey' onClick={() => setActions([{ type: FRACTION }, ...actions])}>&#8543;x</CalcButton>
                        <CalcButton color='grey' onClick={() => setActions([{ type: SQR }, ...actions])}>x²   </CalcButton>
                        <CalcButton color='grey' onClick={() => setActions([{ type: SQUAREROOT }, ...actions])}><FaSquareRootAlt /></CalcButton>
                        <CalcButton color='grey' onClick={() => setActions([{ type: OPERATOR, payload: { sing: '÷', operator: '/' } }, ...actions])}><FiDivide /></CalcButton>
                        <CalcButton color='black' onClick={() => setActions([{ type: NUMBER, payload: { value: '7' } }, ...actions])}>7</CalcButton>
                        <CalcButton color='black' onClick={() => setActions([{ type: NUMBER, payload: { value: '8' } }, ...actions])}>8</CalcButton>
                        <CalcButton color='black' onClick={() => setActions([{ type: NUMBER, payload: { value: '9' } }, ...actions])}>9</CalcButton>
                        <CalcButton color='grey' onClick={() => setActions([{ type: OPERATOR, payload: { sing: 'x', operator: '*' } }, ...actions])}>x</CalcButton>
                        <CalcButton color='black' onClick={() => setActions([{ type: NUMBER, payload: { value: '4' } }, ...actions])}>4</CalcButton>
                        <CalcButton color='black' onClick={() => setActions([{ type: NUMBER, payload: { value: '5' } }, ...actions])}>5</CalcButton>
                        <CalcButton color='black' onClick={() => setActions([{ type: NUMBER, payload: { value: '6' } }, ...actions])}>6</CalcButton>
                        <CalcButton color='grey' onClick={() => setActions([{ type: OPERATOR, payload: { sing: '-', operator: '-' } }, ...actions])}>-</CalcButton>
                        <CalcButton color='black' onClick={() => setActions([{ type: NUMBER, payload: { value: '1' } }, ...actions])}>1</CalcButton>
                        <CalcButton color='black' onClick={() => setActions([{ type: NUMBER, payload: { value: '2' } }, ...actions])}>2</CalcButton>
                        <CalcButton color='black' onClick={() => setActions([{ type: NUMBER, payload: { value: '3' } }, ...actions])}>3</CalcButton>
                        <CalcButton color='grey' onClick={() => setActions([{ type: OPERATOR, payload: { sing: '+', operator: '+' } }, ...actions])}>+</CalcButton>
                        <CalcButton color='black' onClick={() => setActions([{ type: PLUSMINUS, payload: { operator: '-' } }, ...actions])}>+/-</CalcButton>
                        <CalcButton color='black' onClick={() => setActions([{ type: NUMBER, payload: { value: '0' } }, ...actions])}>0</CalcButton>
                        <CalcButton color='black' onClick={() => setActions([{ type: DOT, payload: { value: '.' } }, ...actions])}>.</CalcButton>
                        <CalcButton color='blue' onClick={() => setActions([{ type: EQUAL }, ...actions])}>=</CalcButton>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Calculator
