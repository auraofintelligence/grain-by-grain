/*
 * Grain by Grain: the converter engine.
 * One shared library of mind's-eye conversions so every macro number on the
 * site can land for a plain-speaking reader. Arithmetic is deliberately
 * simple and shown openly; anchors are round, honest, indicative figures.
 * Used inline by pages and by the calculators. No dependencies.
 */
window.GRAIN_CONVERT = (() => {
  /* Everyday anchors (indicative, rounded on purpose) */
  const ANCHORS = {
    olympicPoolML: 2.5,        /* megalitres in an Olympic swimming pool */
    bathtubL: 150,             /* litres in a decent bath */
    tankL: 5000,               /* a common backyard rainwater tank */
    householdKWhDay: 16,       /* typical Aussie household electricity per day */
    kettleKWh: 0.12,           /* boiling a full kettle */
    phoneKWh: 0.015,           /* charging a phone flat-to-full */
    evKWh: 60,                 /* filling a typical EV battery */
    hotShowerKWh: 1.5,         /* a ten-minute electric hot shower */
    tipTruckT: 10,             /* tonnes in a standard tip-truck load */
    wheelbarrowKg: 100,        /* a heaped wheelbarrow */
    shippingContainerT: 24,    /* loaded 20-foot container, roughly */
    footyFieldM2: 18000,       /* an AFL-ish oval, roughly */
    houseBlockM2: 600          /* a suburban block */
  };

  const fmt = (n) => {
    if (!isFinite(n)) { return '?'; }
    if (n >= 100) { return Math.round(n).toLocaleString('en-AU'); }
    if (n >= 10) { return (Math.round(n * 10) / 10).toLocaleString('en-AU'); }
    return (Math.round(n * 100) / 100).toLocaleString('en-AU');
  };

  /* Turn a daily energy figure into a friendly sentence. */
  const energyDayStory = (kWhPerDay) => {
    if (kWhPerDay <= 0) { return 'nothing yet: nudge the sliders.'; }
    const phones = kWhPerDay / ANCHORS.phoneKWh;
    const kettles = kWhPerDay / ANCHORS.kettleKWh;
    const homes = kWhPerDay / ANCHORS.householdKWhDay;
    if (homes >= 1) { return `about ${fmt(homes)} household${Math.abs(homes - 1) < 0.05 ? '' : 's'} of electricity, every day`; }
    if (kettles >= 1) { return `about ${fmt(kettles)} kettle boils a day (or ${fmt(phones)} phone charges)`; }
    return `about ${fmt(phones)} phone charges a day`;
  };

  /* Turn a daily water figure (ML) into a friendly sentence. */
  const waterDayStory = (mlPerDay) => {
    const pools = mlPerDay / ANCHORS.olympicPoolML;
    if (pools >= 1) { return `${fmt(pools)} Olympic pools a day`; }
    const tanks = (mlPerDay * 1e6) / ANCHORS.tankL;
    return `${fmt(tanks)} backyard rainwater tanks a day`;
  };

  /* Turn tonnes into a friendly sentence. */
  const massStory = (tonnes) => {
    const trucks = tonnes / ANCHORS.tipTruckT;
    if (trucks >= 1) { return `${fmt(trucks)} tip-truck loads`; }
    const barrows = (tonnes * 1000) / ANCHORS.wheelbarrowKg;
    return `${fmt(barrows)} heaped wheelbarrows`;
  };

  return { ANCHORS, fmt, energyDayStory, waterDayStory, massStory };
})();
