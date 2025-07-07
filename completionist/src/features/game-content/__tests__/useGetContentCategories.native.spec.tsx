import { renderHook } from '@utils/testing/test-library-utils';
import { initialState as mainState } from '@redux/main-state';
import { mockSettingsSections } from '@utils/testing/test-helper/__mocks__/mocks';
import useGetContentCategories from '../hooks/use-get-content-categories';
import { userLoggedInMock } from '@utils/testing/test-helper/__mocks__/mocks';
import {
  ContentSectionEnum,
  GameKeyEnum,
  SettingsOptionEnum,
} from '@utils/custom-enums';

describe('useGetContentCategories', () => {
  const initialState = {
    main: {
      ...mainState,
      selectedGame: GameKeyEnum.SKYRIM,
      selectedGameData: {
        ...mainState.selectedGameData,
        settingsConfig: mockSettingsSections,
      },
    },
    content: {
      sectionType: ContentSectionEnum.QUESTS,
    },
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('getContentCategories renders the correct categories', () => {
    const { result } = renderHook(
      () => useGetContentCategories(),
      initialState,
    );
    const data = result.current.getContentCategories();

    expect(data).toEqual([
      {
        id: 'mainQuests',
        title: 'common:categories.skyrim.categories.quests.mainQuests',
        isActive: true,
      },
      {
        id: 'dawnguard',
        title: 'common:categories.skyrim.dlc.dawnguard',
        isActive: true,
      },
    ]);
  });

  it('returns the correct sections when shouldShowDisabledSections is false', () => {
    const updatedInitialState = {
      ...initialState,
      main: {
        user: {
          ...userLoggedInMock,
          settings: {
            configs: [
              {
                id: SettingsOptionEnum.DISABLED_SECTIONS,
                isActive: false,
              },
            ],
          },
        },
      },
      content: {
        sectionType: ContentSectionEnum.COLLECTABLES,
      },
    };

    const { result } = renderHook(
      () => useGetContentCategories(),
      updatedInitialState,
    );
    const data = result.current.getContentCategories();

    expect(data).toEqual([]);
  });

  it('getContentSubCategories returns the correct categories', () => {
    const { result } = renderHook(
      () => useGetContentCategories(),
      initialState,
    );
    const data = result.current.getContentSubCategories(
      'Main Quests',
      GameKeyEnum.SKYRIM,
    );

    expect(data).toEqual(['Act I', 'Act II', 'Act III']);
  });

  it('getContentSubCategoriesTypes returns the correct categories', () => {
    const { result } = renderHook(
      () => useGetContentCategories(),
      initialState,
    );
    const data = result.current.getContentSubCategoriesTypes(
      'Dark Brotherhood',
      GameKeyEnum.SKYRIM,
    );

    expect(data).toEqual(['Main', 'Contracts', 'Side Quests', 'Other Quests']);
  });
});
