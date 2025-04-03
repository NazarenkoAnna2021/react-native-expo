import { describe, expect, it } from '@jest/globals';
import { profilesService } from '../entities/profilesService';

describe('profiles', () => {
    it('get profiles', async () => {
        const res = await profilesService.getProfiles();
        expect(res).toEqual({ isError: false });
    });
});