import { useState, createContext } from "react";

export const ModalContext = createContext();

export function ModalContextProvider(props) {
  const [showModal, setShowModal] = useState(false);

  return <ModalContext.Provider value={{ showModal, setShowModal }}>{props.children}</ModalContext.Provider>;
}
