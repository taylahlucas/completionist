import React, { useState } from 'react';
import { Dropdown } from '@components/general';
import { ProgressView } from './';
import { ProgressItem } from '@utils/index';
import { SteamAchievementDropdownSubtitle } from '../steam-achievement-view';

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
