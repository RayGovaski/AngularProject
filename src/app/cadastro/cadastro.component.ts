import { Component, HostListener, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from 'express';
import { ActivatedRoute } from '@angular/router';
import { CadastroModel } from './model/cadastro.model';
import { CadastroService } from './service/cadastro.service';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  showSuccessMessages = false;
  showErrorMessages = false;

  key?: string;
  formGroup = new FormGroup({
    nome: new FormControl('', [Validators.required]),
    genero: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]),
    cpf: new FormControl('', [Validators.required, Validators.pattern('^\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}$')]),
    crm: new FormControl('', [Validators.required, Validators.pattern('^\\d{2}\\.\\d{3}\\.\\d{2}$')]),
    estado_Civil: new FormControl('', [Validators.required]),
    nascionalidade: new FormControl('', [Validators.required]),
    telefone: new FormControl('', [Validators.required, Validators.pattern('^\\(\\d{2}\\)\\s\\d{4,5}-\\d{4}$')]),
    nascimento: new FormControl('', [Validators.required]),
    senha: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')]),
    imagem: new FormControl(''),
  });

  constructor(private cadastroService: CadastroService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.router.paramMap.subscribe(paramMap => {
      this.key = paramMap.get('key')?.toString();
      if (this.key) {
        this.cadastroService.carregar(this.key).subscribe(cadastro => {
          this.formGroup.controls.nome.patchValue(cadastro.nome);
          this.formGroup.controls.genero.patchValue(cadastro.genero);
          this.formGroup.controls.email.patchValue(cadastro.email);
          this.formGroup.controls.cpf.patchValue(cadastro.cpf);
          this.formGroup.controls.crm.patchValue(cadastro.crm);
          this.formGroup.controls.estado_Civil.patchValue(cadastro.estado_Civil);
          this.formGroup.controls.nascionalidade.patchValue(cadastro.nascionalidade);
          this.formGroup.controls.telefone.patchValue(cadastro.telefone);
          this.formGroup.controls.nascimento.patchValue(cadastro.nascimento);
          this.formGroup.controls.senha.patchValue(cadastro.senha);
          this.formGroup.controls.imagem.patchValue(cadastro.imagem);
        });
      }
    });
    this.adjustBodyOverflow();
  }

  salvar(): void {
    if (this.formGroup.invalid) {
      console.log('Formulário inválido');
      this.formGroup.markAllAsTouched();
      this.showErrorMessages = true;
      return;
    }

    var cadastro = new CadastroModel();
    cadastro.nome = this.formGroup.controls.nome.value?.toString();
    cadastro.genero = this.formGroup.controls.genero.value?.toString();
    cadastro.email = this.formGroup.controls.email.value?.toString();
    cadastro.cpf = this.formGroup.controls.cpf.value?.toString();
    cadastro.crm = this.formGroup.controls.crm.value?.toString();
    cadastro.estado_Civil = this.formGroup.controls.estado_Civil.value?.toString();
    cadastro.nascionalidade = this.formGroup.controls.nascionalidade.value?.toString();
    cadastro.telefone = this.formGroup.controls.telefone.value?.toString();
    cadastro.nascimento = this.formGroup.controls.nascimento.value?.toString();
    cadastro.senha = this.formGroup.controls.senha.value?.toString();
    cadastro.imagem = this.formGroup.controls.imagem?.value?.toString();

    if (this.key) {
      this.cadastroService.alterar(this.key, cadastro).then(result => {
        this.showSuccessMessages = true;
        console.log(result);
      });
    } else {
      this.cadastroService.salvar(cadastro).then(result => {
        this.showSuccessMessages = true;
        console.log(result);
      });
    }
  }

  selectFile(event: any) {
    console.log(event);

    console.log(event.target.files[0]);

    const file = event.target.files[0];
    
    this.cadastroService.uploadImagem(file).then(result => {
      console.log(result);
      result.ref.getDownloadURL().then(url => {
        this.formGroup.controls.imagem.patchValue(url);
      });      
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.adjustBodyOverflow();
  }

  zoomIn(event: Event): void {
    const button = event.target as HTMLElement;
    const img = button.querySelector('img');
    if (img) {
      img.classList.add('zoomed');
    }
  }

  zoomOut(event: Event): void {
    const button = event.target as HTMLElement;
    const img = button.querySelector('img');
    if (img) {
      img.classList.remove('zoomed');
    }
  }

  private adjustBodyOverflow(): void {
    const width = window.innerWidth;
    const body = document.querySelector('body');
    if (body) {
      if (width <= 767) {
        body.style.overflowX = 'visible';
        body.style.overflowY = 'visible';
      } else {
        body.style.overflowX = 'hidden';
        body.style.overflowY = 'hidden';
      }
    }
  }
}