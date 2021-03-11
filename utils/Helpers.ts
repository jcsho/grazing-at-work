/**
 * Get a random value from the object
 *
 * @param obj values to retrieve from
 */
export const getRandomValueFromObject = <T>(obj: T): T[keyof T] => {
  let numItems = Object.keys(obj).length - 1;
  let randomIndex = Math.round(Math.random() * numItems);
  return Object.values(obj)[randomIndex];
};

/**
 * Wrapper function for SWR.
 * See {@link https://swr.vercel.app/docs/data-fetching}
 *
 * @param url http route to submit get request from
 * @returns json data
 */
export const fetcher = (url: string) => fetch(url).then((res) => res.json());
