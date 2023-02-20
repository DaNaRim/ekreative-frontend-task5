import {ReactNode} from "react"
import {useMediaQuery} from "react-responsive"

const DESKTOP_MIN_WIDTH: number = 992
const TABLET_MIN_WIDTH: number = 768

export const Desktop = ({children}: {children: ReactNode}) => {
    const isDesktop = useMediaQuery({minWidth: DESKTOP_MIN_WIDTH})
    return isDesktop ? children : null
}
export const Tablet = ({children}: {children: ReactNode}) => {
    const isTablet = useMediaQuery({minWidth: TABLET_MIN_WIDTH, maxWidth: DESKTOP_MIN_WIDTH - 1})
    return isTablet ? children : null
}
export const Mobile = ({children}: {children: ReactNode}) => {
    const isMobile = useMediaQuery({maxWidth: TABLET_MIN_WIDTH - 1})
    return isMobile ? children : null
}
export const Default = ({children}: {children: ReactNode}) => {
    const isNotMobile = useMediaQuery({minWidth: TABLET_MIN_WIDTH})
    return isNotMobile ? children : null
}