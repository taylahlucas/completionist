import React, { useState } from 'react';
import useGetTheme from '@styles/hooks/use-get-theme';
import { SteamAchievementItem } from '@utils/index';
import {
  Condition,
  Dropdown,
  StyledDropdownHeader,
  ScrollableList,
} from '@components/general';
import { SteamAchievementDropdownShadow, SteamAchievementView } from './';

interface SteamAchievementDropdownProps {
  gameId: string;
  items: SteamAchievementItem[];
  itemsLength: number;
  title: string;
  currentOpen: string;
  setCurrentOpen: (value: string) => void;
}

export const SteamAchievementDropdown = ({
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
