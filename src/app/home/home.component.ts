import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { QuoteService } from './quote.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  quote: string | undefined;
  isLoading = false;
  total = 20;

  livestock = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  missingLivestock: any[] = [];

  constructor(private firestore: AngularFirestore) {
    const response = firestore.collection('missing_livestock').valueChanges();
    response.subscribe((item) => {
      console.log(item);
      this.missingLivestock = item;
    });
  }

  ngOnInit() {
    this.isLoading = true;
    console.log(this.missingLivestock);
  }

  async getLivestock() {
    console.log('yez');
    return await this.firestore
      .collection('missing_livestock')
      .get()
      .toPromise()
      .then((querySnapshot) => {
        console.log('YES!');
        querySnapshot.forEach((doc) => {
          console.log(doc.data());
        });
      })
      .catch((err) => {
        console.log('Error getting documents', err);
      });
  }
}
