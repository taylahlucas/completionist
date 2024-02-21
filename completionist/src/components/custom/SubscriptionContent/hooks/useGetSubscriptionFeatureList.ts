import useGetTheme from '@styles/hooks/useGetTheme';
import { IconTypeEnum } from '@utils/CustomEnums';
import { IconType } from '@utils/CustomTypes';

interface SubscriptionFeatureListProps {
    id: string;
    title: string;
    icon: IconType;
    iconType?: IconTypeEnum;
    color?: string;
}

const useGetSubscriptionFeatureList = (): SubscriptionFeatureListProps[] => {
    const theme = useGetTheme();
    
    return ([
        {
            id: 'access_multiple_games',
            title: "Access to multiple games",
            icon: 'checkmark-circle-outline',
            iconType: IconTypeEnum.Ionicons,
            color: theme.lightGreen
        },
        {
            id: 'no_ads',
            title: "No Ads",
            icon: 'cancel',
            iconType: IconTypeEnum.MaterialCommunityIcons,
        },
        {
            id: 'steam_access',
            title: "Access steam achievements",
            icon: 'steam',
            iconType: IconTypeEnum.MaterialCommunityIcons
        }
        // {
        //     id: 'prerequisite_tracking',
        //     title: "Automated prerequisite tracking",
        //     icon: 'menu-sharp',
        //     iconType: IconTypeEnum.Ionicons
        // },
    ]);
};

export default useGetSubscriptionFeatureList;