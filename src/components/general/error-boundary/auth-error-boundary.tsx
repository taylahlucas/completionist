import React, { useCallback } from 'react';

// TODO: Remove this?
function AuthErrorBoundaryInner({
  onAuthError,
  children,
}: {
  onAuthError: () => void;
  children: React.ReactNode;
}) {
  class ErrorBoundary extends React.Component {
    componentDidCatch(error: any) {
      if (error?.message === 'AUTH_MISSING_USER') {
        onAuthError();
      }
    }
    render() {
      return children;
    }
  }

  return <ErrorBoundary />;
}

export const AuthErrorBoundary = ({
  onAuthError,
  children,
}: {
  onAuthError: () => void;
  children: React.ReactNode;
}) => {
  const handleAuthError = useCallback(() => {
    onAuthError();
  }, [onAuthError]);

  return (
    <AuthErrorBoundaryInner onAuthError={handleAuthError}>
      {children}
    </AuthErrorBoundaryInner>
  );
};
