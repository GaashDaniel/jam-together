import { useCallback } from 'react';
import { useToast } from './useToast';
export const useFormSubmitValidation = (formState, requiredFields = [], originalOnSubmit) => {
    const { showToast } = useToast();
    const hasErrors = useCallback(() => {
        const { errors } = formState;
        return Object.keys(errors).some((key) => Boolean(errors[key]));
    }, [formState]);
    const hasAllRequiredFields = useCallback(() => {
        const { values } = formState;
        return requiredFields.every((field) => {
            const value = values[field];
            if (Array.isArray(value)) {
                return value.length > 0;
            }
            return value !== null && value !== undefined && value !== '';
        });
    }, [formState, requiredFields]);
    const getFirstError = useCallback(() => {
        const { errors } = formState;
        const errorValues = Object.values(errors).filter(Boolean);
        return errorValues.length > 0 ? errorValues[0] : null;
    }, [formState]);
    const canSubmit = useCallback(() => {
        const { isSubmitting, isValidating } = formState;
        if (isSubmitting || isValidating) return false;
        if (hasErrors()) return false;
        if (!hasAllRequiredFields()) return false;
        return true;
    }, [formState, hasErrors, hasAllRequiredFields]);
    const handleSubmit = useCallback(
        async (event) => {
            if (event) {
                event.preventDefault();
            }
            const { values, setTouched, setFieldError } = formState;
            if (formState.isSubmitting) {
                return;
            }
            if (setTouched) {
                const allFieldNames = Object.keys(values);
                const allTouched = {};
                allFieldNames.forEach((name) => {
                    allTouched[name] = true;
                });
                setTouched(allTouched);
            }
            if (hasErrors()) {
                const firstError = getFirstError();
                if (firstError) {
                    showToast(`Please fix the following error: ${firstError}`, 'error');
                }
                return;
            }
            if (!hasAllRequiredFields()) {
                const missingFields = requiredFields.filter((field) => {
                    const value = values[field];
                    if (Array.isArray(value)) return value.length === 0;
                    return value === null || value === undefined || value === '';
                });
                if (missingFields.length > 0) {
                    const fieldNames = missingFields
                        .map((field) =>
                            field
                                .replace(/([A-Z])/g, ' $1')
                                .replace(/^./, (str) => str.toUpperCase())
                                .trim()
                        )
                        .join(', ');
                    showToast(
                        `Please fill in the following required fields: ${fieldNames}`,
                        'error'
                    );
                }
                return;
            }
            try {
                if (originalOnSubmit) {
                    await originalOnSubmit(values, formState);
                }
            } catch (error) {
                console.error('Form submission error:', error);
                showToast(error.message || 'An error occurred while submitting the form', 'error');
            }
        },
        [
            formState,
            requiredFields,
            originalOnSubmit,
            hasErrors,
            hasAllRequiredFields,
            getFirstError,
            showToast,
        ]
    );
    const getSubmitButtonProps = useCallback(
        (additionalProps = {}) => ({
            type: 'submit',
            disabled: !canSubmit(),
            ...additionalProps,
        }),
        [canSubmit]
    );
    return {
        canSubmit,
        hasErrors,
        hasAllRequiredFields,
        getFirstError,
        handleSubmit,
        getSubmitButtonProps,
        isValid: canSubmit(),
        isSubmitDisabled: !canSubmit(),
    };
};
export default useFormSubmitValidation;