import { DatePeriodEnum, SubscriptionTypeEnum } from '@utils/CustomEnums';
import { PriceProps } from '@utils/CustomInterfaces';

interface SubscriptionOptionsListProps {
    id: SubscriptionTypeEnum;
    prices: PriceProps[];
    title: string;
    description: string[];
}

const useGetSubscriptionOptionsList = (): SubscriptionOptionsListProps[] => {
    return ([
        {
            id: SubscriptionTypeEnum.GOLD,
            prices: [
                {
                    type: DatePeriodEnum.MONTHLY,
                    title: "Monthly",
                    value: 9.99
                },
                {
                    type: DatePeriodEnum.YEARLY,
                    title: "Yearly",
                    value: 79.99
                }
            ],
            title: "Gold",
            description: [
                "Access to Premium Features",
                "Access to all games"
            ]
        },
        {
            id: SubscriptionTypeEnum.SILVER,
            prices: [
                {
                    type: DatePeriodEnum.MONTHLY,
                    title: "Monthly",
                    value: 3.99
                },
                {
                    type: DatePeriodEnum.YEARLY,
                    title: "Yearly",
                    value: 29.99
                }
            ],
            title: "Silver",
            description: [
                "Access to Premium Features",
                "Access to five games per month"
            ]
        },
        {
            id: SubscriptionTypeEnum.BRONZE,
            prices: [
                {
                    type: DatePeriodEnum.MONTHLY,
                    title: "Monthly",
                    value: 0.00
                }
            ],
            title: "Bronze",
            description: [
                "With Ads",
                "Revoked access to Features",
                "Access to one game per month"
            ]
        },
    ]);
};

export default useGetSubscriptionOptionsList;