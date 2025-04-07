import { IColors } from "../../UIProvider/theme/IColors";
import { scaleFontSize } from "../../Utils";

class Animations {

    constructor(private colors: IColors, private type: 'main' | 'no_background' | 'with_icon') { }

    private _buttonColors = {
        main: {
            default: this.colors.primary,
            active: this.colors.primary_active,
            disabled: this.colors.inactive,
            text_default: this.colors.text_inverted,
            text_active: this.colors.text_inverted,
            text_disabled: this.colors.text_inverted,
            border: this.colors.text,
            border_disabled: this.colors.border_inactive,
        },
        no_background: {
            default: 'transparent',
            active: 'transparent',
            disabled: 'transparent',
            text_default: this.colors.title,
            text_active: this.colors.title,
            text_disabled: this.colors.inactive,
            border: 'transparent',
            border_disabled: 'transparent',
        },
        with_icon: {
            default: this.colors.card,
            active: this.colors.card_inactive,
            disabled: this.colors.inactive,
            text_default: this.colors.title,
            text_active: this.colors.title,
            text_disabled: this.colors.title,
            border: this.colors.text,
            border_disabled: this.colors.border_inactive,
        },
    }

    get buttonColors() {
        return this._buttonColors[this.type];
    }

    public pressedIn = {
        0: {
            backgroundColor: this.buttonColors.default,
            scale: 1,
        },
        1: {
            backgroundColor: this.buttonColors.active,
            scale: 1.05
        },
    }
    public pressedOut = {
        0: {
            backgroundColor: this.buttonColors.active,
            scale: 1.05,
        },
        1: {
            backgroundColor: this.buttonColors.default,
            scale: 1
        },
    }
    public pressedInText = {
        0: {
            color: this.buttonColors.text_default,
            fontSize: scaleFontSize(14),
        },
        1: {
            color: this.buttonColors.text_active,
            fontSize: scaleFontSize(15),
        },
    }
    public pressedOutText = {
        0: {
            color: this.buttonColors.text_active,
            fontSize: scaleFontSize(15),
        },
        1: {
            color: this.buttonColors.text_default,
            fontSize: scaleFontSize(14),
        },
    }

    public disabledView = {
        0: {
            backgroundColor: this.buttonColors.active,
            borderColor: this.buttonColors.border
        },
        1: {
            backgroundColor: this.buttonColors.disabled,
            borderColor: this.buttonColors.border_disabled
        }
    }

    public enabledView = {
        0: {
            backgroundColor: this.buttonColors.disabled,
            borderColor: this.buttonColors.border_disabled
        },
        1: {
            backgroundColor: this.buttonColors.default,
            borderColor: this.buttonColors.border
        }
    }

    public disabledText = {
        0: {
            color: this.buttonColors.text_default
        },
        1: {
            color: this.buttonColors.text_disabled
        }
    }

    public enabledText = {
        0: {
            color: this.buttonColors.text_disabled
        },
        1: {
            color: this.buttonColors.text_default
        }
    }
};


export const getAnimations = (colors: IColors, type: 'main' | 'no_background' | 'with_icon') => {
    return new Animations(colors, type);
};