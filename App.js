import React from 'react';
import {Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SendbirdUIKitContainer, createGroupChannelCreateFragment, createGroupChannelListFragment} from '@sendbird/uikit-react-native';
import {
  ClipboardService,
  FileService,
  MediaService,
  NotificationService,
  RecorderService,
} from './services';
import Navigation from './src/navigation';
import {SENDBIRD_APP_ID} from "@env"

const App = () => {
  return (
        <SendbirdUIKitContainer
        appId={SENDBIRD_APP_ID}
        chatOptions={{localCacheStorage: AsyncStorage}}
        platformServices={{
          file: FileService,
          notification: NotificationService,
          clipboard: ClipboardService,
          media: MediaService,
          recorder: RecorderService
        }}
        userProfile={{
          onCreateChannel: () => {},
        }}>
          <Navigation />
      </SendbirdUIKitContainer>
  );
};

export default App;
