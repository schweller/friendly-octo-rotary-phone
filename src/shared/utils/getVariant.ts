import { BadgeProps, ProgressBarProps } from 'react-bootstrap';

export default function getVariant(
  value: number
): BadgeProps['variant'] | ProgressBarProps['variant'] {
  if (value === 100) return 'danger';
  if (value >= 80 && value < 100) return 'warning';
  if (value >= 20 && value < 80) return 'success';
  return 'primary';
}
