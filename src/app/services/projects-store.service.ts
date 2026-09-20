import { Injectable, resource, signal } from '@angular/core';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';
import { db, storage } from '../firebase.config';
import { Project } from '../segments/projects/projects';

export interface FileItem {
  id?: string;
  name: string;
  type: string;
  description: string;
  link: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProjectsStoreService {
  public projects = signal<Project[]>([]);

  projectsResource = resource({
    params: () => ({}),
    loader: async ({ params }) => {
      return this.getProjects();
    },
  });

  constructor() {}

  async getProjects(): Promise<Project[]> {
    if (this.projects().length > 0) {
      return this.projects();
    }

    const docRef = collection(db, 'projects');
    const querySnapshot = await getDocs(docRef);

    const projects = this.projects();
    querySnapshot.forEach((doc) => {
      projects.push({
        id: doc.id,
        projectId: doc.data()['id'],
        name: doc.data()['name'],
        image: doc.data()['image'],
      });
    });
    projects.sort((a, b) => a.name.localeCompare(b.name));
    this.projects.set(projects);

    return this.projects();
  }

  async getProject(id: string): Promise<Project> {
    const docRef = doc(db, 'projects', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        projectId: docSnap.data()['id'],
        name: docSnap.data()['name'],
        image: docSnap.data()['image'],
      };
    } else {
      throw new Error('Document not found');
    }
  }

  async getProjectFiles(projectId: string): Promise<FileItem[]> {
    const docRef = collection(db, 'files');
    const q = query(docRef, where('projectId', '==', projectId));
    const querySnapshot = await getDocs(q);

    const rawFiles: FileItem[] = [];
    querySnapshot.forEach((doc) => {
      doc.data()['files'].forEach((file: FileItem) => rawFiles.push(file));
    });

    // Resolve all PDF URLs in parallel — forEach can't await, so we use Promise.all
    return Promise.all(
      rawFiles.map((file) =>
        file.type === 'pdf'
          ? this.getPDFUrl(file.link).then((url) => ({ ...file, link: url }))
          : Promise.resolve(file),
      ),
    );
  }

  async getPDFUrl(link: string): Promise<string> {
    const pdfRef = ref(storage, link);
    const downloadUrl = await getDownloadURL(pdfRef);

    const response = await fetch(downloadUrl);
    const blob = await response.blob();

    return await this.getBase64(blob);
  }

  getBase64(blob: Blob) {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        // Returns format: "data:application/pdf;base64,JVBERi0xLj..."
        const base64Data = reader.result as string;
        resolve(base64Data);
      };

      reader.onerror = (error) => reject(error);

      // Read the blob as a Base64 Data URL
      reader.readAsDataURL(blob);
    });
  }
}

////     projectId: 'hSlkQIP2FU45yG2DKft0'
