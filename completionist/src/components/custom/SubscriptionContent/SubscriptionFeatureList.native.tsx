import { 
    SubscriptionFeatureListContainer, 
    SubscriptionFeatureListInnerContainer,
    SubscriptionFeatureListItemContainer, 
    SubscriptionFeatureListTitle 
} from './SubscriptionContentStyledComponents.native';
import useGetSubscriptionFeatureList from './hooks/useGetSubscriptionFeatureList';
import Seperator from '@components/general/Seperator.native';
import Icon from '@components/general/Icon/Icon.native';

const SubscriptionFeatureList = () => {
    const featureList = useGetSubscriptionFeatureList();

    return (
        <SubscriptionFeatureListContainer>
            {featureList.map(item => (
                <SubscriptionFeatureListInnerContainer key={item.id}>
                    <SubscriptionFeatureListItemContainer>
                        <Icon
                            style={{ alignSelf: 'center' }}
                            name={item.icon}
                            type={item.iconType}
                            size={30}
                            color={item.color}
                        />
                        <SubscriptionFeatureListTitle align={'left'}>{item.title}</SubscriptionFeatureListTitle>
                    </SubscriptionFeatureListItemContainer>
                    <Seperator />
                </SubscriptionFeatureListInnerContainer>
            ))}
        </SubscriptionFeatureListContainer>
    )
};

export default SubscriptionFeatureList;