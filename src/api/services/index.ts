import { useAccountService } from './account';
import { useAuthService } from './auth';
import { useFinderService } from './finder';
import { useMapService } from './map';
import { useMatchService } from './match';

export const useServices = () => {
    return {
        ...useAccountService(),
        ...useAuthService(),
        ...useFinderService(),
        ...useMapService(),
        ...useMatchService(),
    };
};
