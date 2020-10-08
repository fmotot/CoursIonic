import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Question } from '../models/question';
import { QuestionsProvider } from '../providers/question.provider';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
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

  onClickRestart() {
    this.nbCorrectAnswers = 0;
    this.isResult = false;
    this.isQuestion = false;
    this.isPlayerForm = true;
    this.isFinished = false;
    this.isResponded = false;
    this.currentQuestion = null;
  }

  onClickResponse(response: string) {
    this.isResponded = true;
    if (this.currentQuestion.correct_answer === response) {
      this.nbCorrectAnswers++;
    }
  }

  onNextQuestion() {
    this.currentQuestionIndex++;

    if (this.questions[this.currentQuestionIndex]) {
      this.currentQuestion = this.questions[this.currentQuestionIndex];
    }

    if (this.currentQuestionIndex === this.questions.length - 1) {
      this.isFinished = true;
    }
    this.isResponded = false;
  }

  onViewResult() {
    this.isQuestion = false;
    this.isResult = true;
  }

  async getQuestions() {
    try {
      this.questions = await this.qp.get(this.difficulty, this.NB_QUESTIONS);
      this.questions = this.shuffle(this.questions);
      this.questions.forEach((question) => {
        question["answers"] = this.shuffle(question.incorrect_answers.concat([question.correct_answer]));
      });
      this.currentQuestionIndex = 0;
      this.currentQuestion = this.questions[this.currentQuestionIndex];
    } catch (error) {
      const alert = await this.alertCtrl.create({
        header: "Erreur d'appel au service",
        message: "Impossible de récupérer les questions",
        buttons: ['Ok'],
      });
    }

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
