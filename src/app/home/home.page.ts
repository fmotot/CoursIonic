import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { question } from '../models/question';
import { QuestionsProvider } from '../providers/question.provider';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public pseudo: string = 'Fred';
  public difficulty: string = 'easy';
  public isSaved: boolean;
  public errors = [];
  public isPlayerForm = true;
  public isQuestion = false;
  public isResult = false;
  public isNextQuestion = false;
  public questions: any[];
  public currentQuestionIndex: number = 0;
  public currentQuestion: any;
  public isResponded = false;
  public isFinished = false;
  public nbCorrectAnswers = 0;


  constructor(private alertCtrl: AlertController, private toastCtrl: ToastController, private qp: QuestionsProvider) { }

  async onStartGame() {
    this.errors = [];

    if (!this.pseudo || this.pseudo.length < 3) {
      this.errors.push("Veuillez saisir un pseudo de 3 caractères minimum");
    }

    if (!this.difficulty) {
      this.errors.push("Choisissez une difficulté");
    }

    if (this.errors.length === 0) {

      this.getQuestions();
      this.isPlayerForm = false;
      this.isQuestion = true;

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

  onClickRestart(){
    this.nbCorrectAnswers=0;
    this.isResult = false;
    this.isPlayerForm = true;
  }

  onClickResponse(response: string) {
    this.isNextQuestion = true;
    this.isResponded = true;
    if (this.currentQuestion.correct_answer === response){
      this.nbCorrectAnswers++;
    }
    console.log(response);
  }

  onNextQuestion() {
    this.currentQuestionIndex++;
    if (this.questions[this.currentQuestionIndex]) {
      this.currentQuestion = this.questions[this.currentQuestionIndex];
    }
    else {
      this.isFinished = true;
    }
    this.isNextQuestion = false;
    this.isResponded = false;
  }

  onViewResult(){
    this.isQuestion = false;
    this.isResult = true;
  }

  getQuestions() {
    this.qp.get(this.difficulty, 3)
      .then((result) => {
        this.questions = this.shuffle(result);
        this.questions.forEach((question) => {
          question.answers = this.shuffle(question.incorrect_answers.concat([question.correct_answer]));
        });

        this.currentQuestionIndex = 0;
        this.currentQuestion = this.questions[this.currentQuestionIndex];
        console.log(this.questions);
        console.log(this.currentQuestionIndex);
        console.log(this.currentQuestion)
      })
      .catch(async (err) => {
        const alert = await this.alertCtrl.create({
          header: "Erreur d'appel au service",
          message: "Impossible de récupérer les questions",
          buttons: ['Ok'],
        })
      })
  }

  /**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
  private shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
}
