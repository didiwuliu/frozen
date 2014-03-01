(function () {
    // The CocoonJS must exist before creating the extension.
    if (typeof window.CocoonJS === 'undefined' || window.CocoonJS === null) throw("The CocoonJS object must exist and be valid before creating any extension object.");

    /**
     * This namespace represents the functionalities related to OUYA android gaming control.
     * @namespace
     */
    CocoonJS.Gamepad = {};

    CocoonJS.Gamepad.nativeExtensionObjectAvailable = CocoonJS.nativeExtensionObjectAvailable && typeof window.ext.Gamepad !== 'undefined';

    CocoonJS.Gamepad.Indices = {
        BUTTON_0                : 0, 
        BUTTON_1                : 1,
        BUTTON_2                : 2,
        BUTTON_3                : 3,
        BUTTON_LEFT_BUMPER      : 4,
        BUTTON_RIGHT_BUMPER     : 5,
        
        BUTTON_LEFT_TRIGGER     : 6,
        BUTTON_RIGHT_TRIGGER    : 7,
        
        BUTTON_LEFT_JOYSTICK    : 10,
        BUTTON_RIGHT_JOYSTICK   : 11,
        BUTTON_DPAD_UP          : 12,
        BUTTON_DPAD_DOWN        : 13,
        BUTTON_DPAD_LEFT        : 14,
        BUTTON_DPAD_RIGHT       : 15,
        BUTTON_MENU             : 16,
        
        AXE_LEFT_JOYSTICK_X     : 0,
        AXE_LEFT_JOYSTICK_Y     : 1,
        AXE_RIGHT_JOYSTICK_X    : 2,
        AXE_RIGHT_JOYSTICK_Y    : 3
    };

    // If the extension is present and the navigator does not provide the gamepad API:
    // 1.- Add the getGamepads function to the navigator object.
    // 2.- Replace the window add and remove event listener functions to call to the extension for the gamepad related events.
    var systemSupportsGamepads = navigator["getGamepads"] || navigator["webkitGetGamepads"];
    if (CocoonJS.Gamepad.nativeExtensionObjectAvailable && !systemSupportsGamepads)
    {
        navigator.getGamepads = function()
        {
            return window.ext.Gamepad.makeCall("getGamepads");
        };

        CocoonJS.Gamepad.originalWindowAddEventListener = window.addEventListener;
        CocoonJS.Gamepad.originalWindowRemoveEventListener = window.removeEventListener;

        window.addEventListener = function(eventName, callback)
        {
            console.log("The new window.addEventListener has been called.");
            if (eventName === "gamepadconnected" || eventName === "gamepaddisconnected")
            {
                window.ext.Gamepad.addEventListener(eventName, callback);
            }
            else
            {
                var argumentsArray = Array.prototype.slice.call(arguments);
                CocoonJS.Gamepad.originalWindowAddEventListener.apply(window, argumentsArray);
            }
        };
        window.removeEventListener = function(eventName, callback)
        {
            console.log("The new window.removeEventListener has been called.");
            if (eventName === "gamepadconnected" || eventName === "gamepaddisconnected")
            {
                window.ext.Gamepad.removeEventListener(eventName, callback);
            }
            else
            {
                var argumentsArray = Array.prototype.slice.call(arguments);
                CocoonJS.Gamepad.originalWindowRemoveEventListener.apply(window, argumentsArray);
            }
        };
    } 
    else if (systemSupportsGamepads) 
    {
        if (!navigator.getGamepads)
        {
            console.log("navigator.getGamepads does not exist.");
            if (navigator.webkitGetGamepads)
            {
                console.log("navigator.webkitGamepads exists, adding navigator.getGamepads to point to it.");
                navigator.getGamepads = navigator.webkitGetGamepads;
            }
            else
            {
                console.log("navigator.webkitGetGamepads does not exist either.");
            }
        }
    }
})();



