import React, {useState} from 'react';
import {KeyboardAvoidingView, StyleSheet, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {Authorization} from '../../functions/Authorization';
import {RegistrationTextInput} from './RegistrationTextInput';
import {RegistrationSubmitButton} from './RegistrationSubmitButton';

export const RegistrationForm = () => {
  const dispatch = useDispatch();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({loginEmty: false, passwordEmpty: false})

  const authorize = async (setButtonTitle) => {
    if(login==='' || password===''){
        setErrors({
            loginEmty: login === '',
            passwordEmpty: password === ''
        })
        setTimeout(()=>{
          setErrors({loginEmty: false, passwordEmpty: false})
          setButtonTitle('Увійти')
        },1000)
        // error
        return
    }
    const responceAuth = await Authorization.authorizationUser(dispatch, {login, password,deviceInfo:''});
    console.log('responceAuth', responceAuth)
    if(!responceAuth){
      setButtonTitle('Увійти')
      return
    }
  };
  return (
    <KeyboardAvoidingView style={styles.container}>
      <RegistrationTextInput
        title="Логін для входу в систему"
        placeholder="Введіть логін"
        value={login}
        setValue={setLogin}
        isError={errors.loginEmty}
      />
      <RegistrationTextInput
        title="Ваш пароль"
        placeholder="Введіть пароль"
        value={password}
        setValue={setPassword}
        secureTextEntry={true}
        isError={errors.passwordEmpty}
      />
      <RegistrationSubmitButton authSubmit={authorize} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {},
});
