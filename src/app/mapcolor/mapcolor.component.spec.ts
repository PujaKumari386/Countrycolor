import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapcolorComponent } from './mapcolor.component';

describe('MapcolorComponent', () => {
  let component: MapcolorComponent;
  let fixture: ComponentFixture<MapcolorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MapcolorComponent]
    });
    fixture = TestBed.createComponent(MapcolorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
