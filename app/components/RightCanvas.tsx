import Bar from "./Bar";

type BarType = {
  height: number;
  active: boolean;
};

type Props = {
  bars: BarType[];
};

const RightCanvas = ({ bars }: Props) => {
  return (
    <div className="w-full md:w-3/4 h-screen bg-gray-950 p-4 sm:p-6 flex items-end justify-center overflow-x-auto overflow-y-hidden">
      <div className="flex items-end h-full gap-[1px] w-fit min-w-full">
        {bars.map((bar, index) => (
          <Bar
            key={index} // Use a unique key if possible
            height={bar.height}
            active={bar.active}
          />
        ))}
      </div>
    </div>
  );
};

export default RightCanvas;
