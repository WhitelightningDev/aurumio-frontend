export const PRODUCTS = [
  {
    id: 'KRUG_1OZ_GOLD',
    name: 'Krugerrand 1 oz Gold',
    unit: '1 oz',
    metal: 'gold',
    icon: '🪙',
    defaultPriceZAR: 44500,
  },
  {
    id: 'KRUG_1_10_OZ_GOLD',
    name: 'Krugerrand 1/10 oz Gold',
    unit: '0.1 oz',
    metal: 'gold',
    icon: '🪙',
    defaultPriceZAR: 4600,
  },
  {
    id: 'KRUG_1OZ_SILVER',
    name: 'Krugerrand 1 oz Silver Coin',
    unit: '1 oz',
    metal: 'silver',
    icon: '🥈',
    defaultPriceZAR: 520,
  },
  {
    id: 'SILVER_1OZ_OTHER',
    name: '1 oz Silver Coin — Other',
    unit: '1 oz',
    metal: 'silver',
    icon: '🥈',
    defaultPriceZAR: 500,
  },
  {
    id: 'SILVER_1KG_BAR',
    name: '1 kg Silver Bar',
    unit: '1 kg',
    metal: 'silver',
    icon: '🥈',
    defaultPriceZAR: 16300,
  },
  {
    id: 'SILVER_1KG_GRANULES',
    name: '1 kg Silver Granules',
    unit: '1 kg',
    metal: 'silver',
    icon: '🥈',
    defaultPriceZAR: 16100,
  },
];

export const PRODUCT_MAP = Object.fromEntries(PRODUCTS.map(p => [p.id, p]));

