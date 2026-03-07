import _periodicTableData from "./PeriodicTableJSON.json";

export interface DataRoot {
  elements: DataElement[];
}

export interface DataElement {
  name: string;
  appearance?: string;
  atomic_mass: number;
  boil?: number;
  category: string;
  density?: number;
  discovered_by?: string;
  melt?: number;
  molar_heat?: number;
  named_by?: string;
  number: number;
  period: number;
  group: number;
  phase: string;
  source: string;
  bohr_model_image?: string;
  bohr_model_3d?: string;
  spectral_img?: string;
  summary: string;
  symbol: string;
  xpos: number;
  ypos: number;
  wxpos: number;
  wypos: number;
  shells: number[];
  electron_configuration: string;
  electron_configuration_semantic: string;
  electron_affinity?: number;
  electronegativity_pauling?: number;
  ionization_energies: number[];
  "cpk-hex"?: string;
  image: DataElementImage;
  block: string;
}

export interface DataElementImage {
  title: string;
  url: string;
  attribution: string;
}

function range(min: number, max: number): number[] {
  return Array.from({ length: max + 1 - min }, (_, i) => i + min);
}

export const specialPositionsIDs = {
  none: 0,
  lanthanides: 57,
  actinides: 89,
};
export const positions = {
  main: [
    [[1, 0, 0, 0, 0, 0, 0, 2]],
    [range(3, 10)],
    [range(11, 18)],
    [range(19, 28), range(29, 36)],
    [range(37, 46), range(47, 54)],
    [[...range(55, 57), ...range(72, 78)], range(79, 86)],
    [[...range(87, 89), ...range(104, 110)], range(111, 118)],
  ],
  lanthanides: range(58, 71),
  actinides: range(90, 103),
};

export const bElements = [
  range(21, 30),
  range(39, 48),
  range(57, 71),
  range(72, 80),
  range(89, 103),
  range(104, 112),
].flat();

export const unsureWeights = [84, range(84, 89), 91, range(93, 118)].flat();

