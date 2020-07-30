import {} from 'styled-components';
import { theme } from '../src/styles';

declare module 'styled-components' {
  type Theme = typeof theme;
  export interface DefaultTheme extends Theme {}
}

declare module "*.svg" {
  const value: string;
  export default value;
}

declare module "*.gif" {
  const value: string;
  export default value;
}
