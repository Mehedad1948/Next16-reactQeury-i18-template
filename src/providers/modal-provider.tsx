'use client';

import dynamic from 'next/dynamic';

// Lazy load modals so they don't slow down initial page load!

export function ModalProvider() {
  return (
    <>
      {/* <AuthModal paramKey="login" />
      <FeedbackModal paramKey="feedback" /> */}
    </>
  );
}
