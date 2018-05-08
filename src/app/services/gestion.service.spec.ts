import { TestBed, inject } from '@angular/core/testing';

import { GestionService } from './gestion.service';

describe('GestionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GestionService]
    });
  });

  it('should be created', inject([GestionService], (service: GestionService) => {
    expect(service).toBeTruthy();
  }));
});
