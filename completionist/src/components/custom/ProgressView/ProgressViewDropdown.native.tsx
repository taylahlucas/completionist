import React, { useState } from 'react';
import { Dropdown } from '@components/general/Dropdown/index';
import ProgressView from '@components/custom/ProgressView/ProgressView.native';
import { ProgressItem } from '@utils/CustomInterfaces';
import AchievementDropdownSubtitle from '../AchievementView/AchievementDropdownSubtitle.native';

interface ProgressViewDropdownProps {
  title: string;
  data: ProgressItem[];
}

const ProgressViewDropdown = ({ title, data }: ProgressViewDropdownProps) => {
  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <Dropdown
      isOpen={isOpen}
      setOpen={(): void => setOpen(!isOpen)}
      header={<AchievementDropdownSubtitle title={title} isOpen={isOpen} />}>
      {data.map(game => (
        <ProgressView key={game.id} gameId={game.id} data={game.data} />
      ))}
    </Dropdown>
  );
};

export default ProgressViewDropdown;
