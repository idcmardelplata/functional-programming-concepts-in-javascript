const Time = {
  empty: () => ({ milliseconds: 0 }),

  concat: (a, b) => ({
    milliseconds: a.milliseconds + b.milliseconds
  }),

  fromSeconds: (s) => ({ milliseconds: s * 1000 }),
  fromMinutes: (m) => ({ milliseconds: m * 60 * 1000 }),
  fromHours: (h) => ({ milliseconds: h * 60 * 60 * 1000 }),

  toReadable: (time) => {
    const ms = time.milliseconds;
    const hours = Math.floor(ms / (60 * 60 * 1000));
    const minutes = Math.floor((ms % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((ms % (60 * 1000)) / 1000);
    return `${hours}h ${minutes}m ${seconds}s`;
  }
};

const calculate = (monoid) => (values) => {
  if (values.length === 0) return monoid.empty();
  return values.reduce((acc, val) => monoid.concat(acc, val))
}

const task1 = Time.fromMinutes(25);
const task2 = Time.fromMinutes(45);
const task3 = Time.fromHours(1);
const break1 = Time.fromMinutes(15);

const totalTime = calculate(Time)([task1, task2, task3, break1]);
console.log('Tiempo total:', Time.toReadable(totalTime)); 
