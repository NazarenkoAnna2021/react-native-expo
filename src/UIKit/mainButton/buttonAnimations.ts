import { IColors } from "../../UIProvider/theme/IColors";

class ButtonAnimations {

    constructor(private colors: IColors, private type: 'main' | 'no_background' | 'with_icon') { }

    public buttonColors = {
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
            text_active: this.colors.border_inactive,
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
    public pressedIn = {
        0: {
            backgroundColor: this.buttonColors[this.type].default,
        },
        1: {
            backgroundColor: this.buttonColors[this.type].active
        },
    }
    public pressedOut = {
        0: {
            backgroundColor: this.buttonColors[this.type].active
        },
        1: {
            backgroundColor: this.buttonColors[this.type].default,
        },
    }
    public pressedInText = {
        0: {
            color: this.buttonColors[this.type].text_default,
        },
        1: {
            color: this.buttonColors[this.type].text_active,
        },
    }
    public pressedOutText = {
        0: {
            color: this.buttonColors[this.type].text_active,
        },
        1: {
            color: this.buttonColors[this.type].text_default,
        },
    }

    public disabledView = {
        0: {
            backgroundColor: this.buttonColors[this.type].active,
            borderColor: this.buttonColors[this.type].border
        },
        1: {
            backgroundColor: this.buttonColors[this.type].disabled,
            borderColor: this.buttonColors[this.type].border_disabled
        }
    }

    public enabledView = {
        0: {
            backgroundColor: this.buttonColors[this.type].disabled,
            borderColor: this.buttonColors[this.type].border_disabled
        },
        1: {
            backgroundColor: this.buttonColors[this.type].default,
            borderColor: this.buttonColors[this.type].border
        }
    }

    public disabledText = {
        0: {
            color: this.buttonColors[this.type].text_default
        },
        1: {
            color: this.buttonColors[this.type].text_disabled
        }
    }

    public enabledText = {
        0: {
            color: this.buttonColors[this.type].text_disabled
        },
        1: {
            color: this.buttonColors[this.type].text_default
        }
    }
};


export const getButtonAnimations = (colors: IColors, type: 'main' | 'no_background' | 'with_icon') => {
    return new ButtonAnimations(colors, type);
};