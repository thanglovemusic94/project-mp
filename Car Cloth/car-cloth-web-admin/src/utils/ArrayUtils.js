/**
 * change place old index array to new index
 * @param arr
 * @param old_index
 * @param new_index
 * @Example array_move([1,2,3], 1, 2)
 * @returns [1,3,2]
 */
export function array_move(arr, old_index, new_index) {
    if (new_index < 0) {
        arr.splice(arr.length, 0, arr.splice(old_index, 1)[0]);
    } else if (new_index > arr.length - 1) {
        arr.splice(0, 0, arr.splice(old_index, 1)[0]);
    } else arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);

    return arr;
};


