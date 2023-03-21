import { faLock, faRightToBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Checkbox, FormControlLabel, FormGroup, InputAdornment, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Line from '~/components/Line';
import { API_BASE_URL, HOME_PAGE_URL, SIGNUP_PAGE_URL } from '~/constants';
import { setUserInfo, useUser } from '~/stores/UserStore';

function LoginPage() {
    const navigate = useNavigate();

    const [userState, dispatchUserState] = useUser();
    const [usernameState, setUsernameState] = useState('');
    const [passwordState, setPasswordState] = useState('');
    const [saveUsernameState, setSaveUsernameState] = useState(false);

    const [usernameErrorState, setUsernameErrorState] = useState('');
    const [passwordErrorState, setPasswordErrorState] = useState('');

    const clearError = () => {
        setUsernameErrorState('');
        setPasswordErrorState('');
    };
    const [error, setError] = useState('');
    const login = async (data) => {
        const options = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        fetch(`${API_BASE_URL}/api/login`, options)
            .then((res) => res.json())
            .then((data) => {
                if (data.status === 403) {
                    setError('Tài khoản này không tồn tại');
                } else {
                    console.log('thành công', data);
                    dispatchUserState(setUserInfo(data));

                    if (data.role === 'USER') {
                        navigate('/home');
                    } else if (data.role === 'ADMIN') {
                        navigate('/admin/home');
                    }
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        if (userState && userState.username) {
            navigate('/home');
        }
    }, [userState]);

    const submitForm = async () => {
        let validForm = true;
        clearError();

        if (!usernameState) {
            validForm = false;
            setUsernameErrorState('Không hợp lệ!');
        }

        if (!passwordState) {
            validForm = false;
            setPasswordErrorState('Không hợp lệ!');
        }

        if (validForm) {
            console.log(usernameState, passwordState);

            //fetch-api
            await login({ username: usernameState, password: passwordState });
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-full h-full">
            <div className="shadow-lg border rounded-lg bg-white p-6 min-h-[240px] max-w-md w-full flex flex-col sm:w-[420px]">
                <h1 className="font-bold text-xl mb-2">ĐĂNG NHẬP</h1>
                <div className="my-2 mt-4 w-full">
                    <TextField
                        onChange={(e) => setUsernameState(e.target.value)}
                        className="w-full"
                        value={usernameState}
                        label="Tài khoản"
                        placeholder="Tài khoản"
                        variant="outlined"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <FontAwesomeIcon icon={faUser} />
                                </InputAdornment>
                            ),
                            autoCapitalize: 'off',
                            autoCorrect: 'off',
                        }}
                        error={!!usernameErrorState}
                        helperText={usernameErrorState}
                    />
                </div>

                <div className="mb-2 mt-4 w-full">
                    <TextField
                        onChange={(e) => setPasswordState(e.target.value)}
                        className="w-full"
                        label="Mật khẩu"
                        placeholder="Mật khẩu"
                        value={passwordState}
                        type={'password'}
                        variant="outlined"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <FontAwesomeIcon icon={faLock} />
                                </InputAdornment>
                            ),
                            autoCapitalize: 'off',
                            autoCorrect: 'off',
                        }}
                        error={!!passwordErrorState}
                        helperText={passwordErrorState}
                    />
                </div>
                {error && <div className="text-red-500">*{error}</div>}
                <div className="mt-4 mb-0 w-full">
                    <Button variant="contained" className="w-full" onClick={submitForm}>
                        <div className="w-full font-bold p-2">Đăng nhập</div>
                    </Button>
                </div>
                <div className="mb-4 mt-2 w-full">
                    <Button
                        variant="contained"
                        onClick={(e) => {
                            navigate(SIGNUP_PAGE_URL);
                        }}
                        color="success"
                        className="w-full"
                    >
                        <div className="w-full font-bold p-2">
                            <span className="mr-4">Đăng ký</span> <FontAwesomeIcon icon={faRightToBracket} />
                        </div>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
