import React, { useState } from 'react';
import { Dropdown } from '@components/general/Dropdown/index';
import { ProgressView } from './';
import { ProgressItem } from '@utils/CustomInterfaces';
import SteamAchievementDropdownSubtitle from '../SteamAchievementView/SteamAchievementDropdownSubtitle.native';

interface ProgressViewDropdownProps {
  title: string;
  data: ProgressItem[];
}

export const ProgressViewDropdown = ({
  title,
  data,
}: ProgressViewDropdownProps) => {
  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <Dropdown
      isOpen={isOpen}
      setOpen={(): void => setOpen(!isOpen)}
      header={
        <SteamAchievementDropdownSubtitle title={title} isOpen={isOpen} />
      }>
      {data.map(game => (
        <ProgressView key={game.id} gameId={game.id} data={game.data} />
      ))}
    </Dropdown>
  );
};
