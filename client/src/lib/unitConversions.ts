export interface UnitType {
  id: string;
  name: string;
  units: Record<string, { name: string; symbol: string; factor: number }>;
}

export const UNIT_TYPES: UnitType[] = [
  {
    id: 'area',
    name: 'Area',
    units: {
      acres: { name: 'Acres', symbol: 'ac', factor: 1 },
      hectares: { name: 'Hectares', symbol: 'ha', factor: 0.404686 },
      sqm: { name: 'Square metres', symbol: 'm²', factor: 4046.86 },
      sqft: { name: 'Square feet', symbol: 'ft²', factor: 43560 },
      sqkm: { name: 'Square kilometres', symbol: 'km²', factor: 0.00404686 },
    },
  },
  {
    id: 'length',
    name: 'Length',
    units: {
      meters: { name: 'Metres', symbol: 'm', factor: 1 },
      feet: { name: 'Feet', symbol: 'ft', factor: 3.28084 },
      inches: { name: 'Inches', symbol: 'in', factor: 39.3701 },
      kilometers: { name: 'Kilometres', symbol: 'km', factor: 0.001 },
      miles: { name: 'Miles', symbol: 'mi', factor: 0.000621371 },
      centimeters: { name: 'Centimetres', symbol: 'cm', factor: 100 },
      millimeters: { name: 'Millimetres', symbol: 'mm', factor: 1000 },
      yards: { name: 'Yards', symbol: 'yd', factor: 1.09361 },
    },
  },
  {
    id: 'temperature',
    name: 'Temperature',
    units: {
      celsius: { name: 'Celsius', symbol: '°C', factor: 1 },
      fahrenheit: { name: 'Fahrenheit', symbol: '°F', factor: 1 },
      kelvin: { name: 'Kelvin', symbol: 'K', factor: 1 },
    },
  },
  {
    id: 'volume',
    name: 'Volume',
    units: {
      liters: { name: 'Litres', symbol: 'L', factor: 1 },
      gallons: { name: 'Gallons', symbol: 'gal', factor: 0.264172 },
      milliliters: { name: 'Millilitres', symbol: 'mL', factor: 1000 },
      cups: { name: 'Cups', symbol: 'cup', factor: 4.22675 },
      pints: { name: 'Pints', symbol: 'pt', factor: 2.11338 },
      quarts: { name: 'Quarts', symbol: 'qt', factor: 1.05669 },
      cubicmeters: { name: 'Cubic metres', symbol: 'm³', factor: 0.001 },
    },
  },
  {
    id: 'mass',
    name: 'Mass',
    units: {
      kilograms: { name: 'Kilograms', symbol: 'kg', factor: 1 },
      pounds: { name: 'Pounds', symbol: 'lb', factor: 2.20462 },
      grams: { name: 'Grams', symbol: 'g', factor: 1000 },
      ounces: { name: 'Ounces', symbol: 'oz', factor: 35.274 },
      stones: { name: 'Stones', symbol: 'st', factor: 0.157473 },
      tonnes: { name: 'Tonnes', symbol: 't', factor: 0.001 },
    },
  },
];

export function convertTemperature(value: number, fromUnit: string, toUnit: string): number {
  // Convert to Celsius first
  let celsius = value;
  if (fromUnit === 'fahrenheit') {
    celsius = (value - 32) * 5/9;
  } else if (fromUnit === 'kelvin') {
    celsius = value - 273.15;
  }

  // Convert from Celsius to target
  if (toUnit === 'fahrenheit') {
    return celsius * 9/5 + 32;
  } else if (toUnit === 'kelvin') {
    return celsius + 273.15;
  }
  return celsius;
}

export function convertUnit(value: number, fromUnit: string, toUnit: string, unitType: UnitType): number {
  if (unitType.id === 'temperature') {
    return convertTemperature(value, fromUnit, toUnit);
  }

  const fromFactor = unitType.units[fromUnit]?.factor || 1;
  const toFactor = unitType.units[toUnit]?.factor || 1;

  // Convert to base unit, then to target unit
  const baseValue = value / fromFactor;
  return baseValue * toFactor;
}
