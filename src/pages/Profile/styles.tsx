import { Platform } from 'react-native';
import { RectButton, TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 0px 30px ${Platform.OS === 'android' ? 0 : 40}px;
`;
export const Title = styled.Text`
  margin: 24px 0;
  color: #f4ede8;
  font-size: 20px;
  font-family: 'RobotoSlab-Medium';
`;
export const BackButton = styled(RectButton)`
  position: absolute;
  top: 0;
  left: 0;
  padding: 18px 24px;
  z-index: 10;
`;

export const UserAvatarButton = styled(TouchableOpacity)``;

export const UserAvatar = styled.Image`
  width: 186px;
  height: 186px;
  border-radius: 98px;
  align-self: center;
`;
