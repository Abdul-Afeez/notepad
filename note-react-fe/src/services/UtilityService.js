export function _UtilityService() {
    const _getToken = () => localStorage.getItem('access');
    const _setToken = (value) => localStorage.setItem('access', value);
    const _extractValidationError =  (validationErrors) => {
        const result = [];
        if(!validationErrors) {
            return [];
        }
        for (const error in validationErrors) {
            result.push(validationErrors[error][0]);
        }
        return result;
    }
    return {
        extractValidationError: _extractValidationError,
        getToken: _getToken,
        setToken: _setToken
    }
}