export const additionalElementsData = [
  { ru: "Водород", lat: "Hydrogenium" },
  { ru: "Гелий", lat: "Helium" },
  { ru: "Литий", lat: "Lithium" },
  { ru: "Бериллий", lat: "Beryllium" },
  { ru: "Бор", lat: "Borum" },
  { ru: "Углерод", lat: "Carboneum" },
  { ru: "Азот", lat: "Nitrogenium" },
  { ru: "Кислород", lat: "Oxygenium" },
  { ru: "Фтор", lat: "Fluorum" },
  { ru: "Неон", lat: "Neon" },
  { ru: "Натрий", lat: "Natrium" },
  { ru: "Магний", lat: "Magnesium" },
  { ru: "Алюминий", lat: "Aluminium" },
  { ru: "Кремний", lat: "Silicium" },
  { ru: "Фосфор", lat: "Phosphorus" },
  { ru: "Сера", lat: "Sulfur" }, // Sulphur
  { ru: "Хлор", lat: "Chlorum" },
  { ru: "Аргон", lat: "Argon" },
  { ru: "Калий", lat: "Kalium, Calium" },
  { ru: "Кальций", lat: "Calcium" },
  { ru: "Скандий", lat: "Scandium" },
  { ru: "Титан", lat: "Titanium" },
  { ru: "Ванадий", lat: "Vanadium" },
  { ru: "Хром", lat: "Chromium" },
  { ru: "Марганец", lat: "Manganum" }, // Manganesium
  { ru: "Железо", lat: "Ferrum" },
  { ru: "Кобальт", lat: "Cobaltum" },
  { ru: "Никель", lat: "Niccolum" },
  { ru: "Медь", lat: "Cuprum" },
  { ru: "Цинк", lat: "Zincum" },
  { ru: "Галлий", lat: "Gallium" },
  { ru: "Германий", lat: "Germanium" },
  { ru: "Мышьяк", lat: "Arsenicum" },
  { ru: "Селен", lat: "Selenium" },
  { ru: "Бром", lat: "Bromum" },
  { ru: "Криптон", lat: "Krypton" }, // Crypton
  { ru: "Рубидий", lat: "Rubidium" },
  { ru: "Стронций", lat: "Strontium" },
  { ru: "Иттрий", lat: "Yttrium" },
  { ru: "Цирконий", lat: "Zirconium" },
  { ru: "Ниобий", lat: "Niobium" },
  { ru: "Молибден", lat: "Molybdaenum" },
  { ru: "Технеций", lat: "Technetium" },
  { ru: "Рутений", lat: "Ruthenium" },
  { ru: "Родий", lat: "Rhodium" },
  { ru: "Палладий", lat: "Palladium" },
  { ru: "Серебро", lat: "Argentum" },
  { ru: "Кадмий", lat: "Cadmium" },
  { ru: "Индий", lat: "Indium" },
  { ru: "Олово", lat: "Stannum" },
  { ru: "Сурьма", lat: "Stibium" },
  { ru: "Теллур", lat: "Tellurium" },
  { ru: "Иод", lat: "Iodium" }, // Jodium
  { ru: "Ксенон", lat: "Xenon" },
  { ru: "Цезий", lat: "Caesium" },
  { ru: "Барий", lat: "Barium" },
  { ru: "Лантан", lat: "Lanthanum" },
  { ru: "Церий", lat: "Cerium" },
  { ru: "Празеодим", lat: "Praseodymium" },
  { ru: "Неодим", lat: "Neodymium" },
  { ru: "Прометий", lat: "Promethium" },
  { ru: "Самарий", lat: "Samarium" },
  { ru: "Европий", lat: "Europium" },
  { ru: "Гадолиний", lat: "Gadolinium" },
  { ru: "Тербий", lat: "Terbium" },
  { ru: "Диспрозий", lat: "Dysprosium" },
  { ru: "Гольмий", lat: "Holmium" },
  { ru: "Эрбий", lat: "Erbium" },
  { ru: "Тулий", lat: "Thulium" },
  { ru: "Иттербий", lat: "Ytterbium" },
  { ru: "Лютеций", lat: "Lutetium" },
  { ru: "Гафний", lat: "Hafnium" },
  { ru: "Тантал", lat: "Tantalum" },
  { ru: "Вольфрам", lat: "Wolframium" },
  { ru: "Рений", lat: "Rhenium" },
  { ru: "Осмий", lat: "Osmium" },
  { ru: "Иридий", lat: "Iridium" },
  { ru: "Платина", lat: "Platinum" },
  { ru: "Золото", lat: "Aurum" },
  { ru: "Ртуть", lat: "Hydrargyrum" },
  { ru: "Таллий", lat: "Thallium" },
  { ru: "Свинец", lat: "Plumbum" },
  { ru: "Висмут", lat: "Bismuthum" },
  { ru: "Полоний", lat: "Polonium" },
  { ru: "Астат", lat: "Astatum" },
  { ru: "Радон", lat: "Radon" },
  { ru: "Франций", lat: "Francium" },
  { ru: "Радий", lat: "Radium" },
  { ru: "Актиний", lat: "Actinium" },
  { ru: "Торий", lat: "Thorium" },
  { ru: "Протактиний", lat: "Protactinium" },
  { ru: "Уран", lat: "Uranium" },
  { ru: "Нептуний", lat: "Neptunium" },
  { ru: "Плутоний", lat: "Plutonium" },
  { ru: "Америций", lat: "Americium" },
  { ru: "Кюрий", lat: "Curium" },
  { ru: "Берклий", lat: "Berkelium" },
  { ru: "Калифорний", lat: "Californium" },
  { ru: "Эйнштейний", lat: "Einsteinium" },
  { ru: "Фермий", lat: "Fermium" },
  { ru: "Менделевий", lat: "Mendelevium" }, // nMendeleevium
  { ru: "Нобелий", lat: "Nobelium" },
  { ru: "Лоуренсий", lat: "Lawrencium" }, // Laurentium
  { ru: "Резерфордий", lat: "Rutherfordium" },
  { ru: "Дубний", lat: "Dubnium" },
  { ru: "Сиборгий", lat: "Seaborgium" },
  { ru: "Борий", lat: "Bohrium" },
  { ru: "Хассий", lat: "Hassium" },
  { ru: "Мейтнерий", lat: "Meitnerium" },
  { ru: "Дармштадтий", lat: "Darmstadtium" },
  { ru: "Рентгений", lat: "Roentgenium" },
  { ru: "Коперниций", lat: "Copernicium" },
  { ru: "Нихоний", lat: "Nihonium" },
  { ru: "Флеровий", lat: "Flerovium" },
  { ru: "Московий", lat: "Moscovium" },
  { ru: "Ливерморий", lat: "Livermorium" },
  { ru: "Теннессин", lat: "Tennessine" },
  { ru: "Оганесон", lat: "Oganesson" },
];

export const groups = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

export const periodicTableData = {
  ..._periodicTableData,

  elements: (_periodicTableData as DataRoot).elements.map(
    (element: DataElement) => {
      if (
        element.number === specialPositionsIDs.lanthanides ||
        element.number === specialPositionsIDs.actinides
      ) {
        return { ...element, block: "d" };
      }
      if (
        positions.lanthanides.includes(element.number) ||
        positions.actinides.includes(element.number)
      ) {
        return { ...element, block: "f" };
      }
      return element;
    },
  ),
} as DataRoot;
