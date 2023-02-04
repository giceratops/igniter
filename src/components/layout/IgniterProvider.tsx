import React from 'react';

type IgniterContextType = unknown

type IgniterProviderProps = {
  children?: React.ReactNode;
}

const IgniterContext = React.createContext<IgniterContextType>({});

const IgniterConsumer = IgniterContext.Consumer;


const IgniterProvider = (props: IgniterProviderProps) => {
  return (
    <IgniterContext.Provider value={{}}>
      {props.children}
    </IgniterContext.Provider>
  )
}

export { IgniterProvider, IgniterConsumer, IgniterContext };