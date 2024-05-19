import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ImagemModel } from '../model/imagem.model';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class imagemService {

  constructor(private db: AngularFireDatabase,
    private storage: AngularFireStorage) { }

  salvar(imagem: ImagemModel) { 
    return this.db.list('imagem').push(imagem);   
  }

  excluir(key: any) {
    return this.db.object('imagem/'+key).remove();
  }

  carregar(key: any) : Observable<any> {
    return this.db.object('imagem/'+key).valueChanges();
  }

  alterar(key: any, imagem: ImagemModel) {
    return this.db.object('imagem/'+key).update(imagem);
  }

  listar() {
    return this.db.list('imagem').snapshotChanges()
    .pipe(
      map(changes => {
        console.log(changes);
        return changes.map(c => ({ key: c.key, 
          ...c.payload.val() as ImagemModel}));
      })
    );
  }

  uploadImagem(file: any) {
    const path = 'imagem/'+file.name;
    const ref = this.storage.ref(path);
    return ref.put(file);
  }
}
