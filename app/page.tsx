'use client';
import { useEffect, useState } from 'react';
import LeftCanvas from './components/LeftCanvas';
import RightCanvas from './components/RightCanvas';
import SortChart from './components/SortChart';

export default function Home() {
  const [number_of_bars, setNumber_of_bars] = useState(50);
  const [time, setTime] = useState(10);
  const [sampleArray, setSampleArray] = useState<{ height: number; active: boolean }[]>([]);
  const [sorting, setSorting] = useState(false);
  const [timetosort, setTimetosort] = useState(0);
  const [sortTimes, setSortTimes] = useState<{ name: string; time: number }[]>([]);

  useEffect(() => {
    const newArray = Array.from({ length: number_of_bars }, (_, i) => ({
      height: Math.round(((i + 1) / number_of_bars) * 100),
      active: false,
    }));
    setSampleArray(newArray);
  }, [number_of_bars]);

  const randomButton = () => {
    setSampleArray((s) => (s.length > 1 ? randomizeArray([...s]) : s));
  };

  function randomizeArray(array: { height: number; active: boolean }[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function recordSortTime(name: string, duration: number) {
    setSortTimes((prev) => [...prev.filter(t => t.name !== name), { name, time: duration }]);
  }

  function bubbleSortByHeight() {
    let arr = [...sampleArray];
    const date1 = Date.now();
    setTimetosort(0);

    const n = arr.length;
    let i = 0, j = 0;

    const sortStep = () => {
      arr.forEach((bar) => (bar.active = false));

      if (i < n - 1) {
        setSorting(true);
        if (j < n - i - 1) {
          arr[j].active = true;
          arr[j + 1].active = true;

          if (arr[j].height > arr[j + 1].height) {
            [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            setSampleArray([...arr]);
          }

          j++;
          setTimeout(sortStep, time);
        } else {
          arr[i].active = true;
          i++;
          j = 0;
          setTimeout(sortStep, time);
        }
      } else {
        const duration = Date.now() - date1;
        setTimetosort(duration);
        recordSortTime('Bubble Sort', duration);
        setSorting(false);
      }
    };
    sortStep();
  }

  function selectionSortByHeight() {
    const date1 = Date.now();
    setTimetosort(0);
    let arr = [...sampleArray];
    const n = arr.length;
    let i = 0, j = i + 1;

    const sortStep = () => {
      arr.forEach((bar) => (bar.active = false));

      if (i < n - 1) {
        setSorting(true);
        let minIndex = i;

        if (j < n) {
          arr[i].active = true;
          arr[j].active = true;

          if (arr[j].height < arr[minIndex].height) {
            [arr[j], arr[minIndex]] = [arr[minIndex], arr[j]];
          }

          setSampleArray([...arr]);
          j++;
          setTimeout(sortStep, time);
        } else {
          i++;
          j = i + 1;
          setTimeout(sortStep, time);
        }
      } else {
        const duration = Date.now() - date1;
        setTimetosort(duration);
        recordSortTime('Selection Sort', duration);
        setSorting(false);
      }
    };
    sortStep();
  }

  function insertionSortByHeight() {
    const date1 = Date.now();
    setTimetosort(0);
    let arr = [...sampleArray];
    const n = arr.length;
    let i = 1;

    const sortStep = () => {
      arr.forEach((bar) => (bar.active = false));

      if (i < n) {
        setSorting(true);
        let key = arr[i];
        let j = i - 1;

        while (j >= 0 && arr[j].height > key.height) {
          arr[j + 1] = arr[j];
          j--;
        }
        arr[j + 1] = key;

        arr[i].active = true;
        arr[j + 1].active = true;

        setSampleArray([...arr]);
        i++;
        setTimeout(sortStep, time);
      } else {
        const duration = Date.now() - date1;
        setTimetosort(duration);
        recordSortTime('Insertion Sort', duration);
        setSorting(false);
      }
    };
    sortStep();
  }

  function mergeSortByHeight() {
    const date1 = Date.now();
    setTimetosort(0);
    setSorting(true);

    let arr = [...sampleArray];
    const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

    async function merge(start: number, mid: number, end: number) {
      const left = arr.slice(start, mid + 1);
      const right = arr.slice(mid + 1, end + 1);

      let i = 0, j = 0, k = start;

      while (i < left.length && j < right.length) {
        arr.forEach((bar) => (bar.active = false));

        arr[k].active = true;
        if (left[i].height <= right[j].height) {
          arr[k] = { ...left[i], active: true };
          i++;
        } else {
          arr[k] = { ...right[j], active: true };
          j++;
        }

        setSampleArray([...arr]);
        await delay(time);
        k++;
      }

      while (i < left.length) {
        arr[k] = { ...left[i], active: true };
        setSampleArray([...arr]);
        await delay(time);
        i++;
        k++;
      }

      while (j < right.length) {
        arr[k] = { ...right[j], active: true };
        setSampleArray([...arr]);
        await delay(time);
        j++;
        k++;
      }
    }

    async function mergeSort(start: number, end: number): Promise<void> {
      if (start >= end) return;

      const mid = Math.floor((start + end) / 2);

      await mergeSort(start, mid);
      await mergeSort(mid + 1, end);
      await merge(start, mid, end);
    }

    mergeSort(0, arr.length - 1).then(() => {
      const duration = Date.now() - date1;
      setTimetosort(duration);
      setSorting(false);
      recordSortTime('Merge Sort', duration);
      setSampleArray(arr.map((bar) => ({ ...bar, active: false, sorted: true })));
    });
  }

  function heapSortByHeight() {
    const date1 = Date.now();
    setTimetosort(0);
    setSorting(true);
    let arr = [...sampleArray];
    const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

    async function heapify(n: number, i: number) {
      let largest = i;
      const left = 2 * i + 1;
      const right = 2 * i + 2;

      if (left < n && arr[left].height > arr[largest].height) largest = left;
      if (right < n && arr[right].height > arr[largest].height) largest = right;

      if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        arr.forEach(bar => (bar.active = false));
        arr[i].active = true;
        arr[largest].active = true;
        setSampleArray([...arr]);
        await delay(time);
        await heapify(n, largest);
      }
    }

    async function heapSort() {
      const n = arr.length;
      for (let i = Math.floor(n / 2) - 1; i >= 0; i--) await heapify(n, i);
      for (let i = n - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        arr.forEach(bar => (bar.active = false));
        arr[0].active = true;
        arr[i].active = true;
        setSampleArray([...arr]);
        await delay(time);
        await heapify(i, 0);
      }
    }

    heapSort().then(() => {
      const duration = Date.now() - date1;
      setSampleArray([...arr]);
      setSorting(false);
      setTimetosort(duration);
      recordSortTime("Heap Sort", duration);
    });
  }

  function quickSortByHeight() {
    const date1 = Date.now();
    setTimetosort(0);
    setSorting(true);
    let arr = [...sampleArray];
    const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

    async function partition(start: number, end: number) {
      let pivot = arr[end].height;
      let i = start;
      for (let j = start; j < end; j++) {
        arr.forEach(bar => (bar.active = false));
        arr[j].active = true;
        arr[end].active = true;

        if (arr[j].height < pivot) {
          [arr[i], arr[j]] = [arr[j], arr[i]];
          i++;
        }

        setSampleArray([...arr]);
        await delay(time);
      }

      [arr[i], arr[end]] = [arr[end], arr[i]];
      setSampleArray([...arr]);
      await delay(time);
      return i;
    }

    async function quickSort(start: number, end: number) {
      if (start < end) {
        let pi = await partition(start, end);
        await quickSort(start, pi - 1);
        await quickSort(pi + 1, end);
      }
    }

    quickSort(0, arr.length - 1).then(() => {
      const duration = Date.now() - date1;
      setSampleArray([...arr]);
      setSorting(false);
      setTimetosort(duration);
      recordSortTime("Quick Sort", duration);
    });
  }

  return (
    <div className="flex flex-col w-full min-h-screen overflow-x-hidden">
      <div className="flex flex-col md:flex-row w-full flex-1 h-auto">
        <LeftCanvas
          timetosort={timetosort}
          sorting={sorting}
          time={time}
          setTime={setTime}
          bubbleSort={bubbleSortByHeight}
          selectionSort={selectionSortByHeight}
          insertionSort={insertionSortByHeight}
          mergeSort={mergeSortByHeight}
          quickSort={quickSortByHeight}
          heapSort={heapSortByHeight}
          randomButton={randomButton}
          number_of_bars={number_of_bars}
          setNumber_of_bars={setNumber_of_bars}
        />
        <RightCanvas bars={sampleArray} />
      </div>

      {sortTimes.length > 0 && (
        <div className="bg-white text-black px-4 py-6 w-full overflow-x-auto">
          <SortChart times={sortTimes} />
        </div>
      )}
    </div>
  );
}
