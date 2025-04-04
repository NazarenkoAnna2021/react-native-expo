import { jest } from '@jest/globals';

const mockAuthData = {
    user: {
    },
    session: {
    },
    weakPassword: {
    }
};

const mockError = {
    code: '',
    status: 400,
    message: 'some error text'

};

export default jest.mock('@supabase/supabase-js', () => {
    return {
        createClient: jest.fn().mockImplementation(() => {
            return {
                from: jest.fn().mockReturnThis(),
                auth: {
                    signUp: jest.fn().mockImplementation((value: any) => {
                        const existingCredentials = {
                            email: 'test@test.com',
                            password: 'Password1!'
                        };
                        if (existingCredentials.email === value.email || !value.email || !value.password) {
                            return Promise.reject(mockError);
                        } else {
                            return Promise.resolve({
                                data: mockAuthData,
                                error: null,
                            });
                        }
                    }),
                    signInWithPassword: jest.fn().mockImplementation((value: any) => {
                        const existingCredentials = {
                            email: 'test@test.com',
                            password: 'Password1!'
                        };
                        if (existingCredentials.email === value.email && existingCredentials.password === value.password) {
                            return Promise.resolve({
                                data: mockAuthData,
                                error: null,
                            });
                        } else {
                            return Promise.reject(mockError);
                        }
                    })
                },
                insert: jest.fn().mockImplementation(() => ({
                    eq: jest.fn().mockReturnThis(),
                    in: jest.fn().mockReturnThis(),
                    is: jest.fn().mockReturnThis(),
                    order: jest.fn().mockReturnThis(),
                    gte: jest.fn().mockReturnThis(),
                    lte: jest.fn().mockReturnThis(),
                    contains: jest.fn().mockReturnThis(),
                    single: jest.fn().mockReturnThis(),
                    select: jest.fn().mockReturnThis(),
                    execute: jest.fn().mockImplementation(() => {
                        return Promise.resolve({
                            data: [{ id: 0, persons: [0, 1] }],
                            error: null,
                        });
                    }),
                })),
                select: jest.fn().mockImplementation(() => ({
                    eq: jest.fn().mockReturnThis(),
                    in: jest.fn().mockReturnThis(),
                    is: jest.fn().mockReturnThis(),
                    order: jest.fn().mockReturnThis(),
                    gte: jest.fn().mockReturnThis(),
                    lte: jest.fn().mockReturnThis(),
                    contains: jest.fn().mockReturnThis(),
                    single: jest.fn().mockReturnThis(),
                    neq: jest.fn().mockReturnThis(),
                    execute: jest.fn().mockImplementation(() => {
                        return Promise.resolve({
                            data: [{ id: 0, persons: [0, 1] }],
                            error: null,
                        });
                    }),
                })),
            };
        }),
    }
});