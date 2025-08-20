import { useDisconnect } from 'wagmi'

function DisconnectBtn() {
  const { disconnect } = useDisconnect()

  return (
    <button onClick={() => disconnect()}>
      Disconnect
    </button>
  )
}
export default DisconnectBtn;