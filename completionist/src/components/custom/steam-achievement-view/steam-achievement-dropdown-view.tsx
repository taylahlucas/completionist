import React, { useState } from 'react';
import useGetTheme from '@styles/hooks/use-get-theme';
import { ScrollableList } from '@components/general/lists';
import { SteamAchievementItem } from '@utils/custom-interfaces';
import { Condition } from '@components/general';
import { Dropdown } from '@components/general/dropdown';
import { SteamAchievementDropdownShadow, SteamAchievementView } from './';
import { StyledDropdownHeader } from '@components/general';

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
