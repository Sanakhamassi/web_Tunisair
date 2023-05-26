import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
declare var $: any;

declare interface TableData {
    headerRow: string[];
    dataRows: string[][];
}

@Component({
    selector: 'app-tables',
    templateUrl: './tables.component.html',
    styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {
    cin: string = ''; // Set default value for CIN
    nom: string = ''; // Set default value for Nom
    prenom: string = ''; // Set default value for Prénom
    phone: string = ''; // Set default value for Numéro téléphone
    age: number = 0; // Set default value for Age
    nationalite: string = ''; // Set default value for Nationalité
    taille: string = ''; // Set default value for Taille
    role: number = 0; // Set default value for Rôle
    currentRow: any
    public tableData1: TableData = {
        headerRow: ['Id', 'CIN', 'Nom', 'Prénom', 'Taille', 'nationalité', 'Age', 'Téléphone', 'Rôle', 'Actions'],
        dataRows: []
    };
    public pilotes: any[] = [];

    constructor(private http: HttpClient) { }
    addAviateur() {

        this.http.post<any>('http://localhost:8080/oauth/addAviateur', {
            "cin": this.cin,
            "nom": this.nom,
            "prenom": this.prenom,
            "taille": this.taille,
            "age": this.age,
            "nationalite": this.nationalite,
            "telephone": this.phone,
            "role": this.role,
            "vol": {
                "id": 1
            }
        }
        ).subscribe(data => {
            return data;
        })
        this.showNotification('top', 'center', 'Pilote added succesfully')
    }
    deletePilote(row: any) {
        const url = `http://localhost:8080/oauth/Aviateur/${row[0]}`;
        this.http.delete(url).subscribe(
            () => {
                this.showNotification('top', 'center', 'Pilote deleted succesfully')
                this.fetchData();
            },
            (error) => {
                console.error('Error deleting item:', error);
            }
        );

    }
    getRow(row: any) {
        this.currentRow = row
        this.cin = row[1];
        this.nom = row[2]
        this.prenom = row[3]
        this.taille = row[4]
        this.nationalite = row[5]
        this.age = row[6]
        this.phone = row[7]
        this.role = row[8]

    }
    updatePilote() {

        const url = `http://localhost:8080/oauth/Aviateur/${this.currentRow[0]}`;
        this.http.put(url, {
            "cin": this.cin,
            "nom": this.nom,
            "prenom": this.prenom,
            "taille": this.taille,
            "age": this.age,
            "nationalite": this.nationalite,
            "telephone": this.phone,
            "role": this.role,
            "vol": {
                "id": 1
            }
        }).subscribe(
            () => {
                this.showNotification('top', 'center', 'Pilote updated succesfully')
                this.fetchData();
            },
            (error) => {
                console.error('Error updating item:', error);
            }
        );

    }
    fetchData() {
        this.http.get<any[]>('http://localhost:8080/oauth/getAviateurs').subscribe(
            response => {
                // Handle the response data here
                this.pilotes = response; // Assign the response data to pilotes array
                this.tableData1.dataRows = this.pilotes.map(pilote => [
                    pilote.id,
                    pilote.cin,
                    pilote.nom,
                    pilote.prenom,
                    pilote.taille,
                    pilote.nationalite,
                    pilote.age,
                    pilote.telephone,
                    pilote.role,
                ]);
                console.log(this.tableData1.dataRows);
            },
            error => {
                // Handle any errors that occur during the request
                console.error(error);
            }
        );
    }

    ngOnInit() {
        this.fetchData();
    }
    showNotification(from, align, text) {

        const type = ['', 'info', 'success', 'warning', 'danger'];

        const color = 2; // Success notification color index

        $.notify({
            icon: "pe-7s-check",
            message: text
        }, {
            type: type[color],
            timer: 1000,
            placement: {
                from: from,
                align: align
            },
            animate: {
                enter: 'animated fadeInDown',
                exit: 'animated fadeOutUp'
            },
            template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
                '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
                '<span data-notify="icon"></span> ' +
                '<span data-notify="title">{1}</span> ' +
                '<span data-notify="message">{2}</span>' +
                '</div>'
        });
    }

}
