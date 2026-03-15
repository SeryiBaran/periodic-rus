import { positions, type DataElement } from "@/data/periodicTableData";

export function getGlobalRowIndex(periodIndex: number, localRowIndex: number) {
  return (
    positions.main
      .slice(0, periodIndex)
      .reduce((acc, value) => (acc += value.length), 0) + localRowIndex
  );
}

export function getElementColorStyles(block: string) {
  return `background-color: var(--${block}-bg);${block === "f" ? "color: #fff;" : ""}`;
}

export function getElementStyle(element: DataElement) {
  return getElementColorStyles(element.block);
}

export function chunkArr<T>(arr: T[], size: number): T[][] {
  let res = [];
  for (let i = 0; i < arr.length; i += size) {
    res.push(arr.slice(i, size + i));
  }
  return res;
}
