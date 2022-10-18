export const isTestnet = (): boolean => {
  return process.env.IS_TESTNET === 'true' ? true : false;
};
