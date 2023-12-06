import useGetTheme from '@styles/hooks/useGetTheme';
import { 
  ListItemHeaderContainer,
  ListItemHeaderCountTitle
} from '@components/general/Lists/ListStyledComponents.native';
import StyledText from '../Text/StyledText.native';

interface SubTypeListHeaderProps {
  title: string;
  completed: string;
  total: string;
}

const SubTypeListHeader = ({ title, completed, total }: SubTypeListHeaderProps): JSX.Element => {
  const theme = useGetTheme();

  return (
    <ListItemHeaderContainer>
      <StyledText type={'ListItemSubTitleBold'} color={theme.lightGrey} align={'left'} style={{ padding: 16, marginLeft: 32 }}>
        {title}
      </StyledText>
      <ListItemHeaderCountTitle type={'ListItemSubTitle'} color={theme.lightGrey}>
        {`${completed} / ${total}`}
      </ListItemHeaderCountTitle>
    </ListItemHeaderContainer>
  );
};

export default SubTypeListHeader;