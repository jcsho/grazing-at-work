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
