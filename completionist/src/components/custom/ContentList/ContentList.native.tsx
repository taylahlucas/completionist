import React, { useEffect } from 'react';
import ScrollableList from '@components/general/Lists/ScrollableList.native';
import {Condition, Loading} from '@components/general/index';
import useContentState from './provider/useContentState';
import useGetContentCategories from './hooks/useGetContentCategories';
import useGetContent from './hooks/useGetContent';
import SearchResults from './SearchResults.native';
import ContentMainDropdown from './ContentMainDropdown.native';
import useCheckContentComplete from './hooks/useCheckContentComplete';
import { ContentItem } from '@utils/CustomInterfaces';
import useContentDispatch from './provider/useContentDispatch';
import WikiWebView from '@components/general/WikiWebView/WikiWebView.native';

const ContentList = () => {
	const { searchValue, webViewHref } = useContentState();
	const { setSearchValue, setWebViewHref } = useContentDispatch();
	const { getContentCategories } = useGetContentCategories();
	const { getContentForCategory } = useGetContent();
	const { checkContentCompleteForCategory } = useCheckContentComplete();
	const categories = getContentCategories();

	useEffect(() => {
		setSearchValue('');
		setWebViewHref(undefined);
	}, []);
	
	if (webViewHref) {
		return <WikiWebView currentHref={webViewHref} setClose={() => setWebViewHref(undefined)} />
	}
	if (!categories) {
		return <Loading />;
	}
	return (
		<Condition
			condition={searchValue.length < 2 && !!categories}
			conditionalElement={<SearchResults />}
		>
			<ScrollableList>
				{categories.map((category: ContentItem, index: number) => {
					const allContentForCategory = getContentForCategory(category.title)
					const completedContent = checkContentCompleteForCategory(allContentForCategory)

					return (
						<ContentMainDropdown
							key={index}
							category={category}
							completed={completedContent.toString()}
							total={allContentForCategory.length.toString()}
						/>
					)
				})}
			</ScrollableList>
		</Condition>
	);
};

export default ContentList;