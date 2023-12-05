import React from 'react';
import useGetTheme from '../../../styles/hooks/useGetTheme';
import CheckBox from '../Checkbox/CheckBox.native';
import { ListItemContainer, ListItemTitle } from './ListStyledComponents.native';

interface ListItemProps {
  name: string;
  isCompleted?: boolean;
  action: () => void;
}

const ListItem = ({ name, isCompleted = false, action }: ListItemProps) => {
  const theme = useGetTheme();
  // const [toggled, setToggled] = useState<boolean>(false);

  return (
    <ListItemContainer color={isCompleted ? theme.darkGrey : theme.midGrey}>
      <ListItemTitle
        align={'left'}
        type={'ListItemSubTitle'} 
        ellipsizeMode={'tail'}
        numberOfLines={1}
        color={isCompleted ? theme.midGrey : theme.lightestGrey}
      >
        {name}
      </ListItemTitle>
      {/* <CheckBox isToggled={isCompleted} action={action} /> */}
    </ListItemContainer>
  );
};

export default ListItem;