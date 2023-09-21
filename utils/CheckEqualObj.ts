export default function objectsAreEqual(obj1: any, obj2: any): boolean {
    if (obj1 === obj2) return true; // Check reference equality
    if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null) return false;
  
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
  
    if (keys1.length !== keys2.length) return false;
  
    for (let key of keys1) {
      if (!keys2.includes(key)) return false; // Check if obj2 has the same key
      if (typeof obj1[key] === 'object' && obj1[key] !== null) {
        // If the value is an object, perform a recursive call
        if (!objectsAreEqual(obj1[key], obj2[key])) return false;
      } else {
        if (obj1[key] !== obj2[key]) return false; // Check value equality
      }
    }
  
    return true;
  }
  