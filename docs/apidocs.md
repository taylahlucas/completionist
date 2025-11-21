checkUserExists:
- Input: email: string
- Output: { regular: boolean, google: boolean }: CredentialsExistProp
- Check if the user has an existing google or regular account. The purpose of this is to link accounts with the same email.

getBadges:
- Input: userId,
- Output: BadgeItem[]

setBadges:
- Input: userId, BadgeItem[]
- Output: Success Response


getAchievements:
- Input: userId,
- Output: AchievementItem[]

setBadges:
- Input: userId, AchievementItem[]
- Output: Success Response