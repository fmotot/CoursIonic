import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Question } from '../models/question';
import { QuestionsProvider } from '../providers/question.provider';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  NB_QUESTIONS: number = 4;
  public pseudo: string = 'Fred';
  public difficulty: string = 'easy';
  public isSaved: boolean;
  public errors = [];
  public questions: Question[];
  public currentQuestionIndex: number = 0;
  public currentQuestion: Question;
  public isPlayerForm = true;
  public isQuestion = false;
  public isResult = false;
  public isResponded = false;
  public isFinished = false;
  public nbCorrectAnswers = 0;

  constructor(private alertCtrl: AlertController, private toastCtrl: ToastController, private router: Router) { }

  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }

  async onStartGame() {
    this.errors = [];

    if (!this.pseudo || this.pseudo.length < 3) {
      this.errors.push("Veuillez saisir un pseudo de 3 caractères minimum");
    }

    if (!this.difficulty) {
      this.errors.push("Choisissez une difficulté");
    }

    if (this.errors.length === 0) {
      this.router.navigate(['/game', this.pseudo, this.difficulty]);
    }
    else {
      const alert = await this.alertCtrl.create({
        header: "Informations manquantes ou incorrectes",
        message: this.errors.toString(),
        buttons: ['OK'],
      });

      alert.present();
    }
  }

  onClickRestart() {
    this.nbCorrectAnswers = 0;
    this.isResult = false;
    this.isQuestion = false;
    this.isPlayerForm = true;
    this.isFinished = false;
    this.isResponded = false;
    this.currentQuestion = null;
  }


}
