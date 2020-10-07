import { Injectable } from '@angular/core';
import { question } from '../models/question';

@Injectable()
export class QuestionsProvider {

    public get(difficulty : string, nb : number) : Promise<Array<question>> {
        return new Promise((resolve, reject) => {
            resolve([
                {
                    category: "Entertainment: Japanese Anime & Manga", 
                    type: "multiple", 
                    difficulty: "easy", 
                    question: "In &quot;Fairy Tail&quot;, what is the nickname of Natsu Dragneel?", 
                    correct_answer: "The Salamander", 
                    incorrect_answers: ["The Dragon Slayer", "The Dragon", "The Demon"],
                    // answers: ["The Dragon Slayer", "The Dragon", "The Demon"],
                }, 
                { 
                    category: "Entertainment: Video Games", 
                    type: "boolean", 
                    difficulty: "medium", 
                    question: "&quot;Return to Castle Wolfenstein&quot; was the only game of the Wolfenstein series where you don&#039;t play as William &quot;B.J.&quot; Blazkowicz.", 
                    correct_answer: "False", 
                    incorrect_answers: ["True"] ,
                    // answers: ["The Dragon Slayer", "The Dragon", "The Demon"],
                },
                // {
                //     category: "Entertainment: Japanese Anime & Manga", 
                //     type: "multiple", 
                //     difficulty: "easy", 
                //     question: "2 - In &quot;Fairy Tail&quot;, what is the nickname of Natsu Dragneel?", 
                //     correct_answer: "The Salamander", 
                //     incorrect_answers: ["The Dragon Slayer", "The Dragon", "The Demon"] ,
                //     // answers: ["The Dragon Slayer", "The Dragon", "The Demon"],
                // }, 
                // { 
                //     category: "Entertainment: Video Games", 
                //     type: "boolean", 
                //     difficulty: "medium", 
                //     question: "2 - &quot;Return to Castle Wolfenstein&quot; was the only game of the Wolfenstein series where you don&#039;t play as William &quot;B.J.&quot; Blazkowicz.", 
                //     correct_answer: "False", 
                //     incorrect_answers: ["True"] ,
                //     // answers: ["The Dragon Slayer", "The Dragon", "The Demon"],
                // },
                // {
                //     category: "Entertainment: Japanese Anime & Manga", 
                //     type: "multiple", 
                //     difficulty: "easy", 
                //     question: "3 - In &quot;Fairy Tail&quot;, what is the nickname of Natsu Dragneel?", 
                //     correct_answer: "The Salamander", 
                //     incorrect_answers: ["The Dragon Slayer", "The Dragon", "The Demon"] ,
                //     // answers: ["The Dragon Slayer", "The Dragon", "The Demon"],
                // }, 
                // { 
                //     category: "Entertainment: Video Games", 
                //     type: "boolean", 
                //     difficulty: "medium", 
                //     question: "3 - &quot;Return to Castle Wolfenstein&quot; was the only game of the Wolfenstein series where you don&#039;t play as William &quot;B.J.&quot; Blazkowicz.", 
                //     correct_answer: "False", 
                //     incorrect_answers: ["True"] ,
                //     // answers: ["The Dragon Slayer", "The Dragon", "The Demon"],
                // },
                // {
                //     category: "Entertainment: Japanese Anime & Manga", 
                //     type: "multiple", 
                //     difficulty: "easy", 
                //     question: "4 - In &quot;Fairy Tail&quot;, what is the nickname of Natsu Dragneel?", 
                //     correct_answer: "The Salamander", 
                //     incorrect_answers: ["The Dragon Slayer", "The Dragon", "The Demon"] ,
                //     // answers: ["The Dragon Slayer", "The Dragon", "The Demon"],
                // }, 
                // { 
                //     category: "Entertainment: Video Games", 
                //     type: "boolean", 
                //     difficulty: "medium", 
                //     question: "4 - &quot;Return to Castle Wolfenstein&quot; was the only game of the Wolfenstein series where you don&#039;t play as William &quot;B.J.&quot; Blazkowicz.", 
                //     correct_answer: "False", 
                //     incorrect_answers: ["True"] ,
                //     // answers: ["The Dragon Slayer", "The Dragon", "The Demon"],
                // }
            ])
        });
    }
}