export const isTestnet = (): boolean => {
  console.log('process.env.IS_TESTNET: ', process.env.TESTNET);

  return process.env.TESTNET === 'true' ? true : false;
};
