import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TableRestApiModel } from './model/tablerestapimodel';
import { RestapiservicesService } from './restapiservices.service';

@Component({
  selector: 'app-table-restapi',
  templateUrl: './table-restapi.component.html',
  styleUrls: ['./table-restapi.component.css']
})
export class TableRestapiComponent implements OnInit {
  allCurrent: Array<TableRestApiModel> = [];
  signInForm = new FormGroup({
    value: new FormControl('') // <== default value
  });

  constructor(private http: RestapiservicesService, private _router: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.http.getcurrent().subscribe(data => {
      this.allCurrent = data;
    })

    //GetId
    //this.httpget.getId(this.id).subscribe(data => {
    //  this.allCurrent = data;
    //});

  }


  onDelete(id: string) {
    if (confirm('Bạn có chắc không?')) {
      this.http.deleteCurrent(id).subscribe(data1 => {
        this.http.getcurrent().subscribe(data => {
          this.allCurrent = data;
          location.reload(); // Reload trang web
        })
      });
    }
  }


  onPut(id: string) {
    this.http.putcurrent(id, this.signInForm.value).subscribe(da => {

    });

    //console.log(this.signInForm.value);
  }
  Put2(id: string) {
    this.http.putcurrent(id, this.signInForm.value).subscribe(da => {
      this.http.getcurrent().subscribe(data1 => {
        this.allCurrent = data1;
      })
    });
  }


  //onUpdate(item: any) {
  //  this.http.updateData(item.id, item).subscribe((res) => {
  //    this.loadData();
  //  });
  //}


}
