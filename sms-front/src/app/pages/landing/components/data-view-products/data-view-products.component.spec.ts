import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataViewProductsComponent } from './data-view-products.component';

describe('DataViewProductsComponent', () => {
  let component: DataViewProductsComponent;
  let fixture: ComponentFixture<DataViewProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataViewProductsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataViewProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
