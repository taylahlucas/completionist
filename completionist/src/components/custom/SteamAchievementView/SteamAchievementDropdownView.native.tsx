import React, { useState } from 'react';
import useGetTheme from '@styles/hooks/useGetTheme';
import { ScrollableList } from '@components/general/Lists/index';
import { SteamAchievementItem } from '@utils/CustomInterfaces';
import { Condition } from '@components/general/index';
import { Dropdown } from '@components/general/Dropdown/index';
import SteamAchievementView from './SteamAchievementView.native';
import { SteamAchievementDropdownShadow } from './SteamAchievementViewStyledComponents.native';
import StyledDropdownHeader from '@components/general/Dropdown/StyledDropdownHeader.native';

interface SteamAchievementDropdownProps {
  gameId: string;
  items: SteamAchievementItem[];
  itemsLength: number;
  title: string;
  currentOpen: string;
  setCurrentOpen: (value: string) => void;
}

const SteamAchievementDropdown = ({
  gameId,
  items,
  itemsLength,
  title,
  currentOpen,
  setCurrentOpen,
}: SteamAchievementDropdownProps) => {
  const theme = useGetTheme();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const open = isOpen && gameId === currentOpen;

  return (
    <>
      <Dropdown
        isOpen={open}
        setOpen={(): void => {
          setIsOpen(!isOpen);
          setCurrentOpen(gameId);
        }}
        header={
          <StyledDropdownHeader
            title={title}
            valueTitle={`${
              items.filter(item => item.unlocked).length
            } / ${itemsLength}`}
            isOpen={open}
          />
        }>
        <ScrollableList
          style={{ maxHeight: 300 }}
          contentContainerStyle={{ paddingBottom: 10 }}>
          {items?.map(item => (
            <SteamAchievementView key={item.id} item={item} />
          ))}
        </ScrollableList>
      </Dropdown>
      <Condition condition={open}>
        <SteamAchievementDropdownShadow
          style={{
            backgroundColor: theme.black,
          }}
        />
      </Condition>
    </>
  );
};

export default SteamAchievementDropdown;
