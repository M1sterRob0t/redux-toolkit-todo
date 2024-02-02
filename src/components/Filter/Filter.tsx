import { memo } from 'react';
import { ConfigProvider, Tabs, type TabsProps } from 'antd';
import { useCallback } from 'react';
import { switchFilter } from '../../store/reducers/filter/filterReducer';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { FilterType } from '../../constants';
import { selectThemeStatus } from '../../store/reducers/theme/themeReducer';

const tabs: TabsProps['items'] = [
  {
    key: FilterType.All,
    label: FilterType.All,
  },
  {
    key: FilterType.Active,
    label: FilterType.Active,
  },
  {
    key: FilterType.Completed,
    label: FilterType.Completed,
  },
];

interface IFilter {
  currentFilter: FilterType;
  className: string;
}

function Filter({ currentFilter, className }: IFilter) {
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector(selectThemeStatus);

  const onFilterChange = useCallback(
    (key: string) => {
      dispatch(switchFilter(key as FilterType));
    },
    [dispatch]
  );

  return (
    <ConfigProvider
      theme={{
        components: {
          Tabs: {
            itemColor: isDarkMode ? 'white' : 'black',
          },
        },
      }}
    >
      <Tabs
        className={className}
        activeKey={currentFilter}
        items={tabs}
        onChange={onFilterChange}
      />
    </ConfigProvider>
  );
}

export default memo(Filter);
