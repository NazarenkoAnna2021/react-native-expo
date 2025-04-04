import { jest } from '@jest/globals';

jest.mock('@react-native-async-storage/async-storage', () => {
    let cache: any = {};
    return {
        setItem: jest.fn().mockImplementation((key: any, value: any) => {
            return Promise.resolve(cache[key] = value);
        }),
        getItem: jest.fn().mockImplementation((key: any) => {
            return Promise.resolve(cache[key] ?? null);
        }),
        removeItem: jest.fn().mockImplementation((key: any) => {
            return Promise.resolve(delete cache[key]);
        }),
        multiRemove: jest.fn().mockImplementation((_key: any) => {
            return Promise.resolve(cache = {});
        }),
    }
});