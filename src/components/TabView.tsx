import React, {useState} from 'react';
import styled from 'styled-components/native';

const TabContainer = styled.View`
  flex-direction: row;
  background-color:rgb(255, 255, 255);
  padding-start: 30px;
  padding-end: 30px;
  margin-bottom: 24px;
  border: 1px solid rgb(191, 189, 189);
  padding-top: 4px;
  padding-bottom: 4px;
  margin-start: 20px;
  margin-end: 20px;
`;

const Tab = styled.TouchableOpacity<{active: boolean}>`
  flex: 1;
  padding: 12px 16px;
  border-radius: 6px;
  background-color: ${props => (props.active ? '#000000' : 'transparent')};
  align-items: center;
  justify-content: center;
`;

const TabText = styled.Text<{active: boolean}>`
  font-size: 16px;
  font-weight: ${props => (props.active ? '600' : '400')};
  color: ${props => (props.active ? '#ffffff' : '#000000')};
`;

export type TabType = 'flightNumber' | 'destination';

interface TabViewProps {
  activeTab?: TabType;
  onTabChange?: (tab: TabType) => void;
}

export const TabView: React.FC<TabViewProps> = ({
  activeTab: controlledActiveTab,
  onTabChange,
}) => {
  const [internalActiveTab, setInternalActiveTab] =
    useState<TabType>('flightNumber');

  const activeTab = controlledActiveTab ?? internalActiveTab;

  const handleTabPress = (tab: TabType) => {
    if (onTabChange) {
      onTabChange(tab);
    } else {
      setInternalActiveTab(tab);
    }
  };

  return (
    <TabContainer>
      <Tab
        active={activeTab === 'flightNumber'}
        onPress={() => handleTabPress('flightNumber')}>
        <TabText active={activeTab === 'flightNumber'}>
          Flight Number
        </TabText>
      </Tab>
      <Tab
        active={activeTab === 'destination'}
        onPress={() => handleTabPress('destination')}>
        <TabText active={activeTab === 'destination'}>Destination</TabText>
      </Tab>
    </TabContainer>
  );
};

