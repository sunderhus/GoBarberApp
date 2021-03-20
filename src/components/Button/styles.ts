import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  margin-top: 8px;
  width: 100%;
  height: 60px;
  background-color: #ff9000;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
`;

export const ButtonText = styled.Text`
  color: #312e38;
  font-family: 'RobotoSlab-Medium';
  font-size: 18px;
`;
