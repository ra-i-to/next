import { createContext } from 'react';

type ThemeStatus = 'light'|'dark';
interface ThemeContextType {
    themeStatus: ThemeStatus;
    setThemeStatus: React.Dispatch<React.SetStateAction<ThemeStatus>>;
}
const ThemeStatusContext = createContext<ThemeContextType | undefined>(undefined);
export {ThemeStatusContext};
export type { ThemeStatus };

