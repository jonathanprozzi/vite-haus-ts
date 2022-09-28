// import { FormBuilder } from '@daohaus/haus-form-builder';
// import { CustomFields } from '../legos/config';
// import { TABULA_FORMS } from '../legos/form';

import { FormBuilder } from '@daohaus/form-builder';
import { Button } from '@daohaus/ui';

const formLego = {
  id: 'SIGNAL',
  title: 'Signal Form',
  subtitle: 'Signal Proposal',
  description: 'Ratify on chain using a DAO proposal',
  requiredFields: { title: true, description: true },
  log: true,
  // tx: TX.POST_SIGNAL,
  fields: [
    // FIELD.TITLE,
    // FIELD.DESCRIPTION,
    // FIELD.LINK,
    // ...PROPOSAL_SETTINGS_FIELDS,
    {
      id: 'title',
      type: 'input',
      label: 'Proposal Name',
      placeholder: 'Enter title',
    },
  ],
};

export function FormTest() {
  return <FormBuilder form={formLego} />;
  // return null;

  // const handleClick = () => {

  // }

  // return <Button onClick={handleClick}>make tx</Button>;
}

export default FormTest;
