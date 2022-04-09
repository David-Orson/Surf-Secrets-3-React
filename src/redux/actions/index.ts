import { useAccountActions } from './accountActions';
import { useNetworkActions } from './networkActions';
import { useUIActions } from './uiActions';
export const useActions = () => {
    return {
        ...useAccountActions(),
        ...useNetworkActions(),
        ...useUIActions(),
    };
};
