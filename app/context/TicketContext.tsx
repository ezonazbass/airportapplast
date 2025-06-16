import React, { createContext, useContext, useState } from 'react';

interface Ticket {
  id: string;
  flightId: string;
  airline: string;
  from: string;
  to: string;
  date: string;
  time: string;
  status: string;
  gate: string;
  price: number;
  currency: string;
}

interface TicketContextType {
  tickets: Ticket[];
  addTicket: (ticket: Ticket) => void;
}

const TicketContext = createContext<TicketContextType | undefined>(undefined);

export function TicketProvider({ children }: { children: React.ReactNode }) {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  const addTicket = (ticket: Ticket) => {
    setTickets(prevTickets => [...prevTickets, ticket]);
  };

  return (
    <TicketContext.Provider value={{ tickets, addTicket }}>
      {children}
    </TicketContext.Provider>
  );
}

export function useTickets() {
  const context = useContext(TicketContext);
  if (context === undefined) {
    throw new Error('useTickets must be used within a TicketProvider');
  }
  return context;
}

export default TicketProvider; 