import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import {
  useBreakpoint,
  widthQuery,
  ParMd,
  Button,
  H1,
  H2,
  SingleColumnLayout,
  Footer,
  DataMd,
} from '@daohaus/ui';
import {
  DaoHausNav,
  HausLayout,
  useHausConnect,
} from '@daohaus/daohaus-connect-feature';
import { Haus, ITransformedMembership } from '@daohaus/dao-data';
import {
  ENDPOINTS,
  networkData,
  ValidNetwork,
} from '@daohaus/common-utilities';
import { TXBuilder } from '@daohaus/tx-builder-feature';
import Web3 from 'web3';
import FormTest from './FormTest';

function App() {
  // const { address, provider } = useHausConnect();
  const address = '0x83aB8e31df35AA3281d630529C6F4bf5AC7f7aBF';
  console.log('address', address);

  // const provider = ethers
  const web3 = new Web3(
    new Web3.providers.HttpProvider(
      'https://787b6618b5a34070874c12d7157e6661.goerli.rpc.rivet.cloud'
    )
  );

  const [loading, setLoading] = useState(true);
  const [daoData, setDaoData] = useState<ITransformedMembership[]>([]);

  const temporaryInitHaus = () => {
    return Haus.create();
  };

  const [filterNetworks] = useState<Record<string, string>>(
    Object.keys(networkData).reduce(
      (acc, networkId) => ({ [networkId]: networkId }),
      {}
    )
  );

  useEffect(() => {
    let shouldUpdate = true;
    const getDaos = async (address: string) => {
      setLoading(true);
      try {
        const haus = temporaryInitHaus();
        const query = await haus.profile.listDaosByMember({
          memberAddress: address,
          networkIds: Object.keys(filterNetworks) as ValidNetwork[],
          includeTokens: false,
        });

        if (query.data?.daos && shouldUpdate) {
          setDaoData(query.data.daos);
        }
      } catch (error) {
        error instanceof Error
          ? console.error(error.message)
          : console.error('Well....');
      } finally {
        setLoading(false);
      }
    };

    if (!address || !shouldUpdate) return;

    getDaos(address);

    return () => {
      shouldUpdate = false;
    };
  }, [address, filterNetworks]);

  const isSm = useBreakpoint(widthQuery.sm);
  console.log('isSm', isSm);

  console.log('endpoints', ENDPOINTS);

  const haus = Haus.create();
  console.log('haus', haus);

  console.log('dao data', daoData);

  if (!web3?.currentProvider) {
    return null;
  }
  return (
    <TXBuilder provider={web3.givenProvider} chainId="0x5" appState={{}}>
      <SingleColumnLayout>
        <>
          {/* <DaoHausNav /> */}
          <H2>Sub Heading</H2>
          <ParMd>Testing this out</ParMd>
          <Button>Click me</Button>
          {daoData &&
            daoData.map((dao) => {
              return <DataMd key={dao.dao}>{dao.name}</DataMd>;
            })}
        </>
        <FormTest />
      </SingleColumnLayout>
      <Footer />
    </TXBuilder>
  );
}

export default App;
