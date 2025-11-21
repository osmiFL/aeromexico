import React, {useState} from 'react';
import styled from 'styled-components/native';
import {Modal, FlatList, TouchableOpacity} from 'react-native';

const Container = styled.View`
  margin-bottom: 16px;
`;

const Label = styled.Text`
  font-size: 14px;
  color: #666666;
  margin-bottom: 8px;
`;

const InputContainer = styled.TouchableOpacity`
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 16px;
  background-color: #ffffff;
`;

const ContentContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const AirportInfo = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

const CityName = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #000000;
  margin-right: 8px;
`;

const AirportCode = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #999999;
`;


const ModalOverlay = styled.TouchableOpacity`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: flex-end;
`;

const ModalContent = styled.View`
  background-color: #ffffff;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  max-height: 70%;
  padding-top: 20px;
`;

const ModalHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px 16px 20px;
  border-bottom-width: 1px;
  border-bottom-color: #e0e0e0;
`;

const ModalTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #000000;
`;

const CloseButton = styled.TouchableOpacity`
  padding: 8px;
`;

const CloseButtonText = styled.Text`
  font-size: 12px;
  color: #666666;
`;

const AirportItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom-width: 1px;
  border-bottom-color: #f0f0f0;
`;

const AirportItemInfo = styled.View`
  flex: 1;
`;

const AirportItemCity = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #000000;
  margin-bottom: 4px;
`;

const AirportItemCode = styled.Text`
  font-size: 14px;
  color: #666666;
`;

const EmptyText = styled.Text`
  text-align: center;
  padding: 40px 20px;
  color: #999999;
  font-size: 16px;
`;

export interface Airport {
  code: string;
  city: string;
  name?: string;
}

interface SelectAirportProps {
  label?: string;
  airports: Airport[];
  value?: Airport | null;
  onChange?: (airport: Airport | null) => void;
  placeholder?: string;
}

export const SelectAirport: React.FC<SelectAirportProps> = ({
  label = 'Origin',
  airports,
  value: controlledValue,
  onChange,
  placeholder = 'Select airport',
}) => {
  const [internalValue, setInternalValue] = useState<Airport | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const value = controlledValue ?? internalValue;

  const handleSelect = (airport: Airport) => {
    if (onChange) {
      onChange(airport);
    } else {
      setInternalValue(airport);
    }
    setIsModalVisible(false);
  };

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const renderAirportItem = ({item}: {item: Airport}) => (
    <AirportItem onPress={() => handleSelect(item)}>
      <AirportItemInfo>
        <AirportItemCity>{item.city}</AirportItemCity>
        <AirportItemCode>{item.code}</AirportItemCode>
      </AirportItemInfo>
    </AirportItem>
  );

  return (
    <Container>
      <InputContainer onPress={handleOpenModal}>
        <Label>{label}</Label>
        <ContentContainer>
          {value ? (
            <AirportInfo>
              <CityName>{value.city}</CityName>
              <AirportCode>{value.code}</AirportCode>
            </AirportInfo>
          ) : (
            <AirportInfo>
              <CityName style={{color: '#999999', fontWeight: '400'}}>
                {placeholder}
              </CityName>
            </AirportInfo>
          )}
        </ContentContainer>
      </InputContainer>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={handleCloseModal}>
        <ModalOverlay activeOpacity={1} onPress={handleCloseModal}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
            style={{flex: 1, justifyContent: 'flex-end'}}>
            <ModalContent>
              <ModalHeader>
                <ModalTitle>Select {label}</ModalTitle>
                <CloseButton onPress={handleCloseModal}>
                  <CloseButtonText>Close</CloseButtonText>
                </CloseButton>
              </ModalHeader>
              {airports.length > 0 ? (
                <FlatList
                  data={airports}
                  renderItem={renderAirportItem}
                  keyExtractor={item => item.code}
                  showsVerticalScrollIndicator={true}
                />
              ) : (
                <EmptyText>No airports available</EmptyText>
              )}
            </ModalContent>
          </TouchableOpacity>
        </ModalOverlay>
      </Modal>
    </Container>
  );
};

