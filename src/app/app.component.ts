import { Component, OnInit } from '@angular/core';
import { CrudOperationService } from './service/crud-operation.service';
import { FormGroup, FormControl, Validators, AbstractControl, FormBuilder }  from '@angular/forms';
import { first } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  patient = true;
  productFormData! : FormGroup;

  todoList : any = []
  isEditMode : boolean = false;
  idForEdit : any;
  cardHideShow : boolean = false;
  constructor(private crudHttpService : CrudOperationService,private formBuilder: FormBuilder){}
  
  productForm(){
    this.productFormData = new FormGroup({
      'name':new FormControl('',[Validators.required]),
      'desc' : new FormControl('',[Validators.required]),
      'price' : new FormControl('',[Validators.required])
    });

  }


  ngOnInit() : void{
    this.getData();
    this.productForm();
  }
  get f() { return this.productFormData.controls}
  addProduct(){
    debugger;
     this.cardHideShow = true;
  }
  onSave(){
    
    if(this.productFormData.invalid){
      this.cardHideShow = true;
      return
    }
    let obj : any = {
      
      prd_name : this.productFormData.get('name')?.value,
      prd_description : this.productFormData.get('desc')?.value,
      prd_price: this.productFormData.get('price')?.value
    }

    if(this.isEditMode){
      if(obj.id){
        obj.delete['id'];
      }
        this.crudHttpService.update(this.idForEdit,obj).subscribe((res) =>{
          this.getData();
        })
        this.isEditMode = false;
        this.idForEdit = null;
    }else{
      obj['id'] =  Date.now();
      this.crudHttpService.create(obj).subscribe((res) =>{
        this.getData();
      })
    }
    this.cardHideShow = false;
    
    this.productFormData.reset();
  }


  getData(){
    this.crudHttpService.list().subscribe((response) =>{
      
      this.todoList = response;
    })
  }
  editClick(data:any){
    this.productFormData.reset();
    this.crudHttpService.getById(data.id).subscribe(
      (response : any) => {
       this.idForEdit = response.id;
        this.productFormData.controls['name'].patchValue(response.prd_name);
        this.productFormData.controls['desc'].patchValue(response.prd_description);
        this.productFormData.controls['price'].patchValue(response.prd_price);

        }
    );
    this.isEditMode = true;
    this.cardHideShow = true;
  }
  deleteAction(id: any){
    this.crudHttpService.delete(id).subscribe((responce) =>{
      this.getData();
    })
  }

}
