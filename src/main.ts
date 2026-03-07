import * as htmlToImage from "html-to-image";
import downloadjs from "downloadjs";
import "@fontsource/iosevka";
import "gardevoir";

import "./style.css";
import MaterialSymbolsAsterisk from "./MaterialSymbolsAsterisk.svg";

import "./types";
import { assert } from "./types/utils";
import {
  additionalElementsData,
  bElements,
  groups,
  periodicTableData,
  positions,
  specialPositionsIDs,
  unsureWeights,
  type DataElement,
} from "./data/periodicTableData";

function getElementColorStyles(block: string) {
  return `background-color: var(--${block}-bg);${block === "f" ? "color: #fff;" : ""}`;
}

function getElementStyle(element: DataElement) {
  return getElementColorStyles(element.block);
}

function createCellHTML(
  html: string | null,
  {
    empty,
    mods,
    tdAttrs,
  }: { empty?: boolean; mods?: string[]; tdAttrs?: string } = {
    empty: false,
    mods: [],
    tdAttrs: "",
  },
) {
  const isEmpty = html === null || empty;
  return `<td class="cell ${isEmpty ? "cell_empty" : ""}${mods ? " " + mods?.join(" ") : ""}"${tdAttrs ? tdAttrs : ""}>${!isEmpty ? html : ""}</td>`;
}

function createElementHTML(element: DataElement) {
  return createCellHTML(
    `<div class="cellContent">
      <div class="cellElectrons">
        <ul>
          ${element.shells.map((shell) => `<li>${shell}</li>`).join("")}
        </ul>
      </div>
      <div class="cellOther">
        <div class="cellData">
          <div class="cellDataBlocks">
            <span class="cellDataFirstBlock">
              <span class="cellDataSymbolBlock">
                <span class="cellNumber">${element.number}</span>
                <span class="cellSymbol">${element.symbol}</span>
              </span>
              <span class="cellWeight">${unsureWeights.includes(element.number) ? "[" : ""}${element.atomic_mass}${unsureWeights.includes(element.number) ? "]" : ""}</span>
            </span>
            <div class="cellDataSecondBlock">${(function () {
              return ((arr) =>
                arr.includes(element.number)
                  ? `<span class="specialElementMark">${`<img src="${MaterialSymbolsAsterisk}" />`.repeat(arr.findIndex((num) => num === element.number) + 1)}</span>`
                  : "")([
                specialPositionsIDs.lanthanides,
                specialPositionsIDs.actinides,
              ]);
            })()}</div>
          </div>
          <div class="cellElectronConfig">${element.electron_configuration_semantic.replaceAll(/([a-z])(\d+)/g, "$1<sup>$2</sup>")}</div>
        <div class="cellData">
        <div class="cellNames">
          <ul>
            <li>${additionalElementsData[element.number - 1].ru}</li>
            <li>${element.name}</li>
            ${additionalElementsData[element.number - 1].lat !== element.name ? `<li>${additionalElementsData[element.number - 1].lat}</li>` : ""}
          </ul>
        </div>
      </div>
    </div>`,
    {
      mods: bElements.includes(element.number) ? ["cell_bElement"] : [],
      tdAttrs: `style="${getElementStyle(element)}"`,
    },
  );
}

function getRowHTML(row: number[]) {
  return row
    .map((elementNumber) => {
      if (elementNumber === specialPositionsIDs.none) {
        return createCellHTML(null, { empty: true });
      } else {
        const element = periodicTableData.elements[elementNumber - 1];
        return createElementHTML(element);
      }
    })
    .join("");
}

let currentRowIndex = 0;

function getPeriodHTML(period: number[][], periodIndex: number) {
  return period
    .map((row, rowIndex) => {
      currentRowIndex++;
      return `<tr>${rowIndex === 0 ? `<td rowspan="${period.length}" class="periodNumber">${periodIndex + 1}</td>` : ""}<td class="rowNumber">${currentRowIndex}</td>${getRowHTML(row)}</tr>`;
    })
    .join("");
}

