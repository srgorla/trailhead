import { LightningElement, track } from 'lwc';

export default class JeopardyGame extends LightningElement {
    @track gameState = 'setup';
    @track numTeams = 2;
    @track teams = [];
    @track currentTeam = 0;
    @track selectedQuestion = null;
    @track showAnswer = false;
    @track answeredQuestions = new Set();
    @track categories = [];

    connectedCallback() {
        document.addEventListener('keydown', this.handleKeyPress.bind(this));
    }

    disconnectedCallback() {
        document.removeEventListener('keydown', this.handleKeyPress.bind(this));
    }

    handleKeyPress(event) {
        if (event.key === 'Escape' && this.selectedQuestion) {
            this.selectedQuestion = null;
            this.showAnswer = false;
        }
    }

    get isSetup() {
        return this.gameState === 'setup';
    }

    get isPlaying() {
        return this.gameState === 'playing';
    }

    get teamGridStyle() {
        return `grid-template-columns: repeat(${this.teams.length}, minmax(0, 1fr))`;
    }

    handleTeamChange(event) {
        this.numTeams = Math.max(1, Math.min(6, parseInt(event.target.value) || 1));
    }

    startGame() {
        this.teams = Array.from({ length: this.numTeams }, (_, i) => ({
            name: `Team ${i + 1}`,
            score: 0,
            id: i
        }));
        this.currentTeam = 0;
        this.answeredQuestions = new Set();
        this.initializeCategories();
        this.gameState = 'playing';
    }

    initializeCategories() {
        this.categories = [
            {
                name: "Science",
                id: 0,
                questions: [
                    { value: 200, question: "This planet is known as the Red Planet", answer: "What is Mars?", id: '0-0' },
                    { value: 400, question: "H2O is the chemical formula for this substance", answer: "What is water?", id: '0-1' },
                    { value: 600, question: "This force keeps us grounded on Earth", answer: "What is gravity?", id: '0-2' },
                    { value: 800, question: "The human body has this many bones", answer: "What is 206?", id: '0-3' },
                    { value: 1000, question: "This is the speed of light in meters per second", answer: "What is 299,792,458?", id: '0-4' }
                ]
            },
            {
                name: "History",
                id: 1,
                questions: [
                    { value: 200, question: "This war ended in 1945", answer: "What is World War II?", id: '1-0' },
                    { value: 400, question: "The Declaration of Independence was signed in this year", answer: "What is 1776?", id: '1-1' },
                    { value: 600, question: "This ancient wonder is located in Egypt", answer: "What are the Pyramids (of Giza)?", id: '1-2' },
                    { value: 800, question: "This empire was ruled by Julius Caesar", answer: "What is the Roman Empire?", id: '1-3' },
                    { value: 1000, question: "The Berlin Wall fell in this year", answer: "What is 1989?", id: '1-4' }
                ]
            },
            {
                name: "Geography",
                id: 2,
                questions: [
                    { value: 200, question: "This is the largest ocean on Earth", answer: "What is the Pacific Ocean?", id: '2-0' },
                    { value: 400, question: "This country has the most population", answer: "What is India (or China)?", id: '2-1' },
                    { value: 600, question: "This is the capital of Australia", answer: "What is Canberra?", id: '2-2' },
                    { value: 800, question: "This river is the longest in the world", answer: "What is the Nile?", id: '2-3' },
                    { value: 1000, question: "This is the smallest country in the world", answer: "What is Vatican City?", id: '2-4' }
                ]
            },
            {
                name: "Pop Culture",
                id: 3,
                questions: [
                    { value: 200, question: "This streaming service created 'Stranger Things'", answer: "What is Netflix?", id: '3-0' },
                    { value: 400, question: "This artist painted the Mona Lisa", answer: "Who is Leonardo da Vinci?", id: '3-1' },
                    { value: 600, question: "This band had hits with 'Hey Jude' and 'Let It Be'", answer: "Who are The Beatles?", id: '3-2' },
                    { value: 800, question: "This superhero is also known as Bruce Wayne", answer: "Who is Batman?", id: '3-3' },
                    { value: 1000, question: "This director created 'Jurassic Park' and 'E.T.'", answer: "Who is Steven Spielberg?", id: '3-4' }
                ]
            },
            {
                name: "EWS",
                id: 4,
                questions: [
                    { value: 200, question: "In the 1990s, EWS focused on this type of risk management", answer: "What is Deposit Risk Management?", id: '4-0' },
                    { value: 400, question: "This service was launched in 2001-05 as an account opening service-based offering", answer: "What is Identity Chek?", id: '4-1' },
                    { value: 600, question: "PPS was spun out of this company as a fully bank-owned company in 2006-09", answer: "What is First Data?", id: '4-2' },
                    { value: 800, question: "In 2013-15, this company was acquired, expanding EWS's reach in mobile authentication", answer: "What is Payfone?", id: '4-3' },
                    { value: 1000, question: "This brand was launched in August 2024 to deliver a new merchant checkout experience", answer: "What is Paze?", id: '4-4' }
                ]
            }
        ];
    }

    handleQuestionClick(event) {
        const questionId = event.currentTarget.dataset.id;
        if (!this.answeredQuestions.has(questionId)) {
            const [catIdx, qIdx] = questionId.split('-').map(Number);
            this.selectedQuestion = {
                categoryIndex: catIdx,
                questionIndex: qIdx,
                key: questionId
            };
            this.showAnswer = false;
        }
    }

    handleShowAnswer() {
        this.showAnswer = true;
    }

    handleCorrect() {
        this.handleAnswer(true);
    }

    handleWrong() {
        this.handleAnswer(false);
    }

    handleAnswer(isCorrect) {
        const { categoryIndex, questionIndex, key } = this.selectedQuestion;
        const questionValue = this.categories[categoryIndex].questions[questionIndex].value;
        
        if (isCorrect) {
            this.teams[this.currentTeam].score += questionValue;
        }

        // Mark this question as answered on the question model itself (what the template binds to)
        const q = this.categories[categoryIndex].questions[questionIndex];
        this.categories[categoryIndex].questions[questionIndex] = { ...q, answered: true };
        // Reassign categories to trigger reactivity on nested mutation
        this.categories = [...this.categories];
        
        // Keep answeredQuestions Set in sync (optional, for any logic using it)
        const updatedAnswered = new Set(this.answeredQuestions);
        updatedAnswered.add(key);
        this.answeredQuestions = updatedAnswered;

        this.selectedQuestion = null;
        this.showAnswer = false;
        this.currentTeam = (this.currentTeam + 1) % this.teams.length;
        
        // Force re-render of teams array consumers
        this.teams = [...this.teams];
    }

    isQuestionAnswered(questionId) {
        return this.answeredQuestions.has(questionId);
    }

    resetGame() {
        this.gameState = 'setup';
        this.teams = [];
        this.currentTeam = 0;
        this.answeredQuestions = new Set();
        this.selectedQuestion = null;
        this.showAnswer = false;
        this.categories = [];
    }

    get currentQuestionData() {
        if (!this.selectedQuestion) return null;
        const { categoryIndex, questionIndex } = this.selectedQuestion;
        return {
            category: this.categories[categoryIndex].name,
            value: this.categories[categoryIndex].questions[questionIndex].value,
            question: this.categories[categoryIndex].questions[questionIndex].question,
            answer: this.categories[categoryIndex].questions[questionIndex].answer
        };
    }

    // Use this in HTML to center the "Show Answer" button container via SLDS
    get showAnswerContainerClass() {
        return 'slds-align_absolute-center';
    }
}
