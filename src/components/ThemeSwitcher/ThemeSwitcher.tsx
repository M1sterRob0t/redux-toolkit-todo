import { Switch } from 'antd';
import './ThemeSwitcher.css';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectThemeStatus, switchTheme } from '../../store/reducers/theme/themeReducer';

function ThemeSwitcher() {
  const isDarkMode = useAppSelector(selectThemeStatus);
  const dispatch = useAppDispatch();

  const onChange = () => {
    dispatch(switchTheme());
  };

  return (
    <div className='theme-switcher'>
      <Switch className='theme-switcher__switch' checked={isDarkMode} onChange={onChange} />
      <span className='theme-switcher__text'>
        dark mode {isDarkMode ? 'on' : 'off'}
      </span>
    </div>
  );
}

export default ThemeSwitcher;
