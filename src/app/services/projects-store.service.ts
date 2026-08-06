import { Injectable } from '@angular/core';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase.config';
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
  public projects: Project[] = [];

  constructor() {}

  async getProjects(): Promise<Project[]> {
    this.projects = [];
    const docRef = collection(db, 'projects');
    const querySnapshot = await getDocs(docRef);

    querySnapshot.forEach((doc) => {
      this.projects.push({
        id: doc.id,
        projectId: doc.data()['id'],
        name: doc.data()['name'],
        image: doc.data()['image'],
      });
    });
    return this.projects;
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
    const files: FileItem[] = [];
    const docRef = collection(db, 'files');
    const q = query(docRef, where('projectId', '==', projectId));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      doc.data()['files'].forEach((file: FileItem) => {
        files.push(file);
      });
    });
    return files;
  }
}
////     projectId: 'hSlkQIP2FU45yG2DKft0'
