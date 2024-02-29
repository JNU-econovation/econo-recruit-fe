const set = <T>(key: string, value: T) => {
  try {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  } catch (error) {
    console.log(error);
  }
};

const get = <T>(key: string, initialValue?: T) => {
  initialValue ||= "" as unknown as T;
  if (typeof window === "undefined") {
    return initialValue;
  }
  try {
    const item = window.localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : initialValue;
  } catch (error) {
    return initialValue;
  }
};

const remove = (key: string) => {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(key);
  }
};

export const localStorage = { set, get, remove };
