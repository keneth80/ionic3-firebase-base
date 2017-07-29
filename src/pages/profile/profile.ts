import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { Camera, CameraOptions } from '@ionic-native/camera';
import firebase from 'firebase';


/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  public photos: any;
  public base64Image: string;
  public processString: string;
  private urlPrefix: string = 'file://';
  private base64Prefix: string = 'data:image/jpeg;base64,';
  private sendImage: string;
  private imageblob: any;

  constructor(public navCtrl: NavController,
    public domSanitizer: DomSanitizer,
    private camera: Camera,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController) { }

  ngOnInit() {
    this.photos = [];
  }

  deletePhoto(index) {
    let confirm = this.alertCtrl.create({
      title: 'Sure you want to delete this photo? There is NO undo!',
      message: '',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Disagree clicked');
          }
        }, {
          text: 'Yes',
          handler: () => {
            console.log('Agree clicked');
            this.photos.splice(index, 1);
            //return true;
          }
        }
      ]
    });
    confirm.present();
  }

  choosePhoto() {
    const options: CameraOptions = {
      quality: 50,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: true,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: false
    };
    this.camera.getPicture(options).then((imageData) => {
      // const safeUrl: any = this.domSanitizer.bypassSecurityTrustUrl(this.base64Prefix + imageData);
      const safeUrl: any = this.base64Prefix + imageData;
      this.sendImage = safeUrl;
      this.photos.push(safeUrl);
      this.photos.reverse();
    }, (err) => {
      console.log(err);
    });
  }

  takePhoto() {
    const options: CameraOptions = {
      quality: 50,
      // destinationType: this.camera.DestinationType.FILE_URI,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    this.camera.getPicture(options).then(
      (imageData) => {
        // this.base64Image = this.urlPrefix + imageData;
        const safeUrl: any = this.base64Prefix + imageData;
        this.photos.push(safeUrl);
        this.photos.reverse();
      },
      (err) => {
        console.log(err);
      });
  }

  uploadPhoto() {
    console.log('uploadPhoto click!');
    let storageRef = firebase.storage().ref();
    // let storageRef = firebase.storage().refFromURL('gs://moblile-base.appspot.com');
    this.processString = '';
    this.processString += 'get storage!';
    // this.showToast('get storage!');
    // Create a timestamp as filename
    const filename = Math.floor(Date.now() / 1000);
    console.log('storageRef =>', storageRef.name);
    // Create a reference to 'images/todays-date.jpg'
    const imagesRef = storageRef.child('images');
    console.log('imagesRef =>', imagesRef);
    const imageRef = storageRef.child(`images/${filename}.jpg`);
    // this.showToast('Create a reference!');
    this.processString += 'Create a reference!';
    console.log('Create a reference!');
    const metadata = {
      contentType: 'image/jpeg',
    };
    // imageRef.put(this.b64toBlob(this.imageblob, 'image/jpeg'), metadata)
    imageRef.putString(this.sendImage, firebase.storage.StringFormat.DATA_URL).then(
      (snapshot: any) => {
        // this.showToast('upload success!');
        this.processString += 'upload success!';
      },
      (err) => {
        console.log(err);
        this.processString += 'upload fail => ' + JSON.stringify(err);
        // this.showToast('upload fail => '+ JSON.stringify(err));
      });
  }

  private b64toBlob(b64Data, contentType, sliceSize?) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    let byteCharacters = atob(b64Data);
    let byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      let slice = byteCharacters.slice(offset, offset + sliceSize);

      let byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      let byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    let blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  private showToast(text: string) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 5000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
}
