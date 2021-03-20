import React, { useCallback, useRef } from 'react';
import {
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';

import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import Button from '../../components/Button';
import Input from '../../components/Input';

import logoImg from '../../assets/logo.png';

import {
  Container,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccountButton,
  CreateAccountButtonText,
} from './styles';

const SignIn: React.FC = () => {
  const navitagion = useNavigation();
  const formRef = useRef<FormHandles>(null);

  const handleSignIn = useCallback((data: Record<string, unknown>) => {
    console.log(data);
  }, []);

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <Container>
            <Image source={logoImg} />

            <View>
              <Title>Faça seu logon</Title>
            </View>

            <Form ref={formRef} onSubmit={handleSignIn}>
              <Input name="email" icon="mail" placeholder="E-mail" />
              <Input name="password" icon="lock" placeholder="Senha" />
              <Button onPress={() => formRef.current?.submitForm()}>
                Entrar
              </Button>
            </Form>

            <ForgotPassword>
              <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
            </ForgotPassword>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
      <CreateAccountButton onPress={() => navitagion.navigate('SignUp')}>
        <Icon name="log-in" size={20} color="#ff9000" />

        <CreateAccountButtonText>Criar conta</CreateAccountButtonText>
      </CreateAccountButton>
    </>
  );
};

export default SignIn;
