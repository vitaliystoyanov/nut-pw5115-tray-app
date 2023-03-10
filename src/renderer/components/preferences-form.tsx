import React from 'react';
import { Formik, Field, Form } from 'formik';
import { remote, ipcRenderer } from 'electron';
import { Text, Button, ButtonPrimary, Flex } from '@primer/components';

import { PreferencesSavedValues } from '@common/prefSavedValues';
import store from '@common/store';

const closeWindow = (): void => {
  const window = remote.getCurrentWindow();
  window.close();
};

const PreferencesForm = (): JSX.Element => (
  <Formik
    initialValues={{
      launchAtLogin: store.get('launchAtLogin'),
      autoFan: store.get('autoFan'),
      autoShutdown: store.get('autoShutdown'),
      batPercentageTray: store.get('batPercentageTray'),
    }}
    onSubmit={async (values: PreferencesSavedValues): Promise<void> => {
      ipcRenderer.send('preferences-saved', values);
      closeWindow();
    }}
  >
    <Form style={{ paddingLeft: 15 }}>
      <Text
        fontWeight="bold"
        fontSize="14px"
        as="label"
        // eslint-disable-next-line
        // @ts-ignore
        htmlFor="launch-at-login"
        style={{ display: 'block' }}
        mt="3"
        mb="2"
      >
        <Field id="launch-at-login" type="checkbox" name="launchAtLogin" />
        <Text> Launch at login</Text>
      </Text>
      <Text
        fontWeight="bold"
        fontSize="14px"
        as="label"
        // eslint-disable-next-line
        // @ts-ignore
        htmlFor="auto-fan"
        style={{ display: 'block' }}
        mt="1"
        mb="2"
      >
        <Field id="auto-fan" type="checkbox" name="autoFan" />
        <Text> Turn on fan coolers on load more than 20%</Text>
      </Text>
      <Text
        fontWeight="bold"
        fontSize="14px"
        as="label"
        // eslint-disable-next-line
        // @ts-ignore
        htmlFor="auto-shutdown"
        style={{ display: 'block' }}
        mt="1"
        mb="2"
      >
        <Field id="auto-shutdown" type="checkbox" name="autoShutdown" />
        <Text> Shutdown/Load on on lock/suspend power monitor events</Text>
      </Text>
      <Text
        fontWeight="bold"
        fontSize="14px"
        as="label"
        // eslint-disable-next-line
        // @ts-ignore
        htmlFor="bat-percentage-tray"
        style={{ display: 'block' }}
        mt="1"
        mb="2"
      >
        <Field id="bat-percentage-tray" type="checkbox" name="batPercentageTray" />
        <Text> Display battery percentage in tray</Text>
      </Text>
      <Flex p="3">
        <Button onClick={closeWindow} ml="auto">
          Cancel
        </Button>
        <ButtonPrimary type="submit" ml="2">
          Save
        </ButtonPrimary>
      </Flex>
    </Form>
  </Formik>
);

export default PreferencesForm;
