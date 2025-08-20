
import { MyConnectButton } from './ConnectButton/connectBtn'

export const MyApps = (props) => {
    const { isLoginFirst } = props
    return (
        <div >
            <MyConnectButton isLoginFirst={isLoginFirst} />
        </div>
    )
}