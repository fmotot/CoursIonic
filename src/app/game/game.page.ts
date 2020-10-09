import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Question } from '../models/question';
import { QuestionsProvider } from '../providers/question.provider';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {
  public difficulty: string;
  public pseudo: string;

  public NB_QUESTIONS = 5;
  public questions: Question[];
  public currentQuestionIndex: number = 0;
  public currentQuestion: Question;
  public isQuestion = false;
  public isResult = false;
  public isResponded = false;
  public isFinished = false;
  public nbCorrectAnswers = 0;

  constructor(private alertCtrl: AlertController, public route: ActivatedRoute, private qp: QuestionsProvider, private router: Router) {
    this.route.params.subscribe((params) => {
      this.difficulty = params['difficulty'];
      this.pseudo = params['pseudo'];
      this.getQuestions();
    })
  }

  ngOnInit() {}

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
    this.router.navigate(['/result', this.pseudo, this.nbCorrectAnswers.toString(), this.questions.length.toString()]);
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
