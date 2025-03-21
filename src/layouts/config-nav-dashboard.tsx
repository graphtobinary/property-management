import { Label } from 'src/components/label';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor width="100%" height="100%" src={`/assets/icons/navbar/${name}.svg`} />
);

export const navData = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: icon('ic-analytics'),
  },
  {
    title: 'Manage Properties',
    path: '/manage-properties',
    icon: icon('ic-user'),
  },
  {
    title: 'Calendar',
    path: '/calendar',
    icon: icon('ic-cart'),
  },
  {
    title: 'Reservations',
    path: '/reservations',
    icon: icon('ic-blog'),
    info: (
      <Label color="error" variant="inverted">
        +3
      </Label>
    ),
  },
  {
    title: 'Analytics',
    path: '/analytics',
    icon: icon('ic-cart'),
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: icon('ic-cart'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic-disabled'),
  },
];
