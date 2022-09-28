import { useState, useEffect } from 'react';
import {
  OuterLayout,
  widthQuery,
  ParMd,
  Button,
  H1,
  H2,
  useBreakpoint,
  SingleColumnLayout,
  AddressDisplay,
} from '@daohaus/ui';
import {
  ConnectButton,
  NetworkButton,
  DaoHausNav,
  useHausConnect,
  HausLayout,
  ExplorerLink,
} from '@daohaus/daohaus-connect-feature';
import { Haus, ITransformedMembership } from '@daohaus/dao-data';
import {
  ENDPOINTS,
  networkData,
  ValidNetwork,
} from '@daohaus/common-utilities';

function App() {
  // const { address } = useHausConnect();

  const address = '0x0B5f5a722Ac5E8EcEDf4da39A656fe5f1e76b34C';

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
        console.log('query ', query);
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

  return (
    <div className="App">
      <OuterLayout>
        <SingleColumnLayout>
          <H1>DAOhaus UI H1</H1>
          <H2>H2</H2>
          <ParMd>Paragraph text</ParMd>
          <AddressDisplay address={address} />
          <Button>Primary Button</Button>
          <Button secondary>Secondary Button</Button>
          <Button tertiary>Tertiary Button</Button>
        </SingleColumnLayout>
      </OuterLayout>
    </div>
  );
}

export default App;
