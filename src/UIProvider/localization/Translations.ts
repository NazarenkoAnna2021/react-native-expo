import { TLocales } from "./ILocalization";

export const translations: { [key in TLocales]: { [key: string]: string } } = {
        en: {
                email: 'email',
                password: 'password',
                logIn: 'Log In',
                signIn: 'Sign In',
                authentication: 'Authentication',
                website: 'Website',
                username: 'Username',
                profile: 'Profile',
                update: 'Update'
        },
};