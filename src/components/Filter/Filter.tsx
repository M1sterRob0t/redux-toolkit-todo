import { memo } from 'react';
import { Tabs, type TabsProps } from 'antd';
import { useCallback } from 'react';
import { switchFilter } from '../../store/reducers/filter/filterReducer';
import { useAppDispatch } from '../../hooks';
import { FilterType } from '../../constants';

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

function Filter({currentFilter, className}: IFilter) {
  const dispatch = useAppDispatch();

  const onFilterChange = useCallback((key: string) => {
    dispatch(switchFilter(key as FilterType));
  }, [dispatch]);

  return (
    <Tabs
      className={className}
      activeKey={currentFilter}
      items={tabs}
      onChange={onFilterChange}
    />
  );
}

export default memo(Filter);
