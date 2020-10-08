export class Question {
    public category: string;
    public type: string;
    public difficulty: string;
    public question: string;
    public correct_answer: string;
    public incorrect_answers: string [];
    // public answers? : string [];

    public constructor(
        category: string,
        type: string,
        difficulty: string,
        question: string,
        correct_answer: string,
        incorrect_answers: string[],
        // answers? : string []
    ) {
        this.category = category;
        this.type = type;
        this.difficulty = difficulty;
        this.question = question;
        this.correct_answer = correct_answer;
        this.incorrect_answers = incorrect_answers;
        // if (!answers) {
        //     this.answers = incorrect_answers.concat([correct_answer]);
        // }

        // console.log(this.answers);
        // for (let i = this.answers .length - 1; i > 0; i--) {
        //     const j = Math.floor(Math.random() * (i + 1));
        //     [this.answers [i], this.answers [j]] = [this.answers [j], this.answers [i]];
        //   }
    }

    // public getAnswers() : string [] {
    //     return this.incorrect_answers.concat([this.correct_answer]);
    // }
}