import { Memory } from '../framework/memory';
/**
 * Decorator factory to mark a class as a controller.
 * @returns {Function} Decorator function.
 */
export function Controller() {
    /**
     * Decorator function to mark a class as a controller and register its instance.
     * @param {Function} target - The class constructor.
     */
    return function (target) {
        // Instantiate the controller class
        var instance = new target();
        // Register the controller instance into memory
        Memory.getInstance().get('controllers').push({
            instance: instance,
            constructor: target
        });
    };
}
