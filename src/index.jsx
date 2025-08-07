
import { createRoot } from "react-dom/client";

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { WagmiProvider, http } from 'wagmi'
import { baseSepolia, mainnet, sepolia, base } from 'wagmi/chains'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { RainbowKitProvider, getDefaultConfig, darkTheme, lightTheme } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'

import { Register } from "./components/AdminReview/ArtworkRegistrationReview/ArtworkRegistration/ArtworkRegistration";
import { ArtworkInformation } from "./components/AdminReview/ArtworkRegistrationReview/ArtworkInformation/ArtworkInformation";
import { Nft } from "./components/AdminReview/ArtworkRegistrationReview/NFtInformation/nftInformation"



const queryClient = new QueryClient()
const network = import.meta.env.VITE_NETWORK === 'base' ? base : baseSepolia
const config = getDefaultConfig({
  appName: 'btart',
  projectId: 'c628b90f3c14478efc0592828dd41575',
  chains: [network],
  transports: {
    [network.id]: http(),
  },
})
createRoot(document.getElementById("app")).render(
  <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <RainbowKitProvider locale="en">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register/:id" element={<ArtworkInformation />} />
            <Route path="/nftinfo/:id" element={<Nft />} />
          </Routes>
        </BrowserRouter>
      </RainbowKitProvider>
    </QueryClientProvider>
  </WagmiProvider>
);
