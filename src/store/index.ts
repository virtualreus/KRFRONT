import {createStore} from "vuex";

interface Member {
    id: number;
    name: string;
    email: string;
    skills: string;
    avatar: string;
}

interface Hackathon {
    name: string;
    dates: string;
}

interface Submission {
    githubLink: string;
    status: string;
    results: {
        place: string;
        scores: { [key: string]: number };
    } | null;
}

interface State {
    hackathon: Hackathon;
    team: {
        members: Member[];
    };
    submission: Submission;
}

const state: State = {
    hackathon: {
        name: 'Окак Международный 2025',
        dates: '15-17 июня 2025',
    },
    team: {
        members: [
            { id: 1, name: 'Дмитрий Иванов', email: 'dmitry2005spanov@yandex.ru', skills: 'COMPUTER VISION, NLP, PYTHON', avatar: 'https://via.placeholder.com/50' },
            { id: 2, name: 'Николай Переверзев', email: 'npereverzev@gmail.com', skills: 'GO, GOLANG, POSTGRESQL, API', avatar: 'https://via.placeholder.com/50' },
            { id: 3, name: 'Дарья Петрухина', email: 'dp157@gmail.ru', skills: 'ПРОЕКТИРОВАНИЕ И ДИЗАЙН ВЕБ-ИНТЕРФЕЙСОВ', avatar: 'https://via.placeholder.com/50' },
            { id: 4, name: 'Василий Иванов', email: 'vasiliy2709@gmail.com', skills: 'PYTORCH, KERAS, PYTHON', avatar: 'https://via.placeholder.com/50' },
            { id: 5, name: 'Никита Тищенко', email: 'nt3008@yandex.ru', skills: 'HTML, CSS, JAVASCRIPT, VUE', avatar: 'https://via.placeholder.com/50' },
        ],
    },
    submission: {
        githubLink: '',
        status: '',
        results: null,
    },
};

const mutations = {
    setGithubLink(state: State, link: string) {
        state.submission.githubLink = link;
    },
    setSubmissionStatus(state: State, status: string) {
        state.submission.status = status;
    },
    setResults(state: State, results: State['submission']['results']) {
        state.submission.results = results;
    },
    resetSubmission(state: State) {
        state.submission.githubLink = '';
        state.submission.status = '';
        state.submission.results = null;
    },
};

const actions = {
    submitSolution({ commit, state }: { commit: any; state: State }) {
        if (state.submission.githubLink) {
            commit('setSubmissionStatus', 'Решение успешно отправлено!');
            commit('setResults', {
                place: '2-е место',
                scores: {
                    'Техническая реализация': 85,
                    'Оригинальность': 90,
                    'Дизайн': 88,
                },
            });
        } else {
            commit('setSubmissionStatus', 'Пожалуйста, введите ссылку на GitHub.');
        }
    },
    resetSubmission({ commit }: { commit: any }) {
        commit('resetSubmission');
    },
};

const getters = {
    submissionStatus: (state: State) => state.submission.status,
    hasResults: (state: State) => !!state.submission.results,
};

export default createStore({
    state,
    mutations,
    actions,
    getters,
});