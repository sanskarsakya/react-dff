let counter = 0;
export const getPhrase = () =>
  new Promise((resolve, reject) => {
    window.setTimeout(() => {
      if (Math.floor(Math.random() * 2) % 2 === 0) {
        resolve(`SAMPLE PHRASE ${counter.toString()}`);
        counter += 1;
      } else {
        reject(new Error("SAMPLE ERROR"));
      }
    }, 1000);
  });

let markSettingData = [
  {
    id: 1,
    name: "Th",
    full_mark: 100,
    pass_mark: 32,
    weightage: 50
  },
  {
    id: 2,
    name: "Pr",
    full_mark: 100,
    pass_mark: 32,
    weightage: 50
  }
];
export const getMarkSettings = () =>
  new Promise((resolve, reject) => {
    window.setTimeout(() => {
      resolve(markSettingData);
      // if (Math.floor(Math.random() * 2) % 2 === 0) {
      // } else {
      //   reject(new Error("SAMPLE ERROR"));
      // }
    }, 2000);
  });

export const addMarkSettings = (payload) =>
  new Promise((resolve, reject) => {
    window.setTimeout(() => {
      resolve({ ...payload, id: markSettingData.length + 1 });
      // if (Math.floor(Math.random() * 2) % 2 === 0) {
      // } else {
      //   reject(new Error("SAMPLE ERROR"));
      // }
    }, 1000);
  });
