import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import Basemap from '@arcgis/core/Basemap';
import Map from '@arcgis/core/Map';
import VectorTileLayer from "@arcgis/core/layers/VectorTileLayer.js";
import MapView from '@arcgis/core/views/MapView';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import SimpleRenderer from '@arcgis/core/renderers/SimpleRenderer';
import SimpleFillSymbol from '@arcgis/core/symbols/SimpleFillSymbol';
import UniqueValueRenderer from '@arcgis/core/renderers/UniqueValueRenderer';

@Component({
  selector: 'app-mapcolor',
  templateUrl: './mapcolor.component.html',
  styleUrls: ['./mapcolor.component.css']
})
export class MapcolorComponent implements OnInit {
  basemapUrl = 'https://tiles.arcgis.com/tiles/5T5nSi527N4F7luB/arcgis/rest/services/WHO_Polygon_Basemap_no_labels/VectorTileServer';
  view?: MapView ;

  @ViewChild('mapViewNode', { static: true }) private mapViewEl!: ElementRef;

  ngOnInit(): any {
    this.initializeMap().then(() => {});
  }

  async initializeMap(): Promise<any> {
    const mapBaseLayer = new VectorTileLayer({
      url: this.basemapUrl
    });

    const customBasemap = new Basemap({
      baseLayers: [mapBaseLayer],
    });

    const featureLayer = new FeatureLayer({
      url: 'https://services.arcgis.com/5T5nSi527N4F7luB/ArcGIS/rest/services/Detailed_Boundary_ADM0/FeatureServer/0',
      renderer: new SimpleRenderer({
        symbol: new SimpleFillSymbol({
          color: 'rgba(0,76,115,0.04)',
        })
      }),
      outFields: ['ADM0_VIZ_NAME', 'WHO_CODE'],
      popupTemplate: {
        title: '{ADM0_VIZ_NAME}',
        content: [
          {
            type: 'fields',
            fieldInfos: [
              {
                fieldName: 'ADM0_VIZ_NAME',
                label: 'Name'
              },
              {
                fieldName: 'WHO_CODE',
                label: 'WHO Code'
              }
            ]
          }
        ]
      }
    });

    const uniqueValueRenderer = new UniqueValueRenderer({
      field: 'WHO_CODE',
      defaultSymbol: new SimpleFillSymbol({
        color: [256, 256, 256],
        outline: {
          color: [0, 0, 0, 0.4],
          width: 0.4,
        },
      }),
    });

    const data = [
      {
        countryCode: 'IND',
        score: 1
      },
      {
        countryCode: 'USA',
        score: 2
      },
      {
        countryCode: 'CHN',
        score: 3
      },
      {
        countryCode: 'BRA',
        score: 4
      },
      {
        countryCode: 'RUS',
        score: 5
      }];

    data.forEach((item) => {
      uniqueValueRenderer.addUniqueValueInfo(
        item.countryCode,
        new SimpleFillSymbol({
          color: this.getColorCode(item.score),
        })
      );
    });

    featureLayer.renderer = uniqueValueRenderer;

    const map = new Map({
      basemap: customBasemap,
      layers: [featureLayer],
    });

    this.view = new MapView({
      map: map,
      container: this.mapViewEl.nativeElement,
      center: [-73.967569, 40.727724],
      zoom: 2,
      constraints: {
        snapToZoom: true,
        maxZoom: 8,
        minZoom: 1,
      },
      resizeAlign: 'center',
    });

    return this.view.when();
  }

  getColorCode(score: number): string {
    switch (score) {
      case 1:
        return '#0099DD';
      case 2:
        return '#80BC50';
      case 3:
        return '#F3A81C';
      case 4:
        return '#CA0000';
      case 5:
        return '#FFFFFF';
      default:
        return '#FFFFFF';
    }
  }
}