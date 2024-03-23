import { Memory } from '../framework/memory';
export function Controller() {
    return function (target) {
        var inst = new target();
        Memory.getInstance().get('controllers').push({
            instance: inst,
            constructor: target
        });
    };
}
