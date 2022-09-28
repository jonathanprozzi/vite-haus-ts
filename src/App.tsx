import { useState, useEffect } from 'react';
import {
  OuterLayout,
  widthQuery,
  Card,
  ParMd,
  Button,
  H1,
  H2,
  useBreakpoint,
  SingleColumnLayout,
  AddressDisplay,
  H3,
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

  // const address = ''; // include a tester address here

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
        console.log('member daos', query?.data?.daos);
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
          <>
            {daoData && daoData.length !== 0 && (
              <>
                {daoData.map((dao) => (
                  <Card>
                    <H3>{dao.name}</H3>
                  </Card>
                ))}
              </>
            )}
          </>
        </SingleColumnLayout>
      </OuterLayout>
    </div>
  );
}

export default App;
