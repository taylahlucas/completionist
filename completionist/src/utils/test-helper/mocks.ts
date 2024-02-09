import { User } from '@utils/CustomInterfaces';
import { initialUser } from '@redux/MainState';
import { GameKeyEnum } from '@utils/CustomEnums';

export const userMock: User = {
	...initialUser,
	subscription: {
		...initialUser.subscription,
		data: [
			{
				id: GameKeyEnum.SKYRIM,
				isActive: true
			},
			{
				id: GameKeyEnum.FALLOUT_4,
				isActive: false
			}
		]
	}
}