import React, { createContext, useEffect } from "react";
import SignalRService from "./SignalRService";

export const SignalRContext = createContext<signalR.HubConnection | null>(null);

export const SignalRProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const signalRService = SignalRService.getInstance();

  useEffect(() => {
    signalRService.startConnection();

    return () => {
      signalRService.stopConnection();
    };
  }, [signalRService]);

  return (
    <SignalRContext.Provider value={signalRService.connection}>
      {children}
    </SignalRContext.Provider>
  );
};
