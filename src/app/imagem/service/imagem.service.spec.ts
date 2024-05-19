import { TestBed } from '@angular/core/testing';
import { imagemService } from './imagem.service';

describe('ImagemService', () => {
  let service: imagemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(imagemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
