import { useNavigation } from '@react-navigation/core';
import React, { useCallback, useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import {
  Container,
  Header,
  HeaderTitle,
  UserName,
  ProfileButton,
  UserAvatar,
  ProvidersList,
  ProvidersListTitle,
  ProvidersListFooter,
  ProviderContainer,
  ProviderAvatar,
  ProviderInfo,
  ProviderName,
  ProviderMeta,
  ProviderMetaText,
} from './styles';

export interface IProvider {
  id: string;
  name: string;
  avatarUrl: string;
}

const Dashboard: React.FC = () => {
  const [providers, setProviders] = useState<IProvider[]>([]);
  const { user, signOut } = useAuth();
  const { navigate } = useNavigation();

  useEffect(() => {
    async function loadProviders(): Promise<void> {
      await api.get<IProvider[]>('/providers').then(response => {
        setProviders(response.data);
      });
    }
    loadProviders();
  }, []);

  const handleNavigateToProfile = useCallback(() => {
    // navigate('Profile');
    signOut();
  }, [signOut]);

  const handleNavigateToCreateAppointment = useCallback(
    (providerId: string) => {
      navigate('CreateAppointment', { providerId });
    },
    [navigate],
  );

  return (
    <Container>
      <Header>
        <HeaderTitle>
          Bem vindo, {'\n'}
          <UserName>{user.name}</UserName>
        </HeaderTitle>

        <ProfileButton onPress={handleNavigateToProfile}>
          <UserAvatar source={{ uri: user.avatarUrl }} />
        </ProfileButton>
      </Header>

      <ProvidersList
        data={providers}
        keyExtractor={provider => provider.id}
        ListHeaderComponent={() => (
          <ProvidersListTitle>Profissionais</ProvidersListTitle>
        )}
        ListFooterComponent={() => <ProvidersListFooter />}
        fadingEdgeLength={128}
        renderItem={({ item: provider }) => (
          <ProviderContainer
            onPress={() => handleNavigateToCreateAppointment(provider.id)}
          >
            <ProviderAvatar source={{ uri: provider.avatarUrl }} />
            <ProviderInfo>
              <ProviderName>{provider.name}</ProviderName>

              <ProviderMeta>
                <Icon name="calendar" size={14} color="#ff9000" />
                <ProviderMetaText>Segunda à Sexta</ProviderMetaText>
              </ProviderMeta>

              <ProviderMeta>
                <Icon name="clock" size={14} color="#ff9000" />
                <ProviderMetaText>8h as 18h</ProviderMetaText>
              </ProviderMeta>
            </ProviderInfo>
          </ProviderContainer>
        )}
      />
    </Container>
  );
};

export default Dashboard;
