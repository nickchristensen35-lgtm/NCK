import { cn } from '@/lib/utils';

interface StripesBackgroundProps {
  className?: string;
  opacity?: string;
  stripeColor?: string;
  stripeWidth?: number;
  angle?: number;
}

export default function StripesBackground({
  className,
  opacity = '20',
  stripeColor = 'currentColor',
  stripeWidth = 6,
  angle = 45,
}: StripesBackgroundProps) {
  const opacityValue = parseInt(opacity, 10) / 100;

  return (
    <span
      aria-hidden="true"
      className={cn('absolute inset-0 rounded-sm overflow-hidden', className)}
      style={{
        backgroundImage: `repeating-linear-gradient(
          ${angle}deg,
          ${stripeColor} 0px,
          ${stripeColor} ${stripeWidth * 0.5}px,
          transparent ${stripeWidth * 0.5}px,
          transparent ${stripeWidth * 2}px
        )`,
        opacity: opacityValue,
      }}
    />
  );
}
