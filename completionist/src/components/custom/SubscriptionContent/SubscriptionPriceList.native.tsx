import React from 'react';
import { PriceProps } from '@utils/CustomInterfaces';
import { SubscriptionPriceContainer } from './SubscriptionContentStyledComponents.native';
import PriceItem from '@components/general/PriceItem/PriceItem.native';

interface SubscriptionPriceListProps {
    items: PriceProps[];
}

const SubscriptionPriceList = ({ items }: SubscriptionPriceListProps) => {
    return (
        <SubscriptionPriceContainer>
            {items.map((item, index) => (
                <PriceItem key={index} item={item} />
            ))}
        </SubscriptionPriceContainer>
    )
};

export default SubscriptionPriceList;