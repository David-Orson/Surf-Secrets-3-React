import { useAccountService } from './accountService';
import { useAuthService } from './authService';

export const useServices = () => {
    return {
        ...useAccountService(),
        ...useAuthService(),
    };
};
