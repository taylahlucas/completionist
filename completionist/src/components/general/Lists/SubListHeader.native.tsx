import useGetTheme from '@styles/hooks/useGetTheme';
import { 
  ListItemHeaderContainer,
  ListItemHeaderCountTitle, 
  SubListHeaderTitle
} from '@components/general/Lists/ListStyledComponents.native';

interface SubListHeaderProps {
  title: string;
  completed: string;
  total: string;
}

const SubListHeader = ({ title, completed, total }: SubListHeaderProps): JSX.Element => {
  const theme = useGetTheme();

  return (
    <ListItemHeaderContainer>
      <SubListHeaderTitle type={'ListItemSubTitleBold'} align={'left'}>
        {title}
      </SubListHeaderTitle>
      <ListItemHeaderCountTitle type={'ListItemSubTitle'} color={theme.midGrey}>
        {`${completed} / ${total}`}
      </ListItemHeaderCountTitle>
    </ListItemHeaderContainer>
  );
};

export default SubListHeader;