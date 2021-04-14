import React, { useState } from 'react';
import Display from './Display';
import Button from './Button';
import Row from './Row';
import History from './History'
import './styles/Styles.css'
import axios from 'axios'

const Calculator = () => {
    const [number, setNumber] = useState('');
    const [number2, setNumber2] = useState('');
    const [functionType, setFunctionType] = useState('');

    const handlerSetNumberValue = () => {
        setNumber2(number);
        setNumber('')
    };
    const handlerNumber = (el) => {
        if (!number.includes('.') || el !== '.') {
            setNumber(`${(number + el).replace(/^0+/, '')}`);
        }
    }
    const handlerFunc = (el) => {
        if (number) {
            setFunctionType(el);
            handlerSetNumberValue();
        }
        if (number2) {
            setFunctionType(el);
        }
    }
    const handlerClear = () => {
        setNumber('');
        setNumber2('');
        setFunctionType('');
    }
    const handlerEqual = () => {

        if (number && number2) {
            let result;
            switch (functionType) {
                case '+':
                    setNumber(result = `${parseFloat(number2) + parseFloat(number)}`)
                    break;

                case '-':
                    setNumber(result = `${parseFloat(number2) - parseFloat(number)}`)
                    break;

                case '%':
                    setNumber(result = `${parseFloat(number2) * 100 / parseFloat(number)}`)
                    break;

                case '/':
                    setNumber(result = `${parseFloat(number2) / parseFloat(number)}`)
                    break;

                case '*':
                    setNumber(result = `${parseFloat(number2) * parseFloat(number)}`)
                    break;
            }
            sendOperation(`${number2} ${functionType} ${number} = ${result}`);
            setNumber2('');
            setFunctionType('');
        }
    };

    const sendOperation = (value) => {
        axios.post('/api/history', { operation: value });
    }

    const handlerNegativeFunc = () => {
        if (number) {
            if (number > 0) {
                setNumber(`-${number}`);
            } else {
                const num = number.slice(1);
                setNumber(num);
            }
        } else if (number2 > 0) {
            setNumber2(`-${number2}`);
        } else {
            const num = number2.slice(1);
            setNumber2(num);
        }
    };



    return (
        <div>
            <History />
            <div>
                <Display value={!number2 ? `${number}` : `${number2} ${functionType} ${number}`} />
            </div>
            <div className="buttons">
                <Row>
                    <Button buttonValue='C' buttonType='action-button' handler={handlerClear} />
                    <Button buttonValue='-/+' buttonType='action-button' handler={handlerNegativeFunc} />
                    <Button buttonValue='%' buttonType='action-button' handler={handlerFunc} />
                    <Button buttonValue='/' buttonType='operation-button' handler={handlerFunc} />
                </Row>
                <Row>
                    <Button buttonValue={7} buttonType='number-button' handler={handlerNumber} />
                    <Button buttonValue={8} buttonType='number-button' handler={handlerNumber} />
                    <Button buttonValue={9} buttonType='number-button' handler={handlerNumber} />
                    <Button buttonValue='*' buttonType='operation-button' handler={handlerFunc} />
                </Row>
                <Row>
                    <Button buttonValue={4} buttonType='number-button' handler={handlerNumber} />
                    <Button buttonValue={5} buttonType='number-button' handler={handlerNumber} />
                    <Button buttonValue={6} buttonType='number-button' handler={handlerNumber} />
                    <Button buttonValue='-' buttonType='operation-button' handler={handlerFunc} />
                </Row>
                <Row>
                    <Button buttonValue={1} buttonType='number-button' handler={handlerNumber} />
                    <Button buttonValue={2} buttonType='number-button' handler={handlerNumber} />
                    <Button buttonValue={3} buttonType='number-button' handler={handlerNumber} />
                    <Button buttonValue='+' buttonType='operation-button' handler={handlerFunc} />
                </Row>
                <Row>
                    <Button buttonValue={0} buttonType='wide-button number-button' handler={handlerNumber} />
                    <Button buttonValue='.' buttonType='action-button' handler={handlerNumber} />
                    <Button buttonValue='=' buttonType='equal-button' handler={handlerEqual} />
                </Row>
            </div>
        </div>
    )
}

export default Calculator;