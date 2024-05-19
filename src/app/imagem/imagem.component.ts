import { Component } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { ImagemModel } from './model/imagem.model';
import { imagemService } from './service/imagem.service';
import { Router } from 'express';
import { ActivatedRoute } from '@angular/router';
import { Console } from 'node:console';

@Component({
  selector: 'app-imagem',
  templateUrl: './imagem.component.html',
  styleUrl: './imagem.component.css'
})
export class ImagemComponent {
  showSuccessMessages = false;
  showErrorMessages = false;

  key?: string;
  formGroup = new FormGroup({
    nome: new FormControl('',
      [Validators.required]),
    imagem: new FormControl('',
      [Validators.required]),
  });

  constructor(private imagemService: imagemService,
    private router: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.router.paramMap.subscribe(paramMap => {
      this.key = paramMap.get('key')?.toString();
      if (this.key) {
        this.imagemService.carregar(this.key).subscribe(imagem => {
          this.formGroup.controls.nome.patchValue(imagem.nome);
          this.formGroup.controls.imagem.patchValue(imagem.imagem);
        });
      }
    })
  }

  salvar(): void {
    if (this.formGroup.invalid) {
      console.log('Formulário inválido');
      this.formGroup.markAllAsTouched();
      this.showErrorMessages = true;
      return;
    }

    var imagen = new ImagemModel();
    imagen.nome = this.formGroup.controls.nome.value?.toString();
    imagen.imagem = this.formGroup.controls.imagem?.value?.toString();

    if (this.key) {
      this.imagemService.alterar(this.key, imagen).then(result => {
        this.showSuccessMessages = true;
        console.log(result);
      });
    } else {
      this.imagemService.salvar(imagen).then(result => {
        this.showSuccessMessages = true;
        console.log(result);
      });
    }
  }

  selectFile(event: any) {
    console.log(event);
    console.log(event.target.files[0]);
    const file = event.target.files[0];
    this.imagemService.uploadImagem(file).then(result => {
      console.log(result);
      result.ref.getDownloadURL().then(url => {
        this.formGroup.controls.imagem.patchValue(url);
      })      
    });
  }
}
