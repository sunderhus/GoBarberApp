import { useNavigation } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import React, { useCallback, useRef } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import * as Yup from 'yup';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import getValidationErros from '../../utils/ValidationErros';
import {
  BackButton,
  Container,
  Title,
  UserAvatar,
  UserAvatarButton,
} from './styles';

interface UpdateUserFormData {
  name: string;
  email: string;
  oldPassword: string;
  passwordConfirmation: string;
  password: string;
}

const Profile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);
  const oldPasswordInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const confirmPasswordInputRef = useRef<TextInput>(null);

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleSubmit = useCallback(
    async (data: UpdateUserFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório.'),
          email: Yup.string()
            .required('E-mail obrigatório.')
            .email('Informe um e-mail válido'),
          oldPassword: Yup.string(),
          password: Yup.string().when('oldPassword', {
            is: fieldTextValue => fieldTextValue.length > 0,
            then: Yup.string()
              .required('Campo obrigatório')
              .min(6, 'Mínimo de 6 dígitos.'),
            otherwise: Yup.string(),
          }),
          passwordConfirmation: Yup.string()
            .when('oldPassword', {
              is: fieldTextValue => fieldTextValue.length > 0,
              then: Yup.string().required('Campo obrigatório'),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref('password'), null], 'As senhas estão diferentes'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const {
          email,
          name,
          oldPassword,
          password,
          passwordConfirmation,
        } = data;

        const formData = {
          name,
          email,
          ...(oldPassword
            ? {
                oldPassword,
                password,
                passwordConfirmation,
              }
            : {}),
        };

        const response = await api.put('/profile', formData);

        updateUser(response.data);

        Alert.alert(
          'Cadastro atualizado com sucesso',
          'Seus dados foram atualizados com sucesso.',
        );
        navigation.goBack();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErros(err);

          formRef.current?.setErrors(errors);
        }

        Alert.alert('Ops!', 'Verifique os dados usados e tente novamente.');
      }
    },
    [navigation, updateUser],
  );

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          contentContainerStyle={{ bottom: 0, top: 0, position: 'relative' }}
          keyboardShouldPersistTaps="handled"
          centerContent
        >
          <Container>
            <BackButton onPress={handleGoBack} rippleColor="transparent">
              <Icon name="chevron-left" size={32} color="#999591" />
            </BackButton>
            <UserAvatarButton>
              <UserAvatar source={{ uri: user.avatarUrl }} />
            </UserAvatarButton>

            <View>
              <Title>Meu Perfil</Title>
            </View>

            <Form
              ref={formRef}
              onSubmit={handleSubmit}
              initialData={{
                name: user.name,
                email: user.email,
              }}
            >
              <Input
                autoCapitalize="words"
                textContentType="name"
                name="name"
                icon="user"
                placeholder="Nome"
                returnKeyType="next"
                onSubmitEditing={() => emailInputRef.current?.focus()}
              />
              <Input
                ref={emailInputRef}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                name="email"
                icon="mail"
                placeholder="E-mail"
                returnKeyType="next"
                onSubmitEditing={() => oldPasswordInputRef.current?.focus()}
              />
              <View style={{ marginTop: 16 }} />

              <Input
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                ref={oldPasswordInputRef}
                name="oldPassword"
                icon="lock"
                placeholder="Senha atual"
                textContentType="password"
                returnKeyType="next"
                onSubmitEditing={() => passwordInputRef.current?.focus()}
              />

              <Input
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                ref={passwordInputRef}
                name="password"
                icon="lock"
                placeholder="Nova senha"
                textContentType="newPassword"
                returnKeyType="next"
                onSubmitEditing={() => confirmPasswordInputRef.current?.focus()}
              />

              <Input
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                ref={confirmPasswordInputRef}
                name="passwordConfirmation"
                icon="lock"
                placeholder="Confirmar nova senha"
                textContentType="newPassword"
                returnKeyType="done"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />
              <Button onPress={() => formRef.current?.submitForm()}>
                Confirmar mudanças
              </Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default Profile;