window.addEventListener("DOMContentLoaded", () => {
  const app: HTMLDivElement | null = document.querySelector("#app");

  const table = document.querySelector("#table");
  assert(app && table);
  const thead = table.querySelector("thead");
  const tbody = table.querySelector("tbody");
  assert(thead && tbody);

  const otherTable = document.querySelector("#otherTable");
  assert(otherTable);
  const otherTbody = otherTable.querySelector("tbody");
  assert(otherTbody);

  thead.innerHTML += `<tr>
  <th class="vertical-lr">Пер</th>
  <th class="vertical-lr">Ряд</th>
  ${groups
    .map(
      (group, groupIndex) =>
        `<th${groupIndex + 1 === 8 ? ' colspan="3"' : ""}><span class="groupTitle"><span class="groupTitleL">А</span>${group}<span class="groupTitleR">Б</span></span></th>`,
    )
    .join("")}
</tr>`;

  positions.main.forEach((period, periodIndex) => {
    tbody.innerHTML += getPeriodHTML(period, periodIndex);
  });

  otherTbody.innerHTML += `<tr><td class="vertical-lr otherTableTitle"><div class="specialElementMark"><img src="${MaterialSymbolsAsterisk}" /></div>Лантаноиды</td>${getRowHTML(positions.lanthanides)}</tr>`;
  otherTbody.innerHTML += `<tr><td class="vertical-lr otherTableTitle"><div class="specialElementMark">${`<img src="${MaterialSymbolsAsterisk}" />`.repeat(2)}</div>Актиноиды</td>${getRowHTML(positions.actinides)}</tr>`;

  const linesData = [
    { a: "#testTable .cellElectrons", b: "#preview_cellElectrons" },
    { a: "#testTable .cellNumber", b: "#preview_cellNumber" },
    { a: "#testTable .cellSymbol", b: "#preview_cellSymbol" },
    { a: "#testTable .cellWeight", b: "#preview_cellWeight" },
    { a: "#testTable .cellElectronConfig", b: "#preview_cellElectronConfig" },

    { a: "#testTable #preview_name_ru_a", b: "#preview_name_ru_b" },
    { a: "#testTable #preview_name_en_a", b: "#preview_name_en_b" },
    { a: "#testTable #preview_name_lat_a", b: "#preview_name_lat_b" },
  ];

  const lines = linesData.map(
    (lineData) =>
      new window.LeaderLine(
        document.querySelector(lineData.a),
        document.querySelector(lineData.b),
      ),
  );

  [0, 1, 2].forEach((index) => {
    lines[index].setOptions({
      startSocket: "top",
      endSocket: "left",
      startSocketGravity: [0, 0],
      endSocketGravity: [-180, -50],
    });
  });

  const tablesContainer: HTMLElement | null =
    document.querySelector(".tablesContainer");
  assert(tablesContainer);
  const download_all_btn: HTMLButtonElement | null =
    document.querySelector("#download_all_btn");
  assert(download_all_btn);
  const download_tables_btn: HTMLButtonElement | null = document.querySelector(
    "#download_tables_btn",
  );
  assert(download_tables_btn);

  download_all_btn.addEventListener("click", () => {
    let text = download_all_btn.innerText;

    download_all_btn.innerText = "Подождите...";

    setTimeout(() => {
      htmlToImage
        .toPng(app)
        .then((dataUrl) => {
          downloadjs(dataUrl, "SeryiBaran__rus-periodic-table-js_f");
        })
        .catch((err) => {
          console.error("oops, something went wrong!", err);
        })
        .finally(() => {
          download_all_btn.innerText = text;
        });
    }, 200);
  });

  download_tables_btn.addEventListener("click", () => {
    let text = download_tables_btn.innerText;

    download_tables_btn.innerText = "Подождите...";

    setTimeout(() => {
      htmlToImage
        .toPng(tablesContainer)
        .then((dataUrl) => {
          downloadjs(dataUrl, "SeryiBaran__rus-periodic-table-js_t");
        })
        .catch((err) => {
          console.error("oops, something went wrong!", err);
        })
        .finally(() => {
          download_tables_btn.innerText = text;
        });
    }, 200);
  });
});
