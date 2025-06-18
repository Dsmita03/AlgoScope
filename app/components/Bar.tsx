// Bar.tsx
type BarProps = {
  height: number;
  active?: boolean;
  sorted?: boolean;
  comparing?: boolean;
};

const Bar = ({ height, active, sorted, comparing }: BarProps) => {
  let barColor = 'bg-blue-500';

  if (comparing) barColor = 'bg-yellow-400';
  else if (active) barColor = 'bg-red-500';
  else if (sorted) barColor = 'bg-green-500';

  return (
    <div
      className={`flex-1 mx-0.5 ${barColor} rounded-t transition-all duration-300 ease-in-out`}
      style={{ height: `${height}%`, minWidth: '4px' }} // Ensures visibility on mobile
      aria-label={`Bar height: ${height}`}
    />
  );
};

export default Bar;
