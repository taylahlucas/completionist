import { PaymentTierEnum } from '@utils/custom-enums';

interface GamePriceReturnType {
  title: string;
  amount: number;
}

export const getPriceForGame = (tier: PaymentTierEnum): GamePriceReturnType => {
  switch (tier) {
    case PaymentTierEnum.SMALL:
      return {
        title: '£0.99',
        amount: 99,
      };
    case PaymentTierEnum.MEDIUM:
      return {
        title: '£2.49',
        amount: 249,
      };
    case PaymentTierEnum.LARGE:
      return {
        title: '£3.99',
        amount: 399,
      };
    default:
      return {
        title: '£3.99',
        amount: 399,
      };
  }
};
