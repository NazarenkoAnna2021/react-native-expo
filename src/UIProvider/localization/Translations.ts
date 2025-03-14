import { TLocales } from "./ILocalization";

export const translations: { [key in TLocales]: { [key: string]: string } } = {
        en: {
                appName: 'Chart',
                temperature: 'Temperature',
                precipitation: 'Chance of Precipitation',
                theme: 'Theme'
        },
        uk: {
                appName: 'Графік',
                temperature: 'Температура',
                precipitation: 'Ймовірність опадів',
                theme: 'Тема'
        },
        fr: {
                appName: 'Graphique',
                temperature: 'Température',
                precipitation: 'Probabilité de précipitations',
                theme: 'Thème'
        }
};