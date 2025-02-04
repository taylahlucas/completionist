import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dropdown } from '@components/general/Dropdown/index';
import ProgressView from '@components/custom/ProgressView/ProgressView.native';
import { ProgressItem } from '@utils/CustomInterfaces';
import AchievementDropdownSubtitle from '../AchievementView/AchievementDropdownSubtitle.native';
import useGetTheme from '@styles/hooks/useGetTheme';

interface ProgressViewDropdownProps {
  title: string;
  data: ProgressItem[];
}

const ProgressViewDropdown = ({ title, data }: ProgressViewDropdownProps) => {
  const { t } = useTranslation();
  const [isOpen, setOpen] = useState<boolean>(true);

  return (
    <Dropdown
      isOpen={isOpen}
      setOpen={(): void => setOpen(!isOpen)}
      header={<AchievementDropdownSubtitle title={title} isOpen={isOpen} />}>
      {data.map(game => (
        <ProgressView
          key={game.id}
          gameId={game.id}
          title={t(`common:categories.${game.id}.title`)}
          data={game.data}
        />
      ))}
    </Dropdown>
  );
};

export default ProgressViewDropdown;
