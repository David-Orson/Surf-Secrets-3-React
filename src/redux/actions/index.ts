import { useAccountActions } from './accountActions';
import { useNetworkActions } from './networkActions';
export const useActions = () => {
    return {
        ...useAccountActions(),
        ...useNetworkActions(),
    };
};
