import skyrim_quests from '../../backend/database/skyrim_quests.json';
import collectables from '../../backend/database/skyrim_collectables.json';
import misc from '../../backend/database/skyrim_misc.json';
import { Quest, Collectable, MiscItem } from '@utils/CustomInterfaces';
import { SubscriptionTypeEnum } from '@utils/CustomEnums';

export const mapDataToMiscItems= (): MiscItem[] => {
  return misc.map(item => {
   return item as MiscItem
  });
};

export const mappedMiscItems: MiscItem[] = mapDataToMiscItems();
