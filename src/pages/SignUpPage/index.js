import {
    faEnvelope,
    faLock,
    faPhone,
    faRightFromBracket,
    faRightToBracket,
    faSignature,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Alert,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Line from '~/components/Line';
import { HOME_PAGE_URL, LOGIN_PAGE_URL, SIGNUP_PAGE_URL } from '~/constants';

function SignUpPage() {
    const navigate = useNavigate();

    //all data state
    const [usernameState, setUsernameState] = useState('');
    const [passwordState, setPasswordState] = useState('');
    const [repasswordState, setRepasswordState] = useState('');
    const [fullnameState, setFullnameState] = useState('');
    const [phoneNumberState, setPhoneNumberState] = useState('');
    const [emailState, setEmailState] = useState('');
    const [dateOfBirthState, setDateOfBirthState] = useState('');
    const [genderState, setGenderState] = useState('');
    const [policyCheckedState, setPolicyCheckedState] = useState(false);

    //all error state
    const [usernameErrorState, setUsernameErrorState] = useState('');
    const [passwordErrorState, setPasswordErrorState] = useState('');
    const [repasswordErrorState, setRepasswordErrorState] = useState('');
    const [fullnameErrorState, setFullnameErrorState] = useState('');
    const [emailErrorState, setEmailErrorState] = useState('');
    const [phoneNumberErrorState, setPhoneNumberErrorState] = useState('');
    const [dateOfBirthErrorState, setDateOfBirthErrorState] = useState('');
    const [genderErrorState, setGenderErrorState] = useState('');
    const [errorState, setErrorState] = useState('');

    const clearError = () => {
        setUsernameErrorState('');
        setPasswordErrorState('');
        setFullnameErrorState('');
        setPhoneNumberErrorState('');
        setDateOfBirthErrorState('');
        setGenderErrorState('');
        setErrorState('');
        setRepasswordErrorState('');
        setEmailErrorState('');
    };

    const submitForm = () => {
        let validForm = true;
        clearError();

        if (!usernameState) {
            validForm = false;
            setUsernameErrorState('Kh??ng h???p l???!');
        }
        if (!passwordState) {
            validForm = false;
            setPasswordErrorState('Kh??ng h???p l???!');
        }
        if (!repasswordState) {
            validForm = false;
            setRepasswordErrorState('Kh??ng h???p l???!');
        }
        if (!fullnameState) {
            validForm = false;
            setFullnameErrorState('Kh??ng h???p l???!');
        }
        if (!phoneNumberState) {
            validForm = false;
            setPhoneNumberErrorState('Kh??ng h???p l???!');
        }
        if (!dateOfBirthState) {
            validForm = false;
            setDateOfBirthErrorState('Kh??ng h???p l???!');
        }
        if (!genderState) {
            validForm = false;
            setGenderErrorState('Kh??ng h???p l???!');
        }
        if (!emailState) {
            validForm = false;
            setEmailErrorState('Kh??ng h???p l???!');
        }
        if (!policyCheckedState) {
            validForm = false;
        }

        if (validForm) {
            console.log(usernameState, passwordState);

            //fetch-api

            navigate(HOME_PAGE_URL);
        } else {
            setErrorState('Sai t??n ????ng nh???p ho???c m???t kh???u');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-full h-full">
            <div className="shadow-lg border rounded-lg bg-white p-6 min-h-[240px] max-w-md w-full flex flex-col sm:w-[420px]">
                <h1 className="font-bold text-xl mb-2">????NG K??</h1>
                <div className="my-2 mt-4 w-full">
                    <TextField
                        onChange={(e) => setUsernameState(e.target.value)}
                        className="w-full"
                        value={usernameState}
                        label="T??i kho???n"
                        placeholder="T??i kho???n"
                        variant="outlined"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <FontAwesomeIcon icon={faUser} />
                                </InputAdornment>
                            ),
                        }}
                        error={!!usernameErrorState}
                        helperText={usernameErrorState}
                    />
                </div>

                <div className="mb-2 mt-4 w-full">
                    <TextField
                        onChange={(e) => setPasswordState(e.target.value)}
                        className="w-full"
                        label="M???t kh???u"
                        placeholder="M???t kh???u"
                        value={passwordState}
                        type={'password'}
                        variant="outlined"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <FontAwesomeIcon icon={faLock} />
                                </InputAdornment>
                            ),
                        }}
                        error={!!passwordErrorState}
                        helperText={passwordErrorState}
                    />
                </div>
                <div className="mb-2 mt-4 w-full">
                    <TextField
                        onChange={(e) => setRepasswordState(e.target.value)}
                        className="w-full"
                        label="Nh???p l???i m???t kh???u"
                        placeholder="Nh???p l???i m???t kh???u"
                        value={repasswordState}
                        type={'password'}
                        variant="outlined"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <FontAwesomeIcon icon={faLock} />
                                </InputAdornment>
                            ),
                        }}
                        error={!!repasswordErrorState}
                        helperText={repasswordErrorState}
                    />
                </div>
                <div className="mb-2 mt-4 w-full">
                    <TextField
                        onChange={(e) => setFullnameState(e.target.value)}
                        className="w-full"
                        label="H??? v?? t??n"
                        placeholder="H??? v?? t??n"
                        value={fullnameState}
                        type={'text'}
                        variant="outlined"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <FontAwesomeIcon icon={faSignature} />
                                </InputAdornment>
                            ),
                        }}
                        error={!!fullnameErrorState}
                        helperText={fullnameErrorState}
                    />
                </div>
                <div className="mb-2 mt-4 w-full">
                    <TextField
                        onChange={(e) => setPhoneNumberState(e.target.value)}
                        className="w-full"
                        label="S??? ??i???n tho???i"
                        placeholder="S??? ??i???n tho???i"
                        value={phoneNumberState}
                        type={'number'}
                        variant="outlined"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <FontAwesomeIcon icon={faPhone} />
                                </InputAdornment>
                            ),
                        }}
                        error={!!fullnameErrorState}
                        helperText={fullnameErrorState}
                    />
                </div>
                <div className="mb-2 mt-4 w-full">
                    <TextField
                        onChange={(e) => setEmailState(e.target.value)}
                        className="w-full"
                        label="Email"
                        placeholder="Email"
                        value={emailState}
                        type={'email'}
                        variant="outlined"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <FontAwesomeIcon icon={faEnvelope} />
                                </InputAdornment>
                            ),
                        }}
                        error={!!emailErrorState}
                        helperText={emailErrorState}
                    />
                </div>
                <div className="mb-2 mt-4 w-full">
                    Ng??y sinh: <input type={'date'} />
                </div>
                <div className="mb-2 mt-4 w-full">
                    <FormControl fullWidth>
                        <InputLabel id="select-label-gender-signup">Gi???i t??nh</InputLabel>
                        <Select
                            labelId="select-label-gender-signup"
                            id="select-gender-signup"
                            value={genderState}
                            label="Gi???i t??nh"
                            onChange={(e) => setGenderState(e.target.value)}
                        >
                            <MenuItem value={'male'}>Nam</MenuItem>
                            <MenuItem value={'female'}>N???</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className="select-none">
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    value={policyCheckedState}
                                    onChange={(e) => setPolicyCheckedState(e.target.checked)}
                                />
                            }
                            label="T??i ?????ng ?? v???i ??i???u kho???n"
                        />
                    </FormGroup>
                </div>
                {errorState && (
                    <div>
                        <Alert severity="error">{errorState}</Alert>
                    </div>
                )}
                <div className="mt-4 mb-0 w-full">
                    <Button variant="contained" className="w-full" color="success" onClick={submitForm}>
                        <div className="w-full font-bold p-2">????ng k??</div>
                    </Button>
                </div>
                <div className="mb-4 mt-2 w-full">
                    <Button
                        variant="contained"
                        onClick={(e) => {
                            navigate(LOGIN_PAGE_URL);
                        }}
                        className="w-full"
                    >
                        <div className="w-full font-bold p-2">
                            <span className="mr-4">????ng nh???p</span> <FontAwesomeIcon icon={faRightFromBracket} />
                        </div>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default SignUpPage;
