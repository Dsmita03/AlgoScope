import { SetStateAction, Dispatch } from "react";

type Props = {
  setNumber_of_bars: Dispatch<SetStateAction<number>>;
  number_of_bars: number;
  setTime: Dispatch<SetStateAction<number>>;
  time: number;
  randomButton: () => void;
  bubbleSort: () => void;
  selectionSort: () => void;
  insertionSort: () => void;
  mergeSort: () => void;
  quickSort: () => void;
  heapSort: () => void;
  sorting: boolean;
  timetosort: number;
};

const LeftCanvas = ({
  setNumber_of_bars,
  number_of_bars,
  randomButton,
  bubbleSort,
  time,
  setTime,
  selectionSort,
  insertionSort,
  mergeSort,
  quickSort,
  heapSort,
  sorting,
  timetosort,
}: Props) => {
  const sortButtons = [
    { name: "Bubble Sort", action: bubbleSort },
    { name: "Selection Sort", action: selectionSort },
    { name: "Insertion Sort", action: insertionSort },
    { name: "Merge Sort", action: mergeSort },
    { name: "Quick Sort", action: quickSort },
    { name: "Heap Sort", action: heapSort },
  ];

  return (
    <aside className="bg-gray-900 p-6 sm:p-6 md:p-6 w-full md:w-1/4 h-screen overflow-y-auto shadow-xl border-r border-gray-800 flex-shrink-0">
      {/* Header */}
      <h1 className="text-white text-3xl sm:text-4xl font-extrabold text-center mb-8 tracking-tight">
        <span className="text-indigo-500">Algo</span>Scope
      </h1>

      {/* Controls */}
      <section className="space-y-6">
        {/* Bar Count */}
        <div className="bg-gray-800 rounded-xl p-5 shadow-inner space-y-3">
          <label className="block text-gray-300 font-semibold text-sm">
            Number of Bars
          </label>
          <p className="text-white font-mono text-base">{number_of_bars}</p>
          <input
            type="range"
            min={2}
            max={100}
            value={number_of_bars}
            disabled={sorting}
            onChange={(e) => setNumber_of_bars(Number(e.target.value))}
            className="w-full accent-indigo-500 cursor-pointer"
          />
          <button
            disabled={sorting}
            onClick={randomButton}
            className="w-full mt-3 bg-indigo-600 text-white py-2 rounded-md text-sm font-medium hover:bg-indigo-700 disabled:bg-gray-600 transition"
          >
            🎲 Randomize
          </button>
        </div>

        {/* Speed Control */}
        <div className="bg-gray-800 rounded-xl p-5 shadow-inner space-y-3">
          <label className="block text-gray-300 font-semibold text-sm">
            Sorting Speed (ms)
          </label>
          <p className="text-white font-mono text-base">{time}</p>
          <input
            type="range"
            min={1}
            max={300}
            value={time}
            onChange={(e) => setTime(Number(e.target.value))}
            className="w-full accent-indigo-500 cursor-pointer"
          />
        </div>

        {/* Sorting Algorithms */}
        <div className="bg-gray-800 rounded-xl p-5 shadow-inner">
          <p className="text-gray-300 font-semibold mb-3 text-sm">
            Sorting Algorithms
          </p>
          <div className="grid grid-cols-1 gap-2">
            {sortButtons.map(({ name, action }) => (
              <button
                key={name}
                onClick={action}
                disabled={sorting}
                className="w-full bg-indigo-600 text-white py-2 rounded-md text-sm font-medium hover:bg-indigo-700 disabled:bg-gray-600 transition"
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Sort Time */}
      {timetosort !== 0 && (
        <footer className="mt-10 bg-gray-800 rounded-xl p-5 shadow-inner text-sm text-white font-mono text-center">
          <p>
            ⏱ Time to Sort:{" "}
            <span className="text-green-400 font-bold">
              {(timetosort / 1000).toFixed(2)}s
            </span>
          </p>
        </footer>
      )}
    </aside>
  );
};

export default LeftCanvas;
