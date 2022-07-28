import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';


const storage = new Storage({
    storageBackend: AsyncStorage,
    enableCache: true,
    sync: {
        tabIndex() {
        return 0;
        }
    }
});


export default storage;
  