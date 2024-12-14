import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyA1FiN1TaA2Uk7Q6EyIqT807jG0iqXOBoE",
  authDomain: "soccer-formation.firebaseapp.com",
  projectId: "soccer-formation",
  storageBucket: "soccer-formation.firebasestorage.app",
  messagingSenderId: "300766856107",
  appId: "1:300766856107:web:df745118e0eda74d3a48ee"
};

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(withEventReplay()), provideAnimationsAsync(), provideAnimationsAsync(), provideFirebaseApp(() => initializeApp(firebaseConfig)), provideFirestore(() => getFirestore())]
};

