const TOP_STACK = {
  ROOT: "TOP_STACK_ROOT" as const,
  CURRENCY_SELECTION_SCREEN: "CURRENCY_SELECTION_SCREEN" as const,
  EXCHANGE_RATES_SCREEN: "EXCHANGE_RATES_SCREEN" as const,
};

const BOTTOM_TABS = {
  ROOT: "BOTTOM_TABS_ROOT" as const,
  CONVERTER: "CONVERTER" as const,
  CARDS: "CARDS" as const,
  SCAN: "SCAN" as const,
  REWARDS: "PROFILE" as const,
  PROFILE: "REWARDS" as const,
};

export const ROUTES = {
  TOP_STACK,
  BOTTOM_TABS,
};
