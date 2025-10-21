// @flow strict
export const isBrowser: boolean =
    typeof window !== 'undefined' && typeof window.scrollY === 'number';
