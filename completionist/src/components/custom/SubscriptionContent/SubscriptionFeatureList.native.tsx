import { 
    FeatureListContainer, 
    FeatureListInnerContainer,
    FeatureListItemContainer, 
    FeatureListTitle 
} from './SubscriptionContentStyledComponents.native';
import useGetSubscriptionFeatureList from './hooks/useGetSubscriptionFeatureList';
import Seperator from '@components/general/Seperator.native';
import Icon from '@components/general/Icon/Icon.native';

const SubscriptionFeatureList = () => {
    const featureList = useGetSubscriptionFeatureList();

    return (
        <FeatureListContainer>
            {featureList.map(item => (
                <FeatureListInnerContainer key={item.id}>
                    <FeatureListItemContainer>
                        <Icon
                            style={{ alignSelf: 'center' }}
                            name={item.icon}
                            type={item.iconType}
                            size={30}
                            color={item.color}
                        />
                        <FeatureListTitle align={'left'}>{item.title}</FeatureListTitle>
                    </FeatureListItemContainer>
                    <Seperator />
                </FeatureListInnerContainer>
            ))}
        </FeatureListContainer>
    )
};

export default SubscriptionFeatureList;