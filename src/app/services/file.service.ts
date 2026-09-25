import { Injectable, signal } from '@angular/core';
import { getDownloadURL, listAll, ref } from 'firebase/storage';
import { storage } from '../firebase.config';

export interface StorageFileItem {
  name: string;
  url: string;
}

@Injectable({
  providedIn: 'root',
})
export class FileService {
  private awardsFiles = signal<StorageFileItem[]>([]);

  constructor() {}

  async getFileBlobsFromPath(path: string, type: 'Awards'): Promise<StorageFileItem[]> {
    if (type === 'Awards' && this.awardsFiles().length > 0) {
      return this.awardsFiles();
    }
    const folderRef = ref(storage, path);

    const result = await listAll(folderRef);

    const files = await Promise.all(
      result.items.map(async (itemRef) => {
        const url = await getDownloadURL(itemRef);
        return {
          name: itemRef.name,
          url,
        };
      }),
    );

    if (type === 'Awards') {
      this.awardsFiles.set(files);
    }

    return files;
  }
}
