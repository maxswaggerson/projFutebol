import { LightningElement, api, wire } from 'lwc';
import {getRecord, getFieldValue} from 'lightning/uiRecordApi';

import LATITUDE from '@salesforce/schema/Estadio__c.Latitude__c';
import LONGITUDE from '@salesforce/schema/Estadio__c.Longitude__c';
import NAME from '@salesforce/schema/Estadio__c.Name';

const fields = [LATITUDE, LONGITUDE, NAME];

export default class GeolocalizacaoEstadio extends LightningElement {

    @api recordId;

    @wire(getRecord, { recordId: '$recordId', fields: fields})
    estadio;

    get mapMarkers(){
        const latitude = getFieldValue(this.estadio.data, LATITUDE);

        const longitude = getFieldValue(this.estadio.data, LONGITUDE);

        const name = getFieldValue(this.estadio.data, NAME);

        if(!latitude || !longitude){
            return [];
        }

        return [
            {
                location: {
                    latitude: latitude,
                    longitude: longitude
                },
                title: name
            }
        ];
        
    }
}