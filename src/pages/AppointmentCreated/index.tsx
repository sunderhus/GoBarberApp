import { useNavigation, useRoute } from '@react-navigation/native';
import { addHours, format } from 'date-fns';
import React, { useCallback, useMemo } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import ptBR from 'date-fns/locale/pt-BR';

import {
  Container,
  Title,
  Description,
  ConfirmButton,
  ConfirmButtonText,
} from './styles';

interface RouteParams {
  date: number;
}

const AppointmentCreated: React.FC = () => {
  const { reset } = useNavigation();

  const { params } = useRoute();

  const routeParams = params as RouteParams;

  const formattedDate = useMemo(() => {
    return format(
      addHours(routeParams.date, -3),
      "EEEE', dia' dd 'de' MMMM 'de' yyyy 'às' HH:mm'h'",
      { locale: ptBR },
    );
  }, [routeParams.date]);

  const handleConfirmPressed = useCallback(() => {
    reset({
      routes: [
        {
          name: 'Dashboard',
        },
      ],
      index: 0,
    });
  }, [reset]);

  return (
    <Container>
      <Icon name="check" size={80} color="#04d361" />

      <Title>Agendamento concluído</Title>
      <Description>{formattedDate}</Description>

      <ConfirmButton onPress={handleConfirmPressed}>
        <ConfirmButtonText>OK</ConfirmButtonText>
      </ConfirmButton>
    </Container>
  );
};

export default AppointmentCreated;
