import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-llenar-informacion',
  templateUrl: './llenar-informacion.page.html',
  styleUrls: ['./llenar-informacion.page.scss'],
})
export class LlenarInformacionPage {
  descripcion: string = '';
  numeroContacto: string = '';
  correo: string = '';
  direccion: string = '';
  imagenURL: string | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private storage: AngularFireStorage,
    private firestore: AngularFirestore,
    private toastController: ToastController
  ) {
    const state = this.router.getCurrentNavigation()?.extras.state;
    if (state) {
      this.imagenURL = state['imagenURL'];
    }
  }

  async crearPublicacion() {
    if (
      !this.imagenURL ||
      !this.descripcion ||
      !this.numeroContacto ||
      !this.correo ||
      !this.direccion
    ) {
      this.mostrarToast('Por favor, complete todos los campos');
      return;
    }

    try {
      const filePath = `publicaciones/${Date.now()}`;
      const fileRef = this.storage.ref(filePath);
      const task = await fileRef.putString(this.imagenURL, 'data_url');

      const downloadURL = await task.ref.getDownloadURL();

      const publicacionData = {
        descripcion: this.descripcion,
        numeroContacto: this.numeroContacto,
        correo: this.correo,
        direccion: this.direccion,
        imagenURL: downloadURL,
      };

      await this.firestore.collection('publicaciones').add(publicacionData);

      this.mostrarToast('Publicación creada exitosamente');
      this.router.navigate(['tabs/tab2']);
    } catch (error) {
      console.error('Error al crear la publicación: ', error);
      this.mostrarToast('Error al crear la publicación');
    }
  }

  async mostrarToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }
}
