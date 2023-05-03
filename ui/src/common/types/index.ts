export type KV<V=any> = {[key: string]: V};

export type KeyVal<K extends string, V = any> = {
  [key in K]: V;
};
