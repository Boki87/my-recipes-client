import React from 'react'
import ModalsProvider, {useModalsContext} from './ModalsContext'

export {
    useModalsContext
}

const CombinedContext = ({children}) => {
    return (
        <ModalsProvider>
            {children}
        </ModalsProvider>
    )
}

export default CombinedContext
