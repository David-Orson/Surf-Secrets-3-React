export interface UI {
    toast: {
        isOpen: boolean;
        severity: 'success' | 'info' | 'warning' | 'error' | undefined;
        messages: string[];
    };
}
