export default function objectsAreEqual(obj1: any, obj2: any): boolean {
    // Get all keys from both objects
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    // If number of keys is different,
    // then objects are not equal
    if (keys1.length !== keys2.length) {
        return false;
    }

    // Compare all keys and their values in both objects.
    // If any key-value pair does not match, then objects are not equal.
    for (let key of keys1) {
        if (obj1[key] !== obj2[key]) {
            return false;
        }
    }

    // If none of the previous checks failed, then objects are equal.
    return true;
}
