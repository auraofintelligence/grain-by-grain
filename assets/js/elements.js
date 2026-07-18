/*
 * Grain by Grain: the evidence-tiered periodic table.
 *
 * The honesty device, inherited from the Mineral Moonshots chapter and rebuilt
 * here with our own data: three tiers, so nobody can mistake "this is in our
 * sand" for "this is on the periodic table".
 *   local     - documented in Minjerribah's mineral sands
 *   reachable - the island can honestly get it: seawater, air, water, life, or the tip
 *   context   - the rest of the table, shown so the first two can't be oversold
 *
 * Data: [atomic number, symbol, name, column, row, tier, note]
 * Rows 8 and 9 are the lanthanide and actinide strips.
 * Progressive enhancement: the page states its case without this file.
 */
(() => {
  const L = 'local', R = 'reachable', C = 'context';

  const EL = [
    [1, 'H', 'Hydrogen', 1, 1, R, 'Split out of water whenever power is spare. Fuel, long-duration storage, and the hydrogen half of methanol.'],
    [2, 'He', 'Helium', 18, 1, C],
    [3, 'Li', 'Lithium', 1, 2, C],
    [4, 'Be', 'Beryllium', 2, 2, C],
    [5, 'B', 'Boron', 13, 2, C],
    [6, 'C', 'Carbon', 14, 2, R, 'From captured carbon dioxide and from biomass. Becomes methanol, silicon carbide for power electronics, biochar and bioplastic.'],
    [7, 'N', 'Nitrogen', 15, 2, R, 'Straight out of the air. Liquid nitrogen runs the cold chain as a by-product of making welding gases.'],
    [8, 'O', 'Oxygen', 16, 2, L, 'The other half of quartz, and most of this island by atom count. Also split from water, giving oxygen for welding, medicine and breathing underground.'],
    [9, 'F', 'Fluorine', 17, 2, C],
    [10, 'Ne', 'Neon', 18, 2, C],
    [11, 'Na', 'Sodium', 1, 3, R, 'From seawater and salt. The sodium in sodium-ion batteries, and one half of the chlor-alkali loop.'],
    [12, 'Mg', 'Magnesium', 2, 3, R, 'Precipitated out of seawater. The reducing agent that turns titanium ore into titanium metal, then recovered and used again.'],
    [13, 'Al', 'Aluminium', 13, 3, R, 'Not from the sand: from the tip. Reclaimed aluminium, doped with silicon, becomes the island\'s structural alloy at a fraction of the energy of new metal.'],
    [14, 'Si', 'Silicon', 14, 3, L, 'Quartz sand is silicon and oxygen, and quartz is the overwhelming bulk of this island. Becomes glass, solar wafers, chips, silicone, and the sand battery\'s heat store.'],
    [15, 'P', 'Phosphorus', 15, 3, L, 'The phosphate that holds the rare earths together inside monazite. Where the leftover phosphate goes once the rare earths are out is an honest open question on this ladder.'],
    [16, 'S', 'Sulfur', 16, 3, C],
    [17, 'Cl', 'Chlorine', 17, 3, R, 'From seawater salt. It cycles endlessly through the titanium process: never a waste, always a loop.'],
    [18, 'Ar', 'Argon', 18, 3, C],
    [19, 'K', 'Potassium', 1, 4, R, 'From seawater and from compost. Nutrient chemistry for growing food.'],
    [20, 'Ca', 'Calcium', 2, 4, R, 'From seawater and shell. Lime, and the calcium carbonate that oyster-crete grows for itself.'],
    [21, 'Sc', 'Scandium', 3, 4, C],
    [22, 'Ti', 'Titanium', 4, 4, L, 'Locked in rutile and ilmenite, and mined from these dunes for decades. Becomes titanium metal for anything that meets seawater, and the white pigment in paint.'],
    [23, 'V', 'Vanadium', 5, 4, C],
    [24, 'Cr', 'Chromium', 6, 4, R, 'From reclaimed stainless steel. Corrosion resistance, recovered rather than mined.'],
    [25, 'Mn', 'Manganese', 7, 4, R, 'From reclaimed alloy and batteries. A toughening agent in the island\'s own metal.'],
    [26, 'Fe', 'Iron', 8, 4, L, 'The iron half of ilmenite. Becomes structural alloy and the magnetic cores inside motors and transformers.'],
    [27, 'Co', 'Cobalt', 9, 4, C],
    [28, 'Ni', 'Nickel', 10, 4, R, 'From reclaimed stainless and batteries. Alloying and battery chemistry.'],
    [29, 'Cu', 'Copper', 11, 4, R, 'In every motor, cable and appliance at the tip. The island\'s most under-collected treasure.'],
    [30, 'Zn', 'Zinc', 12, 4, R, 'From reclaimed galvanised steel. The coating that stops the sea eating everything.'],
    [31, 'Ga', 'Gallium', 13, 4, C],
    [32, 'Ge', 'Germanium', 14, 4, C],
    [33, 'As', 'Arsenic', 15, 4, C],
    [34, 'Se', 'Selenium', 16, 4, C],
    [35, 'Br', 'Bromine', 17, 4, R, 'Dissolved in seawater. Recovered from brine rather than imported.'],
    [36, 'Kr', 'Krypton', 18, 4, C],
    [37, 'Rb', 'Rubidium', 1, 5, C],
    [38, 'Sr', 'Strontium', 2, 5, C],
    [39, 'Y', 'Yttrium', 3, 5, C],
    [40, 'Zr', 'Zirconium', 4, 5, L, 'From zircon. Becomes zirconia, the ceramic tough enough for cutter heads and heat shields. Its refining also throws off the silicon tetrachloride that feeds the silicone and aerogel loop.'],
    [41, 'Nb', 'Niobium', 5, 5, C],
    [42, 'Mo', 'Molybdenum', 6, 5, C],
    [43, 'Tc', 'Technetium', 7, 5, C],
    [44, 'Ru', 'Ruthenium', 8, 5, C],
    [45, 'Rh', 'Rhodium', 9, 5, C],
    [46, 'Pd', 'Palladium', 10, 5, C],
    [47, 'Ag', 'Silver', 11, 5, R, 'In circuit boards and solar cells. Recovered from e-waste, not dug up.'],
    [48, 'Cd', 'Cadmium', 12, 5, C],
    [49, 'In', 'Indium', 13, 5, C],
    [50, 'Sn', 'Tin', 14, 5, R, 'The solder holding every circuit board together. Reclaimed along with the boards.'],
    [51, 'Sb', 'Antimony', 15, 5, C],
    [52, 'Te', 'Tellurium', 16, 5, C],
    [53, 'I', 'Iodine', 17, 5, C],
    [54, 'Xe', 'Xenon', 18, 5, C],
    [55, 'Cs', 'Caesium', 1, 6, C],
    [56, 'Ba', 'Barium', 2, 6, C],
    [72, 'Hf', 'Hafnium', 4, 6, C],
    [73, 'Ta', 'Tantalum', 5, 6, C],
    [74, 'W', 'Tungsten', 6, 6, C],
    [75, 'Re', 'Rhenium', 7, 6, C],
    [76, 'Os', 'Osmium', 8, 6, C],
    [77, 'Ir', 'Iridium', 9, 6, C],
    [78, 'Pt', 'Platinum', 10, 6, C],
    [79, 'Au', 'Gold', 11, 6, R, 'In the contacts and boards of every dead phone and computer on the island. Urban mining\'s headline act.'],
    [80, 'Hg', 'Mercury', 12, 6, C],
    [81, 'Tl', 'Thallium', 13, 6, C],
    [82, 'Pb', 'Lead', 14, 6, R, 'In old batteries and solder. Recovered and contained, because the alternative is it leaking into sand.'],
    [83, 'Bi', 'Bismuth', 15, 6, C],
    [84, 'Po', 'Polonium', 16, 6, C],
    [85, 'At', 'Astatine', 17, 6, C],
    [86, 'Rn', 'Radon', 18, 6, C],
    [87, 'Fr', 'Francium', 1, 7, C],
    [88, 'Ra', 'Radium', 2, 7, C],
    [104, 'Rf', 'Rutherfordium', 4, 7, C],
    [105, 'Db', 'Dubnium', 5, 7, C],
    [106, 'Sg', 'Seaborgium', 6, 7, C],
    [107, 'Bh', 'Bohrium', 7, 7, C],
    [108, 'Hs', 'Hassium', 8, 7, C],
    [109, 'Mt', 'Meitnerium', 9, 7, C],
    [110, 'Ds', 'Darmstadtium', 10, 7, C],
    [111, 'Rg', 'Roentgenium', 11, 7, C],
    [112, 'Cn', 'Copernicium', 12, 7, C],
    [113, 'Nh', 'Nihonium', 13, 7, C],
    [114, 'Fl', 'Flerovium', 14, 7, C],
    [115, 'Mc', 'Moscovium', 15, 7, C],
    [116, 'Lv', 'Livermorium', 16, 7, C],
    [117, 'Ts', 'Tennessine', 17, 7, C],
    [118, 'Og', 'Oganesson', 18, 7, C],
    [57, 'La', 'Lanthanum', 3, 8, L, 'A rare earth in monazite. Goes into catalysts, optical glass and battery chemistry.'],
    [58, 'Ce', 'Cerium', 4, 8, L, 'The most abundant rare earth in monazite. Polishing compounds, catalysts and glass.'],
    [59, 'Pr', 'Praseodymium', 5, 8, C],
    [60, 'Nd', 'Neodymium', 6, 8, L, 'The magnet metal. Every strong permanent magnet in a motor or generator on this island wants neodymium, and it is sitting in the sand.'],
    [61, 'Pm', 'Promethium', 7, 8, C],
    [62, 'Sm', 'Samarium', 8, 8, C],
    [63, 'Eu', 'Europium', 9, 8, C],
    [64, 'Gd', 'Gadolinium', 10, 8, C],
    [65, 'Tb', 'Terbium', 11, 8, C],
    [66, 'Dy', 'Dysprosium', 12, 8, C],
    [67, 'Ho', 'Holmium', 13, 8, C],
    [68, 'Er', 'Erbium', 14, 8, C],
    [69, 'Tm', 'Thulium', 15, 8, C],
    [70, 'Yb', 'Ytterbium', 16, 8, C],
    [71, 'Lu', 'Lutetium', 17, 8, C],
    [89, 'Ac', 'Actinium', 3, 9, C],
    [90, 'Th', 'Thorium', 4, 9, L, 'The thorium that made this monazite "too costly" in the 1990s, so it was dispersed back into the tailings. It is a proven reactor fuel: China runs one, India is building its energy independence on it. Held in trust here, not burned, until the law and the reactor both arrive.'],
    [91, 'Pa', 'Protactinium', 5, 9, C],
    [92, 'U', 'Uranium', 6, 9, C],
    [93, 'Np', 'Neptunium', 7, 9, C],
    [94, 'Pu', 'Plutonium', 8, 9, C],
    [95, 'Am', 'Americium', 9, 9, C],
    [96, 'Cm', 'Curium', 10, 9, C],
    [97, 'Bk', 'Berkelium', 11, 9, C],
    [98, 'Cf', 'Californium', 12, 9, C],
    [99, 'Es', 'Einsteinium', 13, 9, C],
    [100, 'Fm', 'Fermium', 14, 9, C],
    [101, 'Md', 'Mendelevium', 15, 9, C],
    [102, 'No', 'Nobelium', 16, 9, C],
    [103, 'Lr', 'Lawrencium', 17, 9, C],
  ];

  const TIER_LABEL = {
    local: 'In our sand',
    reachable: 'Within reach',
    context: 'Context only',
  };

  const mount = document.querySelector('[data-periodic]');
  const detail = document.querySelector('[data-element-detail]');
  if (!mount) { return; }

  const grid = document.createElement('div');
  grid.className = 'periodic';

  /* The two f-block pointers that keep the main table honest-looking. */
  const pointers = [
    { col: 3, row: 6, label: '57-71' },
    { col: 3, row: 7, label: '89-103' },
  ];
  pointers.forEach((p) => {
    const cell = document.createElement('div');
    cell.className = 'el el-context el-pointer';
    cell.style.gridColumn = p.col;
    cell.style.gridRow = p.row;
    cell.innerHTML = `<span class="el-sym">${p.label}</span>`;
    grid.appendChild(cell);
  });

  const show = (e) => {
    if (!detail) { return; }
    const [z, sym, name, , , tier, note] = e;
    detail.innerHTML =
      `<p class="eyebrow">${TIER_LABEL[tier]} &middot; number ${z}</p>` +
      `<h3>${sym}: ${name}</h3>` +
      `<p>${note}</p>`;
  };

  EL.forEach((e) => {
    const [z, sym, name, col, row, tier, note] = e;
    const interactive = tier !== C;
    const cell = document.createElement(interactive ? 'button' : 'div');
    cell.className = `el el-${tier}`;
    cell.style.gridColumn = col;
    cell.style.gridRow = row;
    cell.innerHTML = `<span class="el-z">${z}</span><span class="el-sym">${sym}</span>`;
    if (interactive) {
      cell.type = 'button';
      cell.setAttribute('aria-label', `${name}, ${TIER_LABEL[tier].toLowerCase()}`);
      cell.addEventListener('click', () => {
        grid.querySelectorAll('.el.is-picked').forEach((x) => x.classList.remove('is-picked'));
        cell.classList.add('is-picked');
        show(e);
      });
    } else {
      cell.setAttribute('aria-hidden', 'true');
      cell.title = `${name}: not part of this island's story`;
    }
    grid.appendChild(cell);
  });

  mount.appendChild(grid);
})();
