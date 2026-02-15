// A lightweight native replacement for lodash/pick
export function pick(obj: any, ...keys: string[]) {
    const ret: any = {};
    keys.forEach(key => {
        if (obj && Object.prototype.hasOwnProperty.call(obj, key)) {
            ret[key] = obj[key];
        }
    });
    return ret;
}
