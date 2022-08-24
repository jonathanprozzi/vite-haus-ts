import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import { useBreakpoint, widthQuery, ParMd, Button, H1, H2 } from '@daohaus/ui';
import { DaoHausNav, useHausConnect } from '@daohaus/daohaus-connect-feature';
import { Haus, ITransformedMembership } from '@daohaus/dao-data';
import {
  ENDPOINTS,
  networkData,
  ValidNetwork,
} from '@daohaus/common-utilities';

function App() {
  // const { address } = useHausConnect();
  const address = import.meta.env.VITE_TEST_ADDRESS;
  console.log('address', address);

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
          // TODO: add delegate filter
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
  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <H1>Vite Starter</H1>
      {/* <DaoHausNav /> */}
      <H2>Sub Heading</H2>
      <ParMd>Testing this out</ParMd>
      <Button>Click me</Button>
    </div>
  );
}

export default App;
