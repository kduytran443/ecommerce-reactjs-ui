import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton } from '@mui/material';
import { useState } from 'react';

function NumberInput({ defaultValue = 0, minValue, maxValue }) {
    const [numberState, setNumberState] = useState(defaultValue);

    const increase = () => {
        let value = numberState;
        if (!(maxValue && value < maxValue)) {
            value++;
        }
        setNumberState(value);
    };

    const decrease = () => {
        let value = numberState;
        if (!(minValue && value > minValue)) {
            value--;
        }
        setNumberState(value);
    };

    const onInput = (e) => {
        let number = e.target.value;
        if (maxValue && number > maxValue) {
            number = maxValue;
        }
        if (minValue && number < minValue) {
            number = minValue;
        }
        setNumberState(number);
    };

    return (
        <div className="flex flex-row w-full justify-between items-center rounded p-2 border border-slate-200">
            <div className="mr-2">
                <IconButton size="small" onClick={decrease}>
                    <FontAwesomeIcon icon={faMinus} />
                </IconButton>
            </div>
            <input
                onInput={onInput}
                style={{ width: 'auto' }}
                className="focus:outline-0"
                type="number"
                value={numberState}
            />
            <div className="ml-2">
                <IconButton size="small" onClick={increase}>
                    <FontAwesomeIcon icon={faPlus} />
                </IconButton>
            </div>
        </div>
    );
}

export default NumberInput;
