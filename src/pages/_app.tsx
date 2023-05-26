import '../styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Box, Flex } from '@chakra-ui/react';
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { mainnet, polygon, optimism , polygonMumbai , filecoinHyperspace } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { ResearcherProvider } from '../../context/ResearcherContext';
import type { AppProps } from 'next/app';
import { PolybaseProvider , AuthProvider} from "@polybase/react";
import { Polybase } from "@polybase/client";
import { Auth } from "@polybase/auth";

function MyApp({ Component, pageProps }: AppProps) {
  const { chains, provider } = configureChains(
    [mainnet, polygon, optimism , polygonMumbai , filecoinHyperspace],
    [
      publicProvider()
    ]
  );
  
  const { connectors } = getDefaultWallets({
    appName: 'My RainbowKit App',
    projectId: 'YOUR_PROJECT_ID',
    chains
  });
  
  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider
  });

  // polybase
  const polybase = new Polybase();
  const auth: Auth | null = typeof window !== "undefined" ? new Auth() : null;

  return (
    <ChakraProvider>
      <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <PolybaseProvider polybase={polybase}>
        <AuthProvider
          // @ts-ignore
          auth={auth}
          polybase={polybase}>
            <Flex flexDirection="column" minHeight="100vh">
              <Navbar />
              <Box flex="1">
                <ResearcherProvider>
                  <Component {...pageProps} />
                </ResearcherProvider>
              </Box>
              <Footer />
            </Flex>
        </AuthProvider>
        </PolybaseProvider>
      </RainbowKitProvider>
      </WagmiConfig>
    </ChakraProvider>
  )
}

export default MyApp;
