import React, { useState, createContext } from 'react'

const ModalUserContext = createContext({});

export function ModalUserContextProvider({ children }) {
    // son 3 modales todos los pongo en 1 contexto para facilitar la lectura de las etiquetas
    const [openCloseAdd, setOpenCloseAdd] = useState(false);
    const [openCloseEdit, setOpenCloseEdit] = useState(false);
    const [openCloseDelete, setOpenCloseDelete] = useState(false);
    const [IDUserToEdit, setIDUserToEdit] = useState('');
    const [search, setSearch] = useState('');
    const [searchEmail, setSearchEmail] = useState('');

    return(
        <ModalUserContext.Provider value={{
            openCloseAdd, setOpenCloseAdd, 
            openCloseEdit, setOpenCloseEdit, 
            openCloseDelete, setOpenCloseDelete, 
            IDUserToEdit, setIDUserToEdit,
            search, setSearch,
            searchEmail, setSearchEmail
            }} 
        >
            { children }
        </ModalUserContext.Provider>
    )
}

export default ModalUserContext;