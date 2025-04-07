import { IColors } from "../../UIProvider/theme/IColors";

class Animations {

    constructor(private colors: IColors, private type: 'main' | 'password') { }

    private _inputColors = {
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
        password: {
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

    get inputColors() {
        return this._inputColors[this.type];
    }

    public eyeIconPressIn: any = {
        from: {
            scale: 1,
        },
        to: {
            scale: 1.2
        },
    }
    public eyeIconPressOut: any = {
        from: {
            scale: 1.2,
        },
        to: {
            scale: 1
        },
    }
};


export const getAnimations = (colors: IColors, type: 'main' | 'password') => {
    return new Animations(colors, type);
};