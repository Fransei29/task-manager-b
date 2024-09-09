"use client";

import { SessionProvider as Provider } from 'next-auth/react';

// Wrap the children components with SessionProvider to manage session state
export default function SessionProvider({ children }) {
  return <Provider>{children}</Provider>;
}
