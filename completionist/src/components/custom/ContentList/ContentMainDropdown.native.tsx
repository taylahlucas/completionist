import React from 'react';
import Condition from '@components/general/Condition.native';
import { Dropdown } from '@components/general/Dropdown/index';
import ListHeader from '@components/general/Lists/ListHeader.native';
import ContentSubDropdown from './ContentSubDropdown.native';
import ContentMainList from './ContentMainList.native';
import useGetContents from './hooks/useGetContent';
import useMainState from '@redux/hooks/useMainState';
import useCheckContentComplete from './hooks/useCheckContentComplete';
import useGetContentCategories from './hooks/useGetContentCategories';
import useContentState from './provider/useContentState';
import useContentDispatch from './provider/useContentDispatch';
import { ContentItem } from '@utils/CustomInterfaces';

export interface ContentMainDropdownProps {
	category: ContentItem;
	completed: string;
	total: string;
}

const ContentMainDropdown = ({ category, completed, total }: ContentMainDropdownProps) => {
	const { selectedGame } = useMainState();
	const { setSelectedCategory } = useContentDispatch();
	const { selectedCategory } = useContentState();
	const { getContentSubCategories, getContentSubCategoriesTypes } = useGetContentCategories();
	const { getContentForSubCategory } = useGetContents();
	const subCategories = getContentSubCategories(category.title, selectedGame?.id);
	const { checkContentCompleteForCategory } = useCheckContentComplete();
	
	return (
		<Dropdown
			isOpen={category.id === selectedCategory.category}
			setOpen={(): void => setSelectedCategory({
				...selectedCategory,
				category: category.id === selectedCategory.category ? '' : category.id,
				subCategory: ''
			})}
			enabled={category.isActive}
			header={
				<ListHeader
					title={category.title}
					enabled={category.isActive}
					completed={completed}
					total={total}
				/>
			}
		>
			{subCategories.map((subCategory, index) => {
				const questsForCategory = getContentForSubCategory(category.title, subCategory);
				const completedQuests = checkContentCompleteForCategory(questsForCategory);
				const subCategoryTypes = getContentSubCategoriesTypes(subCategory, selectedGame?.id);

				return (
					<ContentSubDropdown
						key={index}
						mainCategory={category}
						subCategory={subCategory}
						completed={completedQuests.toString()}
						total={((subCategoryTypes.length === 0 ? questsForCategory : subCategoryTypes).length).toString()}
					/>
				)
			})}
			<Condition condition={subCategories.length === 0}>
				<ContentMainList mainCategory={category} />
			</Condition>
		</Dropdown>
	);
};

export default ContentMainDropdown;