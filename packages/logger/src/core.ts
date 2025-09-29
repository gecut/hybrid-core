export const NODE_MODE = true as boolean;

export const DEV_MODE =
  (NODE_MODE === false ? (localStorage?.getItem('DEBUG') ?? '0') : process.env.DEBUG ?? '0') === '1';
