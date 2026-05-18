export const EntityRequest = {
  user: "user",
  product: "product",
  bundle: "bundle",
  address: "address",
} as const;

export type EntityType = (typeof EntityRequest)[keyof typeof EntityRequest];
