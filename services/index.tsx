import {
    createNativeClipboardService,
    createNativeFileService,
    createNativeMediaService,
    createNativeNotificationService,
    createNativeRecorderService,
  } from '@sendbird/uikit-react-native';
import * as ImageResizer from '@bam.tech/react-native-image-resizer';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import Clipboard from '@react-native-clipboard/clipboard';
import RNFBMessaging from '@react-native-firebase/messaging';
import * as CreateThumbnail from 'react-native-create-thumbnail';
import * as DocumentPicker from 'react-native-document-picker';
import * as FileAccess from 'react-native-file-access';
import * as ImagePicker from 'react-native-image-picker';
import * as Permissions from 'react-native-permissions';
import * as AudioRecorderPlayer from 'react-native-audio-recorder-player';
import Video from 'react-native-video';

export const ClipboardService = createNativeClipboardService(Clipboard);
export const NotificationService = createNativeNotificationService({
messagingModule: RNFBMessaging,
permissionModule: Permissions,
});
export const FileService = createNativeFileService({
fsModule: FileAccess,
permissionModule: Permissions,
imagePickerModule: ImagePicker,
mediaLibraryModule: CameraRoll,
documentPickerModule: DocumentPicker,
});
export const MediaService = createNativeMediaService({
VideoComponent: Video,
thumbnailModule: CreateThumbnail,
imageResizerModule: ImageResizer,
});

export const RecorderService = createNativeRecorderService({
audioRecorderModule: AudioRecorderPlayer,
permissionModule: Permissions,
});