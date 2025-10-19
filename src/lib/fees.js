// Simple fee configuration by product and side (buyer/seller)
// Fees can be fixed (ZAR) and/or percent (%) of gross per unit.

export const FEE_CONFIG = {
  default: {
    buyer: { fixed: 10, percent: 0 }, // Example: R10
    seller: { fixed: 10, percent: 0 },
  },
  KRUG_1OZ_GOLD: {
    buyer: { fixed: 10, percent: 0 },
    seller: { fixed: 10, percent: 0 },
  },
  KRUG_1_10_OZ_GOLD: {
    buyer: { fixed: 5, percent: 0 },
    seller: { fixed: 5, percent: 0 },
  },
  KRUG_1OZ_SILVER: {
    buyer: { fixed: 8, percent: 0 },
    seller: { fixed: 8, percent: 0 },
  },
  SILVER_1OZ_OTHER: {
    buyer: { fixed: 6, percent: 0 },
    seller: { fixed: 6, percent: 0 },
  },
  SILVER_1KG_BAR: {
    buyer: { fixed: 15, percent: 0 },
    seller: { fixed: 15, percent: 0 },
  },
  SILVER_1KG_GRANULES: {
    buyer: { fixed: 15, percent: 0 },
    seller: { fixed: 15, percent: 0 },
  },
};

const pickCfg = (productId) => FEE_CONFIG[productId] || FEE_CONFIG.default;

export function calcFeePerUnit(side, productId, grossPerUnit) {
  const cfg = pickCfg(productId)[side] || { fixed: 0, percent: 0 };
  const fixed = Number(cfg.fixed || 0);
  const pct = Number(cfg.percent || 0);
  const pctAmt = (Number(grossPerUnit) || 0) * (pct / 100);
  return Math.max(0, fixed + pctAmt);
}

export function calcNetPerUnit(side, productId, grossPerUnit) {
  const fee = calcFeePerUnit(side, productId, grossPerUnit);
  return Math.max(0, (Number(grossPerUnit) || 0) - fee);
}

