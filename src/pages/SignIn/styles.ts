import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0px 18px ${Platform.OS === 'android' ? 200 : 40}px;
`;
export const Title = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 24px;
  color: #fff;
  margin: 64px 0 24px;
`;
export const ForgotPassword = styled.TouchableOpacity`
  margin-top: 24px;
`;

export const ForgotPasswordText = styled.Text`
  color: #f4ede8;
  font-size: 16px;
  font-family: 'RobotoSlab-Medium';
`;

export const CreateAccountButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 0px;
  left: 0px;
  padding: 16px;
  border-top-width: 1px;
  border-color: #232129;
  background-color: #312e38;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-flow: row;
`;

export const CreateAccountButtonText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  color: #ff9000;
  font-size: 18px;
  margin-left: 16px;
  padding: 0 0 ${getBottomSpace() + 'px'} 0;
`;
