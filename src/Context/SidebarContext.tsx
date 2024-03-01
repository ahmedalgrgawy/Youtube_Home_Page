import { ReactNode, createContext, useContext, useEffect, useState } from "react"

type sidebarProviderProps = {
    children: ReactNode
}

type sidebarContextTpye = {
    isLargeOpen: boolean,
    isSmallOpen: boolean,
    toggle: () => void
    close: () => void
}

const SidebarContext = createContext<sidebarContextTpye | null>(null)

export function UseSidebarContext() {
    const value = useContext(SidebarContext)
    if (value == null) throw Error('There is something wrong')

    return value;
}

export function SidebarProvider({ children }: sidebarProviderProps) {

    const [isLargeOpen, setIsLargeOpen] = useState(true);
    const [isSmallOpen, setIsSmallOpen] = useState(false);

    useEffect(() => {
        const handler = () => {
            if (!isScreenSmall()) {
                setIsSmallOpen(false);
            }
        }
        window.addEventListener('resize', handler);

        return () => {
            window.removeEventListener('resize', handler);
        }

    }, [])

    function isScreenSmall() {
        return window.innerWidth < 1024
    }

    function toggle() {
        if (isScreenSmall()) {
            setIsSmallOpen(s => !s)
        } else {
            setIsLargeOpen(l => !l)
        }
    }

    function close() {
        if (isScreenSmall()) {
            setIsSmallOpen(false)
        } else {
            setIsLargeOpen(false)
        }
    }

    return (
        <SidebarContext.Provider value={{
            isLargeOpen,
            isSmallOpen,
            toggle,
            close
        }}>
            {children}
        </SidebarContext.Provider>
    )
}
