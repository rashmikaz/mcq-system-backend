export interface Question {
    id?: number;
    examId: number;
    question_text: string;
    option_a: string;
    option_b: string;
    option_c: string;
    option_d: string;
    correct_option: string; //  'A', 'B', 'C', or 'D'
}
