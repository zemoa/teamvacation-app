export default class Utils {
  static insertIntoList<T>(value: T, list: T[], predicate: (value: T) => boolean): T[] {
    if(list){
      const index = list.findIndex(predicate);
      if(index > -1) {
        list.splice(index, 1, value);
      } else {
        list.push(value);
      }
    }
    return list;
  }

  static modifyIntoList<T>(list:T[], predicate: (value: T) => boolean, modifToAppli: (value: T) => T): T[] {
    let result: T[];
    if(list) {
      const index = list.findIndex(predicate);
      if(index > -1) {
        let foundValue = list[index];
        foundValue = modifToAppli(foundValue);
        result = [...list];
        result.splice(index, 1, foundValue);
      }
    } else {
      result = list;
      console.warn("list is null");
    }
    return result;
  }

  static removeFromList<T>(list: T[], predicate: (value: T) => boolean): T[] {
    let result: T[];
    if(list) {
      const index = list.findIndex(predicate);
      if(index > -1) {
        [...list].splice(index, 1);
      }
    } else {
      result = list;
      console.warn("list is null");
    }
    return result;
  }

  static removeFromListAndPop<T>(list: T[], predicate: (value: T) => boolean): T {
    let result: T;
    if(list) {
      const index = list.findIndex(predicate);
      if(index > -1) {
        result = list.splice(index, 1)[0];
      }
    }
    return result;
  }
}
