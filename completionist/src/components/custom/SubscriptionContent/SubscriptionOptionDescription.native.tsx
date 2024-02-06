import { SubscriptionOptionDescriptionContainer, SubscriptionOptionTitle } from './SubscriptionContentStyledComponents.native';

interface SubscriptionOptionDescriptionProps {
    items: string[];
}

const SubscriptionOptionDescription = ({ items }: SubscriptionOptionDescriptionProps) => {
    return (
        <SubscriptionOptionDescriptionContainer>
            {items.map((item, index) => (
                <SubscriptionOptionTitle key={index} align={'left'}>{`- ${item}`}</SubscriptionOptionTitle>
            ))}
        </SubscriptionOptionDescriptionContainer>
    )
};

export default SubscriptionOptionDescription;