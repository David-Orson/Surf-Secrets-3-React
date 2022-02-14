import { useAccountService } from './account';
import { useAuthService } from './auth';
import { useFinderService } from './finder';
import { useMapService } from './map';

export const useServices = () => {
    return {
        ...useAccountService(),
        ...useAuthService(),
        ...useFinderService(),
        ...useMapService(),
    };
};
