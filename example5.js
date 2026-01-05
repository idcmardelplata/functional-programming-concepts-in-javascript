const Config = {
  empty: () => ({}),

  concat: (a, b) => {
    const result = { ...a };
    for (const key in b) {
      if (typeof b[key] === 'object' && !Array.isArray(b[key]) && b[key] !== null) {
        result[key] = Config.concat(result[key] || {}, b[key]);
      } else {
        result[key] = b[key];
      }
    }
    return result;
  }
};

const makeConfig = (monoid) => (values) => {
  if (values.length === 0) return monoid.empty();
  return values.reduce((acc, val) => monoid.concat(acc, val))
}

const defaultConfig = {
  theme: 'light',
  language: 'en',
  notifications: { email: true, push: false }
};

const userConfig = {
  theme: 'dark',
  notifications: { push: true }
};

const runtimeConfig = {
  language: 'es',
  notifications: { email: false }
};

const finalConfig = makeConfig(Config)([defaultConfig, userConfig, runtimeConfig]);
console.log(finalConfig);
